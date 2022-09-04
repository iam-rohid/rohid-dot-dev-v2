import { allPosts } from "@/contentlayer/generated";
import { compareDesc } from "date-fns";

const isProduction = process.env.NODE_ENV === "production";

export default allPosts
  .filter((post) => !isProduction || !post.draft)
  .sort((b1, b2) => b1.title.localeCompare(b2.title))
  .sort((b1, b2) => {
    return compareDesc(new Date(b1.date), new Date(b2.date));
  });
