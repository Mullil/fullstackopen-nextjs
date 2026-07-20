import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link className="text-slate-900 hover:text-slate-700 border-b border-slate-300 hover:border-slate-500" href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users