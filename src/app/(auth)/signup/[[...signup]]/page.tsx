import { SignUp } from "@clerk/nextjs"

const page = () => {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignUp forceRedirectUrl={"/"} />
    </main>
  )
}

export default page
