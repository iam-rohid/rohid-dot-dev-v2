import PageHeader from "@/components/PageHeader";
import PostRow from "@/components/PostRow";
import { allPosts, Post } from "@/contentlayer/generated";
import BaseLayout from "@/layouts/BaseLayout";
import { CustomNextPage } from "@/types/next";
import { compareDesc } from "date-fns";
import { GetStaticProps } from "next";
import { Fragment } from "react";

interface Props {
  posts: Post[];
}

const PostsPage: CustomNextPage<Props> = (props) => {
  const { posts } = props;
  return (
    <Fragment>
      <PageHeader title="Post" subtitle={`${posts.length} Posts`} />
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

PostsPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default PostsPage;

export const getStaticProps: GetStaticProps<Props> = () => {
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((b1, b2) => b1.title.localeCompare(b2.title))
    .sort((b1, b2) => {
      return compareDesc(new Date(b1.publishedAt), new Date(b2.publishedAt));
    });

  return {
    props: {
      posts,
    },
  };
};
