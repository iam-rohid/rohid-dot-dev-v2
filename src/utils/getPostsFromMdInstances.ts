import type { Post } from "@/models/post";
import type { MarkdownInstance } from "astro";
import moment from "moment";

export default function getPostFromMdInstances(
  instances: MarkdownInstance<Post>[]
) {
  let posts = instances.map<Post>((md) => ({
    ...md.frontmatter,
    url: md.url || "",
  }));

  posts = posts.filter(Boolean).filter((post) => !post.draft);
  // .sort((p1, p2) => p1.title.localeCompare(p2.title));
  // .sort((p1, p2) => {
  //   if (moment(p1.date).isAfter(p2.date)) {
  //     return -1;
  //   } else if (moment(p1.date).isBefore(p2.date)) {
  //     return 1;
  //   }
  //   return 0;
  // });

  return posts;
}
