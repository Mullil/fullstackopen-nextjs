import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { db } from "../../../db"
import { users } from "../../../db/schema"

export async function GET(request: NextRequest) {
  const authorizationHeader = request.headers.get("authorization")
  const match = authorizationHeader?.match(/^Bearer\s+(.+)$/i)
  const token = match?.[1]?.trim()

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userWithBlogs = await db.query.users.findFirst({
    where: eq(users.apiToken, token),
    with: {
      blogs: true,
      readingLists: { with: { blog: true } },
    },
  })

  if (!userWithBlogs) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { passwordHash, ...safeUser } = userWithBlogs

  return NextResponse.json(safeUser)
}
