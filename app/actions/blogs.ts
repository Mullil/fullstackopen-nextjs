"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, getBlogById, incrementLikes } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes = 0
  await addBlog(title, author, url, likes)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlog = async (formData: FormData) => {
  const blog = await getBlogById(Number(formData.get("blogId")))
  if (blog) {
    await incrementLikes(blog.id, blog.likes)
    revalidatePath("/blogs")
    redirect(`/blogs/${blog.id}`)
  }
}