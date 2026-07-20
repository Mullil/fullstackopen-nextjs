import { and, eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs, readingLists } from "../../db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = () => {
  return db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string, likes: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const [newBlog] = await db.insert(blogs).values({ title, author, url, likes, userId: user.id }).returning({ id: blogs.id })
  await addBlogToReadingList(user.id, newBlog.id)

  return newBlog
}

export const addBlogToReadingList = async (userId: number, blogId: number) => {
  const existingEntry = await db.query.readingLists.findFirst({
    where: and(eq(readingLists.userId, userId), eq(readingLists.blogId, blogId)),
  })

  if (existingEntry) {
    return existingEntry
  }

  return db.insert(readingLists).values({ userId, blogId })
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

export const markRead = async (userId: number, blogId: number) => {
  return db.update(readingLists).set({ read: true }).where(and(eq(readingLists.blogId, blogId), eq(readingLists.userId, userId)))
}

export const getReadingListForUser = (userId: number) => {
  return db.query.readingLists.findMany({
    where: eq(readingLists.userId, userId),
    with: { blog: true },
  })
}

export const isBlogInReadingList = async (userId: number, blogId: number) => {
  const existingEntry = await db.query.readingLists.findFirst({
    where: and(eq(readingLists.userId, userId), eq(readingLists.blogId, blogId)),
  })

  return Boolean(existingEntry)
}