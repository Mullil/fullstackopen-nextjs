"use client"

import { useState } from "react"

export default function TokenSection({ initialToken }: { initialToken: string }) {
  const [token, setToken] = useState(initialToken)
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    const newToken = crypto.randomUUID()
    setPending(true)
    setToken(newToken)
    await fetch("/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: newToken }),
    })
    setPending(false)
  }

  return (
    <div data-testid="api-token-section" className="mt-8">
      <h2 className="text-xl font-semibold text-slate-900">API Token</h2>
      {!token ? (
        <p data-testid="no-token-message" className="mt-2 text-slate-600">
          no token has been generated yet
        </p>
      ) : (
        <div data-testid="token-display">
          <p className="mt-2 text-slate-600">Current token:</p>
          <p data-testid="api-token" className="mt-1 break-all rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
            {token}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        data-testid="generate-token-button"
        className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        Create New Token
      </button>
    </div>
  )
}
