import { drizzle } from "drizzle-orm/neon-http"
import { migrate } from "drizzle-orm/neon-http/migrator"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const db = drizzle(process.env.DATABASE_URL!)

async function main() {
  await migrate(db, { migrationsFolder: "./drizzle" })
  console.log("Migrations applied")
}

main()
