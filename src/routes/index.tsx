import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const data = useAuth()
  console.log(data)
  return (
    <div>
      <h2>Bienvenido,</h2>
      <div>
        <ul>
          <li><Link to="/form">click para registrar tus datos</Link></li>
        </ul>
      </div>
    </div>
  )
}