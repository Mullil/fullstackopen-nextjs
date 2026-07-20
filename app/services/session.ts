import { auth } from "../auth"
import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"

export const getCurrentUser = async () => {
  const session = await auth()
  if (!session?.user) {
    return null
  }

  return db.query.users.findFirst({
    where: eq(users.username, session.user.username),
  })
}

export const getCurrentUserProfile = async () => {
  const user = await getCurrentUser()
  if (!user) {
    return null
  }

  return db.query.users.findFirst({
    where: eq(users.id, user.id),
    with: {
      readingLists: {
        with: { blog: true },
      },
    },
  })
}