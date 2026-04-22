export type User = {
  id: string;
  name: string;
  email: string;
  initials: string;
  color: string;
  online?: boolean;
};

export type Space = {
  id: string;
  name: string;
  description: string;
  visibility: "public" | "private";
  members: User[];
  pageCount: number;
  emoji: string;
};

export type Page = {
  id: string;
  spaceId: string;
  title: string;
  emoji: string;
  updatedAt: string;
  blocks: { id: string; type: "h1" | "h2" | "p" | "list"; text: string }[];
};

export type Activity = {
  id: string;
  type: "invite" | "edit" | "mention" | "comment";
  user: User;
  target: string;
  time: string;
};

export const currentUser: User = {
  id: "u-me",
  name: "Alex Morgan",
  email: "alex@wikicollab.app",
  initials: "AM",
  color: "168 56% 28%",
  online: true,
};

export const users: User[] = [
  currentUser,
  { id: "u-1", name: "Priya Shah", email: "priya@wikicollab.app", initials: "PS", color: "162 55% 41%", online: true },
  { id: "u-2", name: "Diego Ruiz", email: "diego@wikicollab.app", initials: "DR", color: "144 60% 45%", online: true },
  { id: "u-3", name: "Mia Tanaka", email: "mia@wikicollab.app", initials: "MT", color: "200 60% 45%" },
  { id: "u-4", name: "Noah Becker", email: "noah@wikicollab.app", initials: "NB", color: "30 75% 50%" },
  { id: "u-5", name: "Lina Costa", email: "lina@wikicollab.app", initials: "LC", color: "330 60% 50%", online: true },
];

export const spaces: Space[] = [
  {
    id: "s-1",
    name: "Product",
    description: "Roadmaps, specs, and launch plans for the product team.",
    visibility: "private",
    members: [users[0], users[1], users[2], users[5]],
    pageCount: 24,
    emoji: "🚀",
  },
  {
    id: "s-2",
    name: "Engineering",
    description: "Architecture docs, RFCs, and onboarding guides.",
    visibility: "private",
    members: [users[0], users[2], users[4]],
    pageCount: 41,
    emoji: "⚙️",
  },
  {
    id: "s-3",
    name: "Design System",
    description: "Tokens, components, and visual guidelines.",
    visibility: "public",
    members: [users[0], users[1], users[3], users[5]],
    pageCount: 18,
    emoji: "🎨",
  },
  {
    id: "s-4",
    name: "Company Handbook",
    description: "Policies, culture, and how we work together.",
    visibility: "public",
    members: users,
    pageCount: 12,
    emoji: "📘",
  },
  {
    id: "s-5",
    name: "Marketing",
    description: "Campaigns, brand voice, and content calendar.",
    visibility: "private",
    members: [users[0], users[3], users[5]],
    pageCount: 9,
    emoji: "📣",
  },
];

export const pages: Page[] = [
  {
    id: "p-1",
    spaceId: "s-1",
    title: "Q2 Product Roadmap",
    emoji: "🗺️",
    updatedAt: "2h ago",
    blocks: [
      { id: "b1", type: "h1", text: "Q2 Product Roadmap" },
      { id: "b2", type: "p", text: "This document outlines our priorities for the next quarter, the bets we're making, and the trade-offs we've discussed as a team." },
      { id: "b3", type: "h2", text: "Themes" },
      { id: "b4", type: "list", text: "Collaboration depth — make multi-user editing feel instant" },
      { id: "b5", type: "list", text: "Search — semantic search across every workspace" },
      { id: "b6", type: "list", text: "Permissions — granular page-level controls" },
      { id: "b7", type: "h2", text: "Milestones" },
      { id: "b8", type: "p", text: "We aim to ship the first iteration of real-time presence in week 4, followed by inline comments in week 7." },
    ],
  },
  { id: "p-2", spaceId: "s-1", title: "Launch checklist", emoji: "✅", updatedAt: "Yesterday", blocks: [] },
  { id: "p-3", spaceId: "s-1", title: "Customer interviews", emoji: "🎙️", updatedAt: "3d ago", blocks: [] },
  { id: "p-4", spaceId: "s-2", title: "API architecture", emoji: "🧱", updatedAt: "5h ago", blocks: [] },
  { id: "p-5", spaceId: "s-2", title: "Onboarding for new engineers", emoji: "👋", updatedAt: "1w ago", blocks: [] },
  { id: "p-6", spaceId: "s-3", title: "Color tokens", emoji: "🎨", updatedAt: "Today", blocks: [] },
  { id: "p-7", spaceId: "s-4", title: "Time off policy", emoji: "🌴", updatedAt: "2w ago", blocks: [] },
];

export const activity: Activity[] = [
  { id: "a-1", type: "edit", user: users[1], target: "Q2 Product Roadmap", time: "12 min ago" },
  { id: "a-2", type: "mention", user: users[2], target: "API architecture", time: "1 hour ago" },
  { id: "a-3", type: "invite", user: users[5], target: "Design System", time: "3 hours ago" },
  { id: "a-4", type: "comment", user: users[3], target: "Launch checklist", time: "Yesterday" },
  { id: "a-5", type: "edit", user: users[4], target: "Onboarding for new engineers", time: "2 days ago" },
  { id: "a-6", type: "mention", user: users[1], target: "Color tokens", time: "3 days ago" },
];
