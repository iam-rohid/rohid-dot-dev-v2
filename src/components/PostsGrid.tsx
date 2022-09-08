import { Post } from "@/contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

const PostsGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {posts.map((post) => (
        <article key={post._id}>
          <Link href={`/blog/${post.slug}`}>
            <a className="block overflow-hidden rounded-lg">
              <figure className="relative aspect-video w-full">
                <Image
                  src={
                    post.coverPhoto ||
                    "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                  }
                  alt={`${post.title} - Thumbnail`}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 h-full w-full"
                />
              </figure>
            </a>
          </Link>

          <Link href={`/blog/${post.slug}`}>
            <a className="transition-colors hover:text-priamry-400">
              <h3 className="my-2 text-xl font-semibold">{post.title}</h3>
            </a>
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-300">
            <span>{post.readingTime}</span>
            <span>·</span>
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <a className="hover:text-priamry-400">#{tag}</a>
              </Link>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostsGrid;
