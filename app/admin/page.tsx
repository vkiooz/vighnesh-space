import { SignInButton, UserButton, Show } from '@clerk/nextjs'

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <Show when="signed-out">
        <h1 className="text-2xl font-medium">admin</h1>
        <SignInButton>
          <button className="px-4 py-2 border border-current rounded-md text-sm hover:bg-foreground hover:text-background transition-colors">
            Login
          </button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-medium">welcome back</h1>
          <UserButton afterSignOutUrl="/" />
          <p className="text-sm text-muted-foreground">you&apos;re signed in as admin.</p>
        </div>
      </Show>
    </div>
  )
}
