import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react"; 

export function ForgotPasswordModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      setSent(false);
      setEmail("");
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-[#0F2854]">
            Reset your password
          </DialogTitle>
          <DialogDescription className="text-[#4988C4]">
            Enter the email associated with your account and we'll send a reset link.
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#BDE8F5]">
              <CheckCircle2 className="h-6 w-6 text-[#1C4D8D]" />
            </div>
            <div>
              <p className="font-medium text-[#0F2854]">Check your inbox</p>
              <p className="text-sm text-[#4988C4]">
                We sent a reset link to{" "}
                <span className="font-medium text-[#0F2854]">{email}</span>.
              </p>
            </div>
            <Button
              onClick={() => handleOpenChange(false)}
              className="mt-2 w-full bg-[#1C4D8D] hover:bg-[#0F2854] text-white"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-[#0F2854]">
                Email
              </Label>
              <Input
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="focus-visible:ring-[#1C4D8D]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1C4D8D] hover:bg-[#0F2854] text-white"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send reset link
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}