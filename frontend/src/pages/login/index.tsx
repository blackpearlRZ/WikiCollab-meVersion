import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ForgotPasswordModal } from "../../components/auth/ForgetPasswrdModel";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // ✅ save token
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful 🎉");

      setTimeout(() => {
        navigate("/app");
      }, 800);

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to WikiCollab"
      subtitle="Pick up right where your team left off."
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* EMAIL */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#0F2854]">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="border-[#BDE8F5] focus-visible:ring-[#4988C4]"
          />
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-[#0F2854]">Password</Label>

            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="text-xs font-medium text-[#1C4D8D] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-[#BDE8F5] focus-visible:ring-[#4988C4]"
          />
        </div>

        {/* BUTTON */}
        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full text-sm font-semibold bg-[#1C4D8D] hover:bg-[#0F2854] text-white"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Signing in..." : "Sign in"}
        </Button>

      </form>

      {/* SIGNUP LINK */}
      <p className="mt-6 text-center text-sm text-[#4988C4]">
        New to WikiCollab?{" "}
        <Link to="/signup" className="font-medium text-[#1C4D8D] hover:underline">
          Create an account
        </Link>
      </p>

      {/* MODAL */}
      <ForgotPasswordModal open={forgotOpen} onOpenChange={setForgotOpen} />
    </AuthLayout>
  );
}