import { type Post } from "@/contentlayer/generated";
import getTagsFromSlugs from "@/utils/getTagsFromSlugs";
import moment from "moment";
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
          <h3 className="line-clamp-2 text-xl font-bold leading-relaxed group-hover:text-blue-500">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-gray-600 dark:text-gray-300">
            {post.description}
          </p>
        </a>
      </Link>
      <div className="flex flex-row flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
        <p>
          <span>{moment(post.publishedAt).format("MMM DD, YYYY")}</span>{" "}
          <span>•</span> <span>{post.readingTime}</span>
        </p>
        {tags.map((tag) => (
          <TagItem key={tag.slug} tag={tag} size="sm" />
        ))}
      </div>
    </article>
  );
};

export default PostRow;
