import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Portfolio model
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),  // Credit or Debit
  displayName: text("display_name").notNull(),
  description: text("description"),
  opportunityValue: integer("opportunity_value").notNull(),
  percentChange: integer("percent_change"),
  perSegment: text("per_segment"),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Recommendation model
export const recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  value: integer("value").notNull(),
  portfolioType: text("portfolio_type").notNull(), // Credit or Debit
  actions: jsonb("actions").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Transaction data model
export const transactionData = pgTable("transaction_data", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").references(() => portfolios.id),
  type: text("type").notNull(), // Card Present, Card Not Present, ATM, POS, etc.
  transactions: integer("transactions").notNull(),
  value: integer("value").notNull(),
  opportunity: integer("opportunity"),
  createdAt: timestamp("created_at").defaultNow(),
});

// CalculatedValue model
export const calculatedValues = pgTable("calculated_values", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  recommendationId: integer("recommendation_id").references(() => recommendations.id),
  transactionType: text("transaction_type").notNull(),
  calculationPeriod: text("calculation_period").notNull(),
  baseValue: integer("base_value").notNull(),
  growthFactor: integer("growth_factor").notNull(),
  value: integer("value").notNull(),
  percentChange: integer("percent_change"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

export const insertPortfolioSchema = createInsertSchema(portfolios).pick({
  type: true,
  displayName: true,
  description: true,
  opportunityValue: true,
  percentChange: true,
  perSegment: true,
  userId: true,
});

export const insertRecommendationSchema = createInsertSchema(recommendations).pick({
  title: true,
  description: true,
  value: true,
  portfolioType: true,
  actions: true,
  color: true,
});

export const insertTransactionDataSchema = createInsertSchema(transactionData).pick({
  portfolioId: true,
  type: true,
  transactions: true,
  value: true,
  opportunity: true,
});

export const insertCalculatedValueSchema = createInsertSchema(calculatedValues).pick({
  userId: true,
  recommendationId: true,
  transactionType: true,
  calculationPeriod: true,
  baseValue: true,
  growthFactor: true,
  value: true,
  percentChange: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Portfolio = typeof portfolios.$inferSelect;

export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
export type Recommendation = typeof recommendations.$inferSelect;

export type InsertTransactionData = z.infer<typeof insertTransactionDataSchema>;
export type TransactionData = typeof transactionData.$inferSelect;

export type InsertCalculatedValue = z.infer<typeof insertCalculatedValueSchema>;
export type CalculatedValue = typeof calculatedValues.$inferSelect;
