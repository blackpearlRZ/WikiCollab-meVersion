import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../../components/ui/dialog";
import { spaces as initialSpaces } from "../../lib/mock-data";
import { SpaceCard } from "../../components/workspace/SpaceCard";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

export default function Spaces() {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const filtered = spaces.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `s-${Date.now()}`;
    setSpaces([
      { id, name: newName, description: newDesc || "A fresh new space.", visibility: "private", members: [spaces[0].members[0]], pageCount: 0, emoji: "✨" },
      ...spaces,
    ]);
    setOpen(false);
    setNewName("");
    setNewDesc("");
    toast.success("Space created");
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Spaces</h1>
          <p className="mt-1 text-sm text-muted-foreground">Group pages by team, project, or topic.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search spaces" className="h-10 w-56 pl-9" />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-10 gap-2"><Plus className="h-4 w-4" /> Create space</Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle className="font-display">Create a new space</DialogTitle>
                <DialogDescription>Spaces help you organize related pages and members.</DialogDescription>
              </DialogHeader>
              <form onSubmit={create} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sp-name">Name</Label>
                  <Input id="sp-name" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Customer Success" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sp-desc">Description</Label>
                  <Textarea id="sp-desc" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="What is this space for?" />
                </div>
                <DialogFooter>
                  <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit">Create space</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <SpaceCard key={s.id} space={s} />
        ))}
      </div>
    </div>
  );
}
