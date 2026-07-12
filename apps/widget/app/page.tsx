"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p>apps/widget</p>
      <Button onClick={() => addUser()}>Add</Button>
      {JSON.stringify(users)}
    </div>
  )
}
