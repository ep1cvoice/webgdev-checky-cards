# WebDev Checky Cards

A personal learning tool and flashcard app for web development — browse, filter, and track progress through knowledge cards covering React, JavaScript, TypeScript, HTML, CSS, Git, Node.js, Next.js, and Web fundamentals.

<p>
  <img src="https://skillicons.dev/icons?i=react,vite,vercel,css" alt="Tech stack icons" />
</p>

[![Made with Supabase](https://supabase.com/badge-made-with-supabase-dark.svg)](https://supabase.com)

**Live at:** [webgdev-checky-cards.vercel.app](https://webdev-checky-cards.vercel.app/)
## ![App Preview Desktop](./src/assets/preview/desktop-preview.jpg)

---

## Project Purpose

This project was created as part of my path of learning and practicing React development.

The main objectives are:

- Practice React in a real project environment
- Build a scalable Single Page Application architecture
- Improve state management patterns
- Implement authentication, protected routes, and contexts
- Work with Supabase: Row Level Security, RPCs, per-user data isolation
- Work with forms, pagination, and filtering
- Apply clean component design and separation of concerns

**This is also a personal learning tool I actively use every day.** By regularly creating and revisiting cards, the goal is to reinforce important concepts and build a structured knowledge base on my path to becoming a Frontend React Developer.

---

## Main Idea

WebGDev Checky Cards is a knowledge management tool designed for developers who want to organize and review important concepts across different web technologies.

Each card contains:

- **Question** — the topic or concept being learned
- **Category** — HTML, CSS, JavaScript, React, TypeScript, Git, Node.js, Next.js, or Web Basics
- **Short Answer** — a concise summary, revealable on hover or click
- **Extended Description** — full explanation with Markdown formatting and syntax-highlighted code examples
- **Resources** — links to documentation or articles
- **Difficulty Level** — 1 (Beginner) to 4 (Expert)
- **Priority Level** — 1 (Low) to 4 (High), used for sorting and focus
- **Completion Status** — track which topics you've covered (per user, persisted to database)

---

## User Experience

### Guests (not logged in)
- Browse the full global deck of ~600 default cards
- Filter, search, and sort — read-only access
- No account required to explore content

### Registered users
- On first login, see the same global deck with a prompt to start their own deck
- One click copies all cards into a personal deck with `completed = false`
- From that point, all changes are isolated — edits, deletions, and progress belong only to that user
- Other users are never affected

---

## Features

### Authentication
- Email/password registration and login via Supabase Auth
- Protected routes — add, edit, and settings require login
- Guest routes — login and register redirect away if already authenticated
- Session persistence across page reloads

### Card Management
- Create, edit, and delete cards (own deck only)
- Toggle completion status per card
- Markdown descriptions with syntax-highlighted code blocks
- Inline markdown formatting guide available in the editor

### Browsing & Discovery
- Filter by technology category
- Full-text search across questions, answers, and descriptions
- Sort by level, priority, or completion status
- Completion sort only shown when viewing personal deck
- Stable ordering — cards never jump position unexpectedly
- Responsive pagination — adapts items per page to screen size

### Settings
- **Profile** — displays signed-in email
- **Theme** — Light, Dark, and Auto (system preference) modes
- **Answer Reveal** — choose hover or click to reveal short answer in card list
- **Danger Zone** — permanent account deletion with email confirmation

### Fully Responsive
- Works on mobile, tablet, and desktop
- Accessible on iPhone Safari with no setup required

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router 7, Vite |
| Backend | Supabase (PostgreSQL + RLS + RPC) |
| Hosting | Vercel |
| Styling | CSS Modules |
| Content | React Markdown, React Syntax Highlighter |

---

## Database Architecture

Two-table design with full per-user data isolation:

| Table | Purpose |
|---|---|
| `cards` | Global default deck — public read, no user ownership |
| `user_cards` | Per-user copy — full CRUD, isolated via RLS |

Row Level Security ensures users can only read and modify their own rows. Deleting an account cascades and removes all associated `user_cards` automatically.

---

## Categories

`React` `JavaScript` `TypeScript` `HTML` `CSS` `Git` `Node.js` `Next.js` `Web Basics` `Other`

---

## Difficulty & Priority Levels

| Level | Difficulty | Priority |
|---|---|---|
| 1 | Beginner | Low |
| 2 | Intermediate | Normal |
| 3 | Advanced | High |
| 4 | Expert | Critical |

---

## React Concepts Practiced

- Functional Components & Props
- `useState`, `useEffect`, `useActionState`, `useId`
- Controlled Forms
- Custom Hooks
- Context API (Theme, Auth, RevealAnswer)
- React Router with Protected & Guest Routes
- Pagination Logic
- Component Composition & Separation of Concerns
- Performance patterns (`memo`, `useCallback`, `useMemo`)

---

## Architecture

- Single Page Application (SPA)
- Modular component structure
- Reusable UI components (Button, Badge, Card, Form, etc.)
- Clear separation of concerns
- Supabase as persistent backend with RLS — fully deployed, no local server needed

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/ep1cvoice/webgdev-checky-cards.git

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Add a `.env` file in the project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

Both values are available in your Supabase dashboard under **Project Settings → API**.

---


