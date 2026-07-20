import { db } from "./db"
import { users } from "./db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

const run = async () => {
  const existing = await db.query.users.findFirst({ where: eq(users.username, "debugtester") })
  if (existing) {
    console.log("exists", existing)
    process.exit(0)
  }
  const passwordHash = await bcrypt.hash("password123", 10)
  const [u] = await db.insert(users).values({ username: "debugtester", name: "Debug Tester", passwordHash }).returning()
  console.log(u)
  process.exit(0)
}
run()
