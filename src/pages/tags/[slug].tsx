import PageHeader from "@/components/PageHeader";
import PostRow from "@/components/PostRow";
import { allPosts, Post } from "@/contentlayer/generated";
import BaseLayout from "@/layouts/BaseLayout";
import { Tag } from "@/models/tag";
import { CustomNextPage } from "@/types/next";
import getTagFromSlug from "@/utils/getTagFromSlug";
import getTagsFromPosts from "@/utils/getTagsFromPosts";
import { GetStaticPaths, GetStaticProps } from "next";
import { Fragment } from "react";

interface Props {
  tag: Tag;
  posts: Post[];
}

const TagPage: CustomNextPage<Props> = ({ tag, posts }) => {
  return (
    <Fragment>
      <PageHeader title={tag.title} subtitle={`#${tag.slug}`} />
      <main className="bg-white dark:bg-gray-800">
        <div className="max-w-4xl px-4 mx-auto py-16">
          <div className="space-y-6">
            {posts.map((post) => (
              <PostRow key={post._id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

TagPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default TagPage;

export const getStaticPaths: GetStaticPaths = () => {
  const posts = allPosts.filter((post) => !post.draft);
  const tags = getTagsFromPosts(posts);
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

  const posts = allPosts.filter(
    (post) => !post.draft && post.tags.includes(tag.slug)
  );

  return {
    props: { tag, posts },
  };
};
