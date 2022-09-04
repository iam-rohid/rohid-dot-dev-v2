import { type Post } from "@/contentlayer/generated";
import getTagsFromSlugs from "@/utils/getTagsFromSlugs";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useMemo } from "react";
import TagItem from "./TagItem";

interface Props {
  post: Post;
}

const PostRow = (props: Props) => {
  const { post } = props;
  const tags = useMemo(() => getTagsFromSlugs(post.tags), [post]);
  return (
    <article className="relative flex flex-col gap-1">
      <Link href={`/posts/${post.slug}`}>
        <a className="group">
          <h3 className="text-xl font-bold leading-relaxed line-clamp-2 group-hover:text-blue-500">
            {post.title}
          </h3>
          <p className="text-gray-600 line-clamp-2 dark:text-gray-300">
            {post.description}
          </p>
        </a>
      </Link>
      <div className="flex flex-row flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        {post.draft ? (
          <p className="rounded-full border border-gray-200 px-2 py-0.5 text-xs">
            Draft
          </p>
        ) : null}
        <p>
          <span>{formatDistanceToNow(new Date(post.date))}</span> <span>•</span>{" "}
          <span>{post.readingTime}</span>
        </p>
        {tags.map((tag) => (
          <TagItem key={tag.slug} tag={tag} size="sm" />
        ))}
      </div>
    </article>
  );
};

export default PostRow;
