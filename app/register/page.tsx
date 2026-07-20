"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { errors: {} })

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Register</h2>
        <p className="mt-1 text-sm text-slate-600">Create an account to start posting and interacting with blogs.</p>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Username
            <input type="text" name="username" required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200" />
          </label>
          {state.errors.username ? (
            <p data-testid="username-error" className="mt-1 text-sm text-rose-600">
              {state.errors.username}
            </p>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Name
            <input type="text" name="name" required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200" />
          </label>
          {state.errors.name ? (
            <p data-testid="name-error" className="mt-1 text-sm text-rose-600">
              {state.errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input type="password" name="password" required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200" />
          </label>
          {state.errors.password ? (
            <p data-testid="password-error" className="mt-1 text-sm text-rose-600">
              {state.errors.password}
            </p>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Confirm Password
            <input type="password" name="passwordConfirm" required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200" />
          </label>
          {state.errors.passwordConfirm ? (
            <p data-testid="passwordConfirm-error" className="mt-1 text-sm text-rose-600">
              {state.errors.passwordConfirm}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          data-testid="register-button"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Register
        </button>
      </form>
    </div>
  )
}
