"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddToReadingListButton({ blogId }: { blogId: number }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    setPending(true)
    const response = await fetch("/api/reading-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId }),
    })
    setPending(false)
    if (response.ok) {
      router.refresh()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      data-testid="add-to-reading-list-button"
      className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
    >
      Add to reading list
    </button>
  )
}
