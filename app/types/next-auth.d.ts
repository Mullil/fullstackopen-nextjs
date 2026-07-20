import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    username: string
  }

  interface Session {
    user: {
      username: string
    } & DefaultSession["user"]
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    username: string
  }
}
