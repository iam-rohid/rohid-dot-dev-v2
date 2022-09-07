import featuredData from "@/data/featured.json";
import type { Post } from "@/contentlayer/generated";
import BaseLayout from "@/layouts/BaseLayout";
import { Tag } from "@/models/tag";
import { CustomNextPage } from "@/types/next";
import { GetStaticProps } from "next";
import getTagsFromPosts from "@/utils/getTagsFromPosts";
import allPosts from "@/utils/allPosts";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { format } from "date-fns";
import Hero from "@/components/Hero";

interface Props {
  recentPosts: Post[];
  featuredPosts: Post[];
  featuredTags: Tag[];
}

const HomePage: CustomNextPage<Props> = (props) => {
  const { recentPosts, featuredTags, featuredPosts } = props;
  return (
    <>
      <Hero />

      <main className="my-16">
        <div className="mx-auto w-full max-w-4xl space-y-16 px-8">
          <section id="featured-posts">
            <div className="mb-8 flex items-center">
              <h2 className="flex-1 truncate text-2xl font-medium">
                Featured Posts
              </h2>
              <Link href={"/blog"}>
                <a className="group flex items-center gap-1 transition-colors hover:text-priamry-400">
                  See All
                  <span className="transition-transform group-hover:translate-x-1">
                    <FaChevronRight />
                  </span>
                </a>
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
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
                        />
                      </figure>
                    </a>
                  </Link>
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
                </article>
              ))}
            </div>
          </section>

          <section id="recent-posts">
            <div className="mb-8 flex items-center">
              <h2 className="flex-1 truncate text-2xl font-medium">
                Recent Posts
              </h2>
              <Link href={"/blog"}>
                <a className="group flex items-center gap-1 transition-colors hover:text-priamry-400">
                  See All
                  <span className="transition-transform group-hover:translate-x-1">
                    <FaChevronRight />
                  </span>
                </a>
              </Link>
            </div>

            <div className="space-y-8">
              {recentPosts.map((post) => (
                <article
                  key={post._id}
                  className="flex items-center gap-4 md:gap-8"
                >
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
                    <a className="block w-20 overflow-hidden rounded-lg sm:w-32 md:w-56 lg:w-64">
                      <figure className="relative aspect-square w-full md:aspect-video">
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
          </section>
        </div>
      </main>
    </>
  );
};

HomePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tags = getTagsFromPosts(allPosts);
  const recentPosts = allPosts.slice(0, 10);

  const featuredPosts = featuredData.posts
    .map((slug) => allPosts.find((post) => post.slug === slug)!)
    .filter(Boolean);

  const featuredTags = featuredData.tags
    .map((slug) => tags.find((tag) => tag.slug === slug)!)
    .filter(Boolean);

  return {
    props: {
      featuredPosts,
      featuredTags,
      recentPosts,
    },
  };
};
