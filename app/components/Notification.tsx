"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const isSuccess = type === "success"

  return (
    <div
      data-testid="notification"
      className={`mb-6 rounded-xl border px-4 py-3 text-sm shadow-sm ${isSuccess ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}
    >
      {message}
    </div>
  )
}