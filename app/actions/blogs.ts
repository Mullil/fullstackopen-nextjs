"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, getBlogById, incrementLikes, markRead } from "../services/blogs"
import { getCurrentUser } from "../services/session"
import { auth } from "../auth"

export const createBlog = async (
  prevState: { errors: Record<string, string>, values: { title?: string, author?: string, url?: string } },
  formData: FormData
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  const errors = {} as Record<string, string>
  const title = formData.get("title") as string
    if (!title || title.length < 5) {
    errors["title"] = "Blog title must be at least 5 characters long"
  }
  const author = formData.get("author") as string
  if (!author || author.length < 5) {
    errors["author"] = "Blog author must be at least 5 characters long"
  }
  const url = formData.get("url") as string
  if (!url || url.length < 5) {
    errors["url"] = "Blog url must be at least 5 characters long"
  }
  const likes = 0
  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false }
  }
  await addBlog(title, author, url, likes)

  revalidatePath("/blogs")
  return { errors: {}, values: { title, author, url }, success: true }
}

export const likeBlog = async (formData: FormData) => {
  const blog = await getBlogById(Number(formData.get("blogId")))
  if (blog) {
    await incrementLikes(blog.id, blog.likes)
    revalidatePath("/blogs")
    redirect(`/blogs/${blog.id}`)
  }
}

export const readBlog = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"))
  const user = await getCurrentUser()
  if (!user || !blogId) {
    redirect("/login")
  }
  await markRead(user.id, blogId)
  revalidatePath("/me")
  redirect("/me")
}
