import { Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, UserButton } from '@clerk/clerk-react'
import './App.css'
import { Toaster } from './components/ui/toaster'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function App() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
    routerPush={(to) => navigate(to)}
    routerReplace={() => navigate('/', { replace: true })}
    publishableKey={PUBLISHABLE_KEY}
  > 
  <header className="header">
        <div style={{display: 'flex', justifyContent:'space-between', marginBottom: '1rem'}}>
          <div>
            <p>Tecnoflow</p>
          </div>
           <SignedIn>
            <UserButton />
          </SignedIn>
          {/*<SignedOut>
            <Link to="/sign-in">Iniciar sesión</Link>
          </SignedOut> */}
        </div>
      </header>
  <main>
    <Outlet/>
    <Toaster />
  </main>
  </ClerkProvider>
  
  )
}

export default App
