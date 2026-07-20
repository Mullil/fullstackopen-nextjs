import { notFound } from "next/navigation"
import { likeBlog } from "../../actions/blogs"
import { getBlogById, isBlogInReadingList } from "../../services/blogs"
import { getCurrentUser } from "../../services/session"
import AddToReadingListButton from "../../components/AddToReadingListButton"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const user = await getCurrentUser()
  const alreadySaved = user ? await isBlogInReadingList(user.id, blog.id) : false

  return (
    <div data-testid="blog-detail" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 data-testid="blog-title" className="text-3xl font-semibold tracking-tight text-slate-900">{blog.title}</h2>
          <p data-testid="blog-author" className="mt-2 text-base text-slate-600">By {blog.author}</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {blog.likes} likes
        </div>
      </div>

      <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
        <p>
          <span className="font-medium text-slate-900">URL:</span>{" "}
          <a href={blog.url} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4">
            {blog.url}
          </a>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <form action={likeBlog}>
          <input type="hidden" name="blogId" value={blog.id} />
          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Like
          </button>
        </form>

        {user && !alreadySaved && <AddToReadingListButton blogId={blog.id} />}
      </div>

      {user && alreadySaved && (
        <p className="mt-4 text-sm font-medium text-emerald-700">This blog is already in your reading list.</p>
      )}
    </div>
  )
}

export default BlogPage