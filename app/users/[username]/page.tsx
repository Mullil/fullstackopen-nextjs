import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">{user.name}</h2>
      <p className="text-slate-600">Username: {user.username}</p>
      <h3 className="text-lg font-semibold text-slate-900">Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <span key={blog.id} className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <p>{blog.author}</p>
            <p>Likes: {blog.likes}</p>
            <p>url: {blog.url}</p>
          </li>
          </span>
        ))}
      </ul>
    </div>
  )
}

export default UserPage