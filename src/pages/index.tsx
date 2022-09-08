import featuredData from "@/data/featured.json";
import type { Post } from "@/contentlayer/generated";
import BaseLayout from "@/layouts/BaseLayout";
import { Tag } from "@/models/tag";
import { CustomNextPage } from "@/types/next";
import { GetStaticProps } from "next";
import getTagsFromPosts from "@/utils/getTagsFromPosts";
import allPosts from "@/utils/allPosts";
import Hero from "@/components/Hero";
import PostGrid from "@/components/PostGrid";
import PostsList from "@/components/PostsList";
import SectionTitleBar from "@/components/SectionTitleBar";
import TagsList from "@/components/TagsList";

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
        <div className="mx-auto w-full max-w-5xl space-y-16 px-8">
          <section id="featured-posts">
            <SectionTitleBar
              title="Featured Posts"
              action={{
                label: "See all",
                href: "/featured",
              }}
            />
            <PostGrid posts={featuredPosts} />
          </section>
          <section className="flex gap-8">
            <div className="flex-1">
              <section id="recent-posts">
                <SectionTitleBar
                  title="Recent Posts"
                  action={{
                    label: "See all",
                    href: "/recent",
                  }}
                />
                <PostsList posts={recentPosts} />
              </section>
            </div>
            <aside className="hidden h-32 w-64 space-y-8 lg:block">
              <section id="featured-tags">
                <SectionTitleBar title="Featured Tags" />
                <TagsList tags={featuredTags} />
              </section>
            </aside>
          </section>
          <section>
            <iframe
              src="https://rohid.substack.com/embed"
              style={{
                width: "100%",
                height: 320,
                backgroundColor: "transparent",
              }}
              frameBorder="0"
              scrolling="no"
            />
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
