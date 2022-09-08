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

const TagPage: CustomNextPage<Props> = ({ tag, posts }) => {
  return <></>;
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
