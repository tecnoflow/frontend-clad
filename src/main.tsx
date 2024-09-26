import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { MainForm } from './pages/firstform/MainForm.tsx'
import Clients from './pages/business-admin/Clients.tsx'
import { SignIn } from './pages/auth/SignIn.tsx'


const router = createHashRouter([
  {
    element: <App />,
    children: [
      { path: "/sign-in", element:  <SignIn /> },
      { path: "/form/:id", element: <MainForm /> },
      { path: "/clients", element:  <Clients/> },
      { path: "/", element:  <Clients/> },
    ]
  }
])

/* const router = createBrowserRouter([
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
]) */


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>,
)
