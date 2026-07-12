"use client"

import {
  useMutation,
  useQuery,
  Authenticated,
  Unauthenticated,
} from "convex/react"
import { SignInButton, UserButton } from "@clerk/nextjs"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)

  return (
    <>
      <Authenticated>
        <div className="flex min-h-svh items-center justify-center">
          <p>apps/web</p>
          <UserButton />
          <Button onClick={() => addUser()}>Add</Button>
          {JSON.stringify(users)}
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be signed in!</p>
        <SignInButton>Sign in!</SignInButton>
      </Unauthenticated>
    </>
  )
}
