import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import * as dotenv from "dotenv"

dotenv.config({ path: [".env.test", ".env.local"] })

const client = postgres(process.env.DATABASE_URL!, { ssl: "require" })
const db = drizzle(client)

async function main() {
  await migrate(db, { migrationsFolder: "./drizzle" })
  console.log("Migrations applied")
}

main()
