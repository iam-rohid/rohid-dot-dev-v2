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
import Breadcrumb from "@/components/Breadcrumb";
import MDXComponents from "@/components/mdx-components/MDXComponents";
import SEO from "@/components/SEO";

interface Props {
  post: Post;
  tags: Tag[];
}

const breadcrumb = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const PostPage: CustomNextPage<Props> = (props) => {
  const { post, tags } = props;
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <main>
      <SEO
        title={post.title}
        description={post.description}
        image={post.coverPhoto}
      />

      <header className="my-16">
        <div className="mx-auto max-w-4xl gap-8 px-8">
          <Breadcrumb data={breadcrumb} />
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <div className="inline-flex gap-x-2 text-gray-300">
            <span>{format(new Date(post.date), "MMM dd, yyyy")}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          {!!post.coverPhoto && (
            <figure className="relative -ml-4 mt-8 aspect-video w-[calc(100%+2rem)] overflow-hidden rounded-lg">
              <Image
                src={post.coverPhoto}
                alt={`${post.title} Cover Photo`}
                layout="fixed"
                width={864}
                height={486}
                objectFit="cover"
              />
            </figure>
          )}
        </div>
      </header>
      <section className="my-16">
        <div className="mx-auto flex max-w-4xl gap-8 px-8">
          <article className="prose prose-invert mx-auto min-w-0 max-w-2xl flex-1 prose-pre:-ml-4 prose-pre:w-[calc(100%+2rem)] prose-pre:rounded-lg prose-pre:border prose-pre:border-gray-700 prose-pre:bg-gray-900 prose-pre:text-base">
            <MDXContent components={MDXComponents} />
          </article>
          <aside className="hidden w-56 space-y-8 lg:block">
            <section id="tags">
              <SectionTitleBar title="Tags" />
              <TagsList tags={tags} />
            </section>
          </aside>
        </div>
      </section>
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
