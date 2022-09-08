import { Post } from "@/contentlayer/generated";
import allPosts from "@/utils/allPosts";
import BaseLayout from "@/layouts/BaseLayout";
import { CustomNextPage } from "@/types/next";
import { GetStaticProps } from "next";
import SectionTitleBar from "@/components/SectionTitleBar";
import PostsList from "@/components/PostsList";
import { FaChevronDown } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { compareAsc, compareDesc } from "date-fns";
import featured from "@/data/featured.json";
interface Props {
  posts: Post[];
}

const filterOptions = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "featured",
    label: "Featured",
  },
];
const sortOptions = [
  {
    id: "date-desc",
    label: "Newest First",
  },
  {
    id: "date-asc",
    label: "Oldest First",
  },
  {
    id: "title",
    label: "Title",
  },
];

const sliceRegx = /\s/;

const PostsPage: CustomNextPage<Props> = (props) => {
  const { posts } = props;
  const router = useRouter();
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [searchText, setSearchText] = useState("");

  const filterdPosts = useMemo(() => {
    let fp: Post[] = [];
    fp = posts;

    fp = fp.filter((item) => {
      switch (filterBy) {
        case "featured":
          return featured.posts.includes(item.slug);

        default:
          return true;
      }
    });

    if (searchText) {
      fp = fp.filter((item) => {
        let searchKWs = searchText.toLocaleLowerCase().split(sliceRegx);
        const titleIncludes = item.title
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
        const descIncludes = (item.description || "")
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());

        const tilteKWMatch = () => {
          const titleKWs = item.title.toLocaleLowerCase().split(sliceRegx);
          return (
            searchKWs.filter((kw) => titleKWs.includes(kw)).length >=
            searchKWs.length
          );
        };
        const tagMatch = () => {
          return (
            searchKWs.filter((kw) => item.tags.includes(kw)).length >=
            searchKWs.length
          );
        };

        return titleIncludes || descIncludes || tilteKWMatch() || tagMatch();
      });
    }

    fp = fp.sort((p1, p2) => {
      switch (sortBy) {
        case "date-desc":
          return compareDesc(new Date(p1.date), new Date(p2.date));
        case "date-asc":
          return compareAsc(new Date(p1.date), new Date(p2.date));
        case "title":
          return p1.title.localeCompare(p2.title);
        default:
          return 0;
      }
    });
    return fp;
  }, [posts, sortBy, filterBy, searchText]);

  useEffect(() => {
    if (router.isReady) {
      if (typeof router.query.filter === "string") {
        setFilterBy(router.query.filter);
      }
      if (typeof router.query.sort === "string") {
        setSortBy(router.query.sort);
      }
      if (typeof router.query.search === "string") {
        setSearchText(router.query.search);
      }
    }
  }, [router]);

  return (
    <main>
      <header className="my-16">
        <div className="mx-auto w-full max-w-3xl px-8">
          <div className="mb-8">
            <h1 className="mb-1 text-3xl font-bold">Blog</h1>
            <p className="text-gray-300">
              Total <b>{posts.length}</b> posts
            </p>
          </div>
          <form>
            <input
              type="text"
              name="search"
              id="search"
              className="h-10 w-full rounded-md border border-gray-700 bg-transparent px-4"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-4">
                <label className="text-gray-300" htmlFor="filter-by">
                  Filter By
                </label>
                <div className="relative">
                  <select
                    name="filter"
                    id="filter-by"
                    className="relative h-8 appearance-none rounded border border-gray-700 bg-transparent pl-2 pr-8"
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value.trim())}
                  >
                    {filterOptions.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-300">
                    <FaChevronDown />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="text-gray-300" htmlFor="sort-by">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    name="sort"
                    id="sort-by"
                    className="relative h-8 appearance-none rounded border border-gray-700 bg-transparent pl-2 pr-8"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-300">
                    <FaChevronDown />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </header>
      <div className="mx-auto my-16 w-full max-w-3xl space-y-16 px-8">
        <section className="all">
          <SectionTitleBar
            title={
              !!searchText
                ? `Results for "${searchText}"`
                : filterBy === "all"
                ? "All Posts"
                : filterBy === "featured"
                ? "Featured Posts"
                : "Posts"
            }
            description={
              !!searchText
                ? `Total ${filterdPosts.length} posts found`
                : filterBy === "featured"
                ? `Total ${filterdPosts.length} featured posts found`
                : undefined
            }
          />
          <PostsList posts={filterdPosts} />
        </section>
      </div>
    </main>
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
