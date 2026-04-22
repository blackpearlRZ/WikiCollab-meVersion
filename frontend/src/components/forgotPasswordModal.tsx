import { useState } from "react"
import axios from "axios"
import { Link } from "lucide-react";

export default function ForgotPasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const handleSubmit = async () => {
    setLoading(true)
    setMessage("")

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      })

      setMessage("Reset link sent to your email 📩")

    } catch (err : any) {
      setMessage(err.response?.data?.message || "Error sending email")
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[350px]">

        <h2 className="text-lg font-bold mb-3">
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-3 bg-black text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <p className="text-sm mt-2 text-center">{message}</p>
        )}

        <button
          onClick={onClose}
          className="text-sm text-gray-500 mt-2 w-full"
        >
          Close
        </button>
      </div>
      
    </div>
  )
}