import { Button } from "@/components/ui/button"
import { SignInButton, useUser } from "@clerk/clerk-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

export function SignIn() {

  const {isSignedIn, isLoaded} = useUser();
  const navigate = useNavigate();
 
  useEffect(() => {
      // Asegurarse de que Clerk esté completamente cargado antes de redirigir
      if (isLoaded && isSignedIn) {
        navigate('/');
      }
    }, [isSignedIn, isLoaded, navigate]);
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Bienvenido</h1>
          <p className="text-balance text-muted-foreground">
            ahorra tiempo y vende más en tecnoflow
          </p>
        </div>
        <div className="grid gap-4">
          <SignInButton 
          forceRedirectUrl={'/'}
            children={
              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            }
          />
          
        </div>
      </div>
    </div>
    <div className="hidden bg-muted lg:block">
      <img
        src="https://images.unsplash.com/photo-1516484080081-1dbc8c966a31"
        width="1920"
        height="1080"
        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div> 
  )
  {/* <SignInButton/> */}
  
}
