import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeCode } from "./anthropic";
import { codeReviewRequestSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Route for analyzing code
  app.post("/api/review", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = codeReviewRequestSchema.parse(req.body);
      const { code, language } = validatedData;

      // Call Anthropic API to analyze the code
      const analysis = await analyzeCode(code, language);

      // Save the code review to storage
      await storage.saveCodeReview({
        code,
        language,
        review: JSON.stringify(analysis),
        timestamp: new Date().toISOString(),
      });

      // Return the analysis
      res.json(analysis);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Invalid request data", 
          errors: error.errors 
        });
      } else if (error instanceof Error) {
        console.error("Error processing code review:", error);
        res.status(500).json({ message: error.message || "Failed to analyze code" });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // Route for getting recent code reviews
  app.get("/api/reviews/recent", async (_req: Request, res: Response) => {
    try {
      const reviews = await storage.getRecentCodeReviews(10);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching recent reviews:", error);
      res.status(500).json({ message: "Failed to fetch recent reviews" });
    }
  });

  // Route for getting a specific code review by ID
  app.get("/api/reviews/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid review ID" });
      }
      
      const review = await storage.getCodeReview(id);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      
      res.json(review);
    } catch (error) {
      console.error("Error fetching review:", error);
      res.status(500).json({ message: "Failed to fetch review" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
