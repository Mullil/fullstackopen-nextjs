import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

export const getBlogs = () => {
  return db.query.blogs.findMany()
}

export const addBlog = (title: string, author: string, url: string, likes: number) => {
  return db.insert(blogs).values({ title, author, url, likes })
}

export const getBlogById = (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id)
  })
}

export const incrementLikes = (id: number, likes: number) => {
  return db.update(blogs).set({
    likes: likes + 1
  }).where(eq(blogs.id, id))
}