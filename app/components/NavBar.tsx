"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="mb-8 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
          <Link href="/" className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Home
          </Link>
          <Link href="/blogs" className="rounded-md px-3 py-2 capitalize transition hover:bg-slate-100 hover:text-slate-900">
            blogs
          </Link>
          <Link href="/users" className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Users
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {session ? (
            <>
              <Link href="/blogs/new" className="rounded-md px-3 py-2 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                Create new
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded-md border border-slate-200 px-3 py-2 transition hover:bg-slate-100"
              >
                Logout
              </button>
              <Link href={"/me"} className="rounded-md px-3 py-2 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">me</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-md px-3 py-2 capitalize transition hover:bg-slate-100 hover:text-slate-900">
                login
              </Link>
              <Link href="/register" className="rounded-md bg-slate-900 px-3 py-2 font-medium capitalize text-white transition hover:bg-slate-700">
                register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}