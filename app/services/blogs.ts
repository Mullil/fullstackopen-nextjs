import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"
import { sql } from "drizzle-orm"

export const getBlogs = () => {
  return db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string, likes: number) => {
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  })

  return db.insert(blogs).values({ title, author, url, likes, userId: user?.id })
}

export const getBlogById = (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id)
  })
}

export const incrementLikes = (id: number, likes: number) => {
  const newLikes = likes + 1
  return db.update(blogs).set({
    likes: newLikes
  }).where(eq(blogs.id, id))
}