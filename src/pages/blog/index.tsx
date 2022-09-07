import PageHeader from "@/components/PageHeader";
import PostRow from "@/components/PostRow";
import { Post } from "@/contentlayer/generated";
import allPosts from "@/utils/allPosts";
import BaseLayout from "@/layouts/BaseLayout";
import { CustomNextPage } from "@/types/next";
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
        <div className="mx-auto max-w-4xl px-4 py-16">
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
  const posts = allPosts;

  return {
    props: {
      posts,
    },
  };
};
