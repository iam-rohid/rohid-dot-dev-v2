import type { Post } from "@/models/post";
import getTagsFromSlugs from "./getTagsFromSlugs";

export default function getTagsFromPosts(posts: Post[]) {
  let tags: string[] = [];

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags.push(tag);
    });
  });

  return getTagsFromSlugs(tags);
}
