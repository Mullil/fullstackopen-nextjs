import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"
import { getCurrentUser } from "@/app/services/session"

export async function POST(request: Request) {
    const user = await getCurrentUser()
    if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const token = typeof body.token === "string" && body.token ? body.token : crypto.randomUUID()
    await db.update(users).set({ apiToken: token }).where(eq(users.id, user.id))

    return NextResponse.json({ token })
}
