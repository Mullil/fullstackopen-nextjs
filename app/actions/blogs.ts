"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, incrementLikes } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes = parseInt(formData.get("likes") as string)
  addBlog(title, author, url, likes)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlog = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"))

  if (!Number.isNaN(blogId)) {
    incrementLikes(blogId)
  }

  revalidatePath("/blogs")
  redirect(`/blogs/${blogId}`)
}