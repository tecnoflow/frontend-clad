import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"

export const Header = () => {
    return (
        <header>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      )
}
