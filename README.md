# Dread It - Social Discussion Platform

A Reddit-style discussion platform built with React, TypeScript, and Supabase. Users can create posts, comment, and engage with content in a modern, dark-themed interface.

## Features

- 🔐 User authentication (signup/signin)
- 📝 Create and view posts
- 💬 Comment on posts
- 🌙 Dark mode UI
- 🎨 Modern, responsive design

## Tech Stack

- **Frontend**:
  - React
  - TypeScript
  - TailwindCSS
  - Radix UI Components
  - React Router

- **Backend/Database**:
  - Supabase (PostgreSQL)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
npm install

# Start development server
npm run dev
```

### Database Setup

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create posts table
CREATE TABLE public.posts (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title text,
  content text,
  username text,
  num_votes bigint DEFAULT '0'::bigint,
  CONSTRAINT posts_pkey PRIMARY KEY (id)
);

-- Create comments table
CREATE TABLE public.comments (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  content text NOT NULL,
  post_id bigint,
  num_votes bigint DEFAULT '0'::bigint,
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id)
);

-- Enable Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all inserts" ON "public"."comments"
AS PERMISSIVE FOR INSERT TO public
WITH CHECK (true);
```

## Acknowledgments

- UI Components inspired by Radix UI
- Dark theme design inspiration from modern social platforms
