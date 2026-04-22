import { useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function ResetPassword() {
  const { token } = useParams()

  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleReset = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      )

      setMessage("Password updated successfully 🎉")

    } catch (err) {
      setMessage("Error resetting password")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[300px]">
        <h1 className="text-xl font-bold mb-3">Reset Password</h1>

        <input
          type="password"
          className="w-full border p-2 mb-2"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-black text-white p-2 rounded"
        >
          Reset
        </button>

        {message && (
          <p className="text-sm mt-2">{message}</p>
        )}
        
        <Link
              to="/login"
              className="ml-auto text-sm text-muted-foreground hover:underline"
            >
              back to Login page
         </Link>
      </div>
    </div>
  )
}