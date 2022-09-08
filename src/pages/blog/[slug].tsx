import { Post } from "@/contentlayer/generated";
import { CustomNextPage } from "@/types/next";
import { GetStaticPaths, GetStaticProps } from "next";
import BaseLayout from "@/layouts/BaseLayout";
import { Tag } from "@/models/tag";
import getTagsFromSlugs from "@/utils/getTagsFromSlugs";
import { useMDXComponent } from "next-contentlayer/hooks";
import { format } from "date-fns";
import allPosts from "@/utils/allPosts";
import SectionTitleBar from "@/components/SectionTitleBar";
import TagsList from "@/components/TagsList";
import Image from "next/image";

interface Props {
  post: Post;
  tags: Tag[];
}

const PostPage: CustomNextPage<Props> = (props) => {
  const { post, tags } = props;
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <main className="my-16">
      <div className="mx-auto flex max-w-5xl gap-8 px-8">
        <article className="prose prose-invert mx-auto min-w-0 max-w-2xl flex-1 prose-pre:-ml-4 prose-pre:w-[calc(100%+2rem)] prose-pre:bg-gray-800 prose-pre:text-base">
          <header>
            <div className="inline-flex gap-x-2">
              <span>{format(new Date(post.date), "MMM dd, yyyy")}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            <h1>{post.title}</h1>
            {!!post.coverPhoto && (
              <figure className="relative -ml-4 aspect-video w-[calc(100%+2rem)] overflow-hidden rounded-lg">
                <Image
                  src={post.coverPhoto}
                  alt={`${post.title} Cover Photo`}
                  layout="fill"
                  objectFit="cover"
                />
              </figure>
            )}
          </header>
          <section>
            <MDXContent />
          </section>
        </article>
        <aside className="hidden w-64 space-y-8 lg:block">
          <section id="tags">
            <SectionTitleBar title="Tags" />
            <TagsList tags={tags} />
          </section>
        </aside>
      </div>
    </main>
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
