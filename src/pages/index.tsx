import Hero from "@/components/Hero";
import PostRow from "@/components/PostRow";
import * as SITE from "@/data/site";
import { allPosts, type Post } from "@/contentlayer/generated";
import BaseLayout from "@/layouts/BaseLayout";
import { Tag } from "@/models/tag";
import { CustomNextPage } from "@/types/next";
import { GetStaticProps } from "next";
import { Fragment } from "react";
import { compareDesc } from "date-fns";
import TagsSection from "@/components/TagsSection";
import getTagsFromPosts from "@/utils/getTagsFromPosts";
import Link from "next/link";

interface Props {
  recentPosts: Post[];
  featuredPosts: Post[];
  featuredTags: Tag[];
}

const HomePage: CustomNextPage<Props> = (props) => {
  const { recentPosts, featuredTags, featuredPosts } = props;
  return (
    <Fragment>
      <Hero />
      <main className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-4xl px-4 mx-auto space-y-32">
          <div className="flex gap-8">
            <section className="flex-1">
              <div className="flex items-center gap-4 mb-8">
                <h1 className="flex-1 text-2xl font-bold">Recent Posts</h1>
                <Link href={"/posts"}>
                  <a className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">
                    <span>See all</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </a>
                </Link>
              </div>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <PostRow key={post._id} post={post} />
                ))}
              </div>
            </section>
            <aside className="w-72 space-y-16">
              <TagsSection title="Featured Tags" tags={featuredTags} />
              <section id="popular-posts">
                <h1 className="text-xl font-bold mb-4">Featured Posts</h1>
                <ul className="space-y-4">
                  {featuredPosts.map((item, i) => (
                    <li key={item._id} className="flex gap-2">
                      <a
                        href={`/posts/${item.slug}`}
                        className="font-semibold hover:text-blue-500 flex gap-2"
                      >
                        <div className="text-gray-400 dark:text-gray-600 flex-1 line-clamp-2">
                          {i + 1}.
                        </div>
                        <p>{item.title}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

HomePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tags = getTagsFromPosts(allPosts);
  const blogs = allPosts.filter((blog) => !blog.draft);

  const recentPosts = blogs
    .sort((b1, b2) => b1.title.localeCompare(b2.title))
    .sort((b1, b2) => {
      return compareDesc(new Date(b1.publishedAt), new Date(b2.publishedAt));
    })
    .slice(0, 10);

  const featuredPosts = SITE.featuredPosts
    .map((slug) => blogs.find((post) => post.slug === slug)!)
    .filter(Boolean);

  const featuredTags = SITE.featuredTags
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
