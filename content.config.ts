// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content'

// 2. Import Zod
import { z } from 'astro/zod'

// 3. Define your collection(s)
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
})

// 4. Export a single `collections` object to register your collection(s)
export const collections = { posts }
