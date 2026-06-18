import type { PortableTextBlock } from "sanity";
import type { SanityImageSource } from "@sanity/image-url";

export interface SanityPost {
  _id: string;
  title: string;
  slug: { _type: "slug"; current: string };
  publishedAt: string;
  tags?: string[];
  image?: SanityImageSource;
  body?: PortableTextBlock[];
}
