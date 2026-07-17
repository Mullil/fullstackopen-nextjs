import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = getBlogs()
  const filteredBlogs = filter
    ? blogs.filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()))
    : blogs

  return (
    <div>
      <h2>Blogs</h2>
      <form method="get" action="/blogs">
        <input type="text" name="filter" defaultValue={filter} placeholder="Search by title" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {filteredBlogs.sort((a, b) => b.likes - a.likes).map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <p>Author: {blog.author}</p>
            <p>URL: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
            <p>Likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
