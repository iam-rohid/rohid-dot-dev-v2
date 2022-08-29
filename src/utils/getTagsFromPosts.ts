import { Post } from "@/contentlayer/generated";
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
