"use client"

import { useActionState, useEffect } from "react"
import { createBlog } from "../../actions/blogs"
import { useRouter } from "next/navigation"
import { useNotification } from "../../components/NotificationContext"

interface NewBlogFormValues {
  title?: string
  author?: string
  url?: string
}

interface NewBlogFormState {
  errors: Record<string, string>
  values: NewBlogFormValues
  success: boolean
}

const NewBlog = () => {
  const [state, formAction] = useActionState<NewBlogFormState, FormData>(createBlog, { errors: {}, values: {}, success: false })
  const { showNotification } = useNotification()
  const router = useRouter()
  useEffect(() => {
    if (state.success) {
      showNotification("Blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Create a new blog</h2>
        <p className="mt-1 text-sm text-slate-600">Share a blog post with the community.</p>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Title
            <input type="text" name="title" defaultValue={state.values?.title} required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200" />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Author
            <input type="text" name="author" defaultValue={state.values?.author} required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200" />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            URL
            <input type="text" name="url" defaultValue={state.values?.url} required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200" />
          </label>
        </div>
        <button type="submit" data-testid="create-blog-button" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Create
        </button>
        {Object.entries(state.errors).map(([field, error]) => (
          <p key={field} className="text-sm text-rose-600">
            {field}: {error}
          </p>
        ))}
      </form>
    </div>
  )
}

export default NewBlog