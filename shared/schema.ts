import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const codeReviews = pgTable("codereviews", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  review: text("review"),
  timestamp: text("timestamp").notNull(),
});

export const insertCodeReviewSchema = createInsertSchema(codeReviews).omit({
  id: true,
});

export type InsertCodeReview = z.infer<typeof insertCodeReviewSchema>;
export type CodeReview = typeof codeReviews.$inferSelect;

// Schema for code review request
export const codeReviewRequestSchema = z.object({
  code: z.string().min(1, "Code is required"),
  language: z.string().min(1, "Language is required"),
});

export type CodeReviewRequest = z.infer<typeof codeReviewRequestSchema>;

// Schema for code review response
export const codeReviewResponseSchema = z.object({
  summary: z.string(),
  bugs: z.array(z.object({
    severity: z.enum(["high", "medium", "low"]),
    description: z.string(),
    suggestion: z.string().optional(),
  })),
  readability: z.object({
    naming: z.string().optional(),
    comments: z.string().optional(),
    structure: z.string().optional(),
    additionalNotes: z.string().optional(),
  }),
  performance: z.array(z.object({
    description: z.string(),
    suggestion: z.string().optional(),
  })),
  recommendations: z.object({
    improvedCode: z.string().optional(),
    keyImprovements: z.array(z.string()).optional(),
    additionalNotes: z.string().optional(),
  }),
});

export type CodeReviewResponse = z.infer<typeof codeReviewResponseSchema>;
