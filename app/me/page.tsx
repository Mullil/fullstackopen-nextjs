import { getCurrentUserProfile } from "../services/session"
import { redirect } from "next/navigation"
import { readBlog } from "../actions/blogs"
import TokenSection from "../components/TokenSection"

const MePage = async () => {
  const user = await getCurrentUserProfile()
  if (!user) {
    redirect("/login")
  }

  const readingList = user.readingLists ?? []
  const unreadList = readingList.filter((entry) => !entry.read)
  const readList = readingList.filter((entry) => entry.read)

  return (
    <div data-testid="user-profile" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      <h1 className="text-2xl font-semibold text-slate-900">My profile</h1>
      <p data-testid="user-name" className="mt-2 text-slate-600">Name: {user?.name}</p>
      <p data-testid="user-username" className="text-slate-600">Username: {user?.username}</p>

      <TokenSection initialToken={user?.apiToken ?? ""} />

      <div data-testid="reading-list-section" className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Reading list</h2>
        {readingList.length === 0 ? (
          <p data-testid="empty-reading-list" className="mt-2 text-slate-600">Your reading list is empty.</p>
        ) : (
            <div>
            <div data-testid="unread-section">
                <p className="mt-2 text-slate-600">Unread:</p>
                {unreadList.length === 0 ? (
                    <p data-testid="no-unread-blogs" className="mt-2 text-slate-600">No unread blogs.</p>
                ) : (
                    <ul className="mt-4 space-y-3">
                        {unreadList.map((entry) => (
                        <li key={entry.id} className="rounded-2xl border border-slate-200 p-4">
                            <a href={`/blogs/${entry.blog?.id ?? ""}`} className="font-medium text-slate-900 hover:underline">
                            {entry.blog?.title}
                            </a>
                            <p className="mt-1 text-sm text-slate-600">by {entry.blog?.author}</p>
                            <form action={readBlog} className="mt-2">
                                <input type="hidden" name="blogId" value={entry.blog?.id ?? ""} />
                                <button type="submit" data-testid={`mark-read-${entry.id}`} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                                    Mark as read
                                </button>
                            </form>
                        </li>
                        ))}
                    </ul>
                )}
            </div>
                <p className="mt-6 text-slate-600">Read:</p>
                <ul className="mt-4 space-y-3">
                    {readList.map((entry) => (
                    <li key={entry.id} className="rounded-2xl border border-slate-200 p-4">
                        <a href={`/blogs/${entry.blog?.id ?? ""}`} className="font-medium text-slate-900 hover:underline">
                        {entry.blog?.title}
                        </a>
                        <p className="mt-1 text-sm text-slate-600">by {entry.blog?.author}</p>
                    </li>
                    ))}
                </ul>
            </div>
        )}
      </div>
    </div>
  )
}

export default MePage
