import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: serial("likes").notNull().default(0),
})