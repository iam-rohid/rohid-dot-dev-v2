import { Post } from "@/contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const PostsList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post._id} className="flex gap-4 md:gap-8">
          <div className="flex-1">
            <a
              href={`/blog/${post.slug}`}
              className="transition-colors hover:text-priamry-400"
            >
              <h3 className="my-2 text-xl font-bold md:text-2xl">
                {post.title}
              </h3>
              <p className="my-1 text-gray-300 line-clamp-2">
                {post.description || "No Description"}
              </p>
            </a>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-300">
              <span>{format(new Date(post.date), "MMM dd, yyy")}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
              <span>·</span>
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <a className="hover:text-priamry-400">#{tag}</a>
                </Link>
              ))}
            </div>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <a className="block w-20 sm:w-32 md:w-48">
              <figure className="relative aspect-square w-full overflow-hidden rounded-lg md:aspect-video">
                <Image
                  src={
                    post.coverPhoto ||
                    "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                  }
                  alt={`${post.title} - Thumbnail`}
                  layout="fill"
                  objectFit="cover"
                />
              </figure>
            </a>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default PostsList;
