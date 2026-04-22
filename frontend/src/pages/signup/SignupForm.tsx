import { useState } from "react"
import axios from "axios"
import { cn } from "../../lib/utils"
import { Link } from "react-router-dom"

import { Button } from "../../components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "../../components/ui/field"
import { Input } from "../../components/ui/input"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [step, setStep] = useState(1)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // STEP 1 → SEND OTP
  const handleSendOtp = async () => {
  setLoading(true)
  setError("")
  setSuccess("")

  try {
    await axios.post("http://localhost:5000/api/auth/send-otp", {
      email,
    })

    setSuccess("OTP sent to your email 📩")
    setStep(2)

  } catch (err:any) {
    const message = err.response?.data?.message

    if (err.response?.data?.redirect === "/login") {
      setError("Account already exists. Redirecting to login...")

      setTimeout(() => {
        window.location.href = "/login"
      }, 1500)

    } else {
      setError(message || "Failed to send OTP")
    }

  } finally {
    setLoading(false)
  }
}

  // STEP 2 → VERIFY OTP
 const handleVerifyOtp = async () => {
  setLoading(true)
  setError("")
  setSuccess("")

  try {
    await axios.post("http://localhost:5000/api/auth/verify-otp", {
      email,
      otp,
    })

    setSuccess("Email verified ✅")
    setStep(3)

  } catch (err: any) {
    setError(err.response?.data?.message || "Invalid OTP")
  } finally {
    setLoading(false)
  }
}

  // STEP 3 → CREATE ACCOUNT
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return setError("Passwords do not match ❌")
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/create-account",
        {
          name,
          email,
          password,
        }
      )

      localStorage.setItem("token", res.data.token)

      setSuccess("Account created 🎉 Redirecting...")

      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000)

    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleCreateAccount}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="text-sm text-muted-foreground">
            Join WikiCollab
          </p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>

            <Button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
        <>
          <Field>
            <FieldLabel>Enter OTP</FieldLabel>
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              required
            />
          </Field>

          <Button
            type="button"
            variant="outline"
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="flex flex-end gap-2 ">
            {/* 🔁 RESEND */}
            <button
              type="button"
              onClick={handleSendOtp}
              className="text-sm text-blue-600 underline text-center"
            >
              Resend OTP
            </button>
            {/* ⬅️ BACK */}
            <button
              type="button"
              onClick={() => {
                setStep(1)
                setOtp("")
                setError("")
                setSuccess("")
              }}
              className="text-sm text-gray-500 underline text-center"
            >
              Change email
            </button>
          </div>
        </>
      )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>

            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Field>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-sm text-red-500 bg-red-50 border rounded p-2 text-center">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="text-sm text-green-600 bg-green-50 border rounded p-2 text-center">
            {success}
          </div>
        )}

        {/* LOGIN */}
        <FieldDescription className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </FieldDescription>

      </FieldGroup>
    </form>
  )
}