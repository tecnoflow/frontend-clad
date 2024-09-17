import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainForm } from './pages/firstform/MainForm.tsx'
import IndexPage from './routes/index.tsx'
import { SignIn } from '@clerk/clerk-react'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/sign-in", element: <SignIn appearance={{
        elements: {
          footer: {
            display: 'none',
          },
        },
      }} /> },
      { path: "/form/:id", element: <MainForm /> },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>,
)
