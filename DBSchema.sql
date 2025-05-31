-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.comments (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  content text NOT NULL,
  post_id bigint,
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id)
);
CREATE TABLE public.posts (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title text,
  content text,
  likes bigint NOT NULL DEFAULT '0'::bigint,
  username text,
  CONSTRAINT posts_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user_votes (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  post_id integer,
  vote_type text CHECK (vote_type = ANY (ARRAY['upvoted'::text, 'downvoted'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_votes_pkey PRIMARY KEY (id),
  CONSTRAINT user_votes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT user_votes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id)
);