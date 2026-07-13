"use client"

import { useMutation } from "convex/react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  const addUser = useMutation(api.users.add)

  return (
    <>
      <div className="flex min-h-svh items-center justify-center">
        <p>apps/web</p>
        <UserButton />
        <OrganizationSwitcher hidePersonal />
        <Button onClick={() => addUser()}>Add</Button>
      </div>
    </>
  )
}
