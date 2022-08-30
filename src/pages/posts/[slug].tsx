import PageHeader from "@/components/PageHeader";
import { allPosts, Post } from "@/contentlayer/generated";
import { CustomNextPage } from "@/types/next";
import { GetStaticPaths, GetStaticProps } from "next";
import moment from "moment";
import BaseLayout from "@/layouts/BaseLayout";
import { Tag } from "@/models/tag";
import getTagsFromSlugs from "@/utils/getTagsFromSlugs";
import TagsSection from "@/components/TagsSection";
import { useMDXComponent } from "next-contentlayer/hooks";

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
        subtitle={`${moment(post.publishedAt).format("MMM DD, YYYY")} • ${
          post.readingTime
        }`}
      />
      <main className="bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 flex gap-8">
          <article className="prose dark:prose-invert max-w-none min-w-0 overflow-hidden flex-1 py-16">
            <MDXContent />
          </article>
          <aside className="w-56 hidden md:block">
            <div className="space-y-8 max-h-screen overflow-y-auto sticky top-0 py-16">
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
