import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs()
  const filteredBlogs = filter
    ? blogs.filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()))
    : blogs
  const sortedBlogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Blogs</h2>
        </div>
        <form method="get" action="/blogs" className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            name="filter"
            defaultValue={filter}
            placeholder="Search by title"
            data-testid="filter-input"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 sm:min-w-64"
          />
          <button type="submit" data-testid="search-button" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
            Search
          </button>
        </form>
      </div>

      <ul data-testid="blogs-list" className="grid gap-4">
        {sortedBlogs.map((blog) => (
          <li key={blog.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <Link href={`/blogs/${blog.id}`} className="text-lg font-semibold text-slate-900 hover:text-slate-700">
              {blog.title}
            </Link>
            <p className="mt-2 text-sm text-slate-600">Author: {blog.author}</p>
            <p className="mt-1 break-all text-sm text-slate-600">
              URL: <a href={blog.url} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4">{blog.url}</a>
            </p>
            <p className="mt-3 text-sm font-medium text-slate-700">{blog.likes} likes</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
