import { NextResponse } from "next/server"
import { getCurrentUser } from "@/app/services/session"
import { addBlogToReadingList } from "@/app/services/blogs"

export async function POST(request: Request) {
    const user = await getCurrentUser()
    if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { blogId } = await request.json()
    if (!blogId) {
        return NextResponse.json({ error: "blogId is required" }, { status: 400 })
    }

    await addBlogToReadingList(user.id, Number(blogId))

    return NextResponse.json({ success: true })
}
