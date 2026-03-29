import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const post = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
});

const posts = defineCollection({
  type: "content",
  schema: post,
});

export const collections = { posts };
