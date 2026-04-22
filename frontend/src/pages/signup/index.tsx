import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../components/ui/input-otp";

import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

export default function Signup() {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔹 STEP 1 → SEND OTP
  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { email });

      toast.success(`Code sent to ${email}`);
      setStep(2);

    } catch (err: any) {
      if (err.response?.data?.redirect === "/login") {
        toast.error("Account already exists. Redirecting...");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        toast.error(err.response?.data?.message || "Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 STEP 2 → VERIFY OTP
  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return toast.error("Enter the full 6-digit code");
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp,
      });

      toast.success("Email verified ✅");
      setStep(3);

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 STEP 3 → CREATE ACCOUNT
  const createAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (password !== confirm) {
      return toast.error("Passwords don't match");
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Account created 🎉");

      setTimeout(() => {
        navigate("/app");
      }, 800);

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow={`Step ${step} of 3`}
      title={
        step === 1
          ? "Create your account"
          : step === 2
          ? "Check your email"
          : "Almost done"
      }
      subtitle={
        step === 1
          ? "Start collaborating with your team in minutes."
          : step === 2
          ? `We sent a 6-digit code to ${email}.`
          : "Choose a strong password."
      }
    >

      {/* STEPPER */}
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                step > n && "bg-[#1C4D8D] text-white",
                step === n && "bg-[#1C4D8D] text-white ring-4 ring-[#4988C4]/30",
                step < n && "bg-[#BDE8F5] text-[#4988C4]"
              )}
            >
              {step > n ? <Check className="h-3.5 w-3.5" /> : n}
            </div>

            {n < 3 && (
              <div
                className={cn(
                  "h-1 flex-1 rounded-full",
                  step > n ? "bg-[#1C4D8D]" : "bg-[#BDE8F5]"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* STEPS */}
      <div key={step} className="animate-fade-in">

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={sendOtp} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#0F2854]">Full name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-[#BDE8F5] focus-visible:ring-[#4988C4]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#0F2854]">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#BDE8F5] focus-visible:ring-[#4988C4]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-[#1C4D8D] hover:bg-[#0F2854] text-white"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send verification code
            </Button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={verifyOtp} className="space-y-5">

            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="h-12 w-11 text-base border-[#BDE8F5] focus-visible:ring-[#4988C4]"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-[#1C4D8D] hover:bg-[#0F2854] text-white"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify and continue
            </Button>

            <div className="flex justify-between text-xs">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-[#4988C4] hover:text-[#0F2854]"
              >
                <ArrowLeft className="h-3 w-3" /> Change email
              </button>

              <button
                type="button"
                onClick={sendOtp}
                className="text-[#1C4D8D] hover:underline"
              >
                Resend code
              </button>
            </div>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={createAccount} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#0F2854]">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#BDE8F5] focus-visible:ring-[#4988C4]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#0F2854]">Confirm password</Label>
              <Input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="border-[#BDE8F5] focus-visible:ring-[#4988C4]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-[#1C4D8D] hover:bg-[#0F2854] text-white"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create account
            </Button>
          </form>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-[#4988C4]">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[#1C4D8D] hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}