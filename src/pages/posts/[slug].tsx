import PageHeader from "@/components/PageHeader";
import { allPosts, Post } from "@/contentlayer/generated";
import { CustomNextPage } from "@/types/next";
import { GetStaticPaths, GetStaticProps } from "next";
import BaseLayout from "@/layouts/BaseLayout";
import { Tag } from "@/models/tag";
import getTagsFromSlugs from "@/utils/getTagsFromSlugs";
import TagsSection from "@/components/TagsSection";
import { useMDXComponent } from "next-contentlayer/hooks";
import { formatDistanceToNow } from "date-fns";

interface Props {
  post: Post;
  tags: Tag[];
}

const PostPage: CustomNextPage<Props> = (props) => {
  const { post, tags } = props;
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <>
      <PageHeader
        title={post.title}
        subtitle={`${formatDistanceToNow(new Date(post.publishedAt))} • ${
          post.readingTime
        }`}
      />
      <main className="bg-white dark:bg-gray-800">
        <div className="mx-auto flex max-w-4xl gap-8 px-4">
          <article className="prose min-w-0 max-w-none flex-1 overflow-hidden py-16 dark:prose-invert">
            <MDXContent />
          </article>
          <aside className="hidden w-56 md:block">
            <div className="sticky top-0 max-h-screen space-y-8 overflow-y-auto py-16">
              <TagsSection tags={tags} />
              {/* <TOCSection headings={headings} /> */}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

PostPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default PostPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: allPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: any) => {
  const post = allPosts.find((b) => b.slug === params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const tags = getTagsFromSlugs(post.tags);

  return {
    props: {
      post,
      tags,
    },
  };
};
