import Breadcrumb from "@/components/Breadcrumb";
import PostsList from "@/components/PostsList";
import SectionTitleBar from "@/components/SectionTitleBar";
import { Post } from "@/contentlayer/generated";
import BaseLayout from "@/layouts/BaseLayout";
import { Tag } from "@/models/tag";
import { CustomNextPage } from "@/types/next";
import allPosts from "@/utils/allPosts";
import getTagFromSlug from "@/utils/getTagFromSlug";
import getTagsFromPosts from "@/utils/getTagsFromPosts";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  tag: Tag;
  posts: Post[];
}

const breadcrumb = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Tags",
    href: "/tags",
  },
];

const TagPage: CustomNextPage<Props> = ({ tag, posts }) => {
  return (
    <main>
      <header className="my-16">
        <div className="mx-auto w-full max-w-3xl px-8">
          <Breadcrumb data={breadcrumb} />
          <h1 className="mb-1 text-3xl font-bold">{tag.title}</h1>
          <p className="text-gray-300">
            #<b>{tag.slug}</b>
          </p>
        </div>
      </header>
      <section className="my-16">
        <div className="mx-auto w-full max-w-3xl px-8">
          <SectionTitleBar title="Posts" />
          <PostsList posts={posts} />
        </div>
      </section>
    </main>
  );
};

TagPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default TagPage;

export const getStaticPaths: GetStaticPaths = () => {
  const tags = getTagsFromPosts(allPosts);
  return {
    paths: tags.map((tag) => ({ params: { slug: tag.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: any) => {
  const tag = getTagFromSlug(params.slug);

  if (!tag) {
    return {
      notFound: true,
    };
  }

  const posts = allPosts.filter((post) => post.tags.includes(tag.slug));

  return {
    props: { tag, posts },
  };
};
