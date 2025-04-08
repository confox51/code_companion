import { codeReviews, type CodeReview, type InsertCodeReview } from "@shared/schema";

export interface IStorage {
  saveCodeReview(review: InsertCodeReview): Promise<CodeReview>;
  getCodeReview(id: number): Promise<CodeReview | undefined>;
  getRecentCodeReviews(limit: number): Promise<CodeReview[]>;
}

export class MemStorage implements IStorage {
  private reviews: Map<number, CodeReview>;
  private currentId: number;

  constructor() {
    this.reviews = new Map();
    this.currentId = 1;
  }

  async saveCodeReview(review: InsertCodeReview): Promise<CodeReview> {
    const id = this.currentId++;
    const newReview: CodeReview = { ...review, id };
    this.reviews.set(id, newReview);
    return newReview;
  }

  async getCodeReview(id: number): Promise<CodeReview | undefined> {
    return this.reviews.get(id);
  }

  async getRecentCodeReviews(limit: number): Promise<CodeReview[]> {
    return Array.from(this.reviews.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
