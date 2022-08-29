import tagsData from "@/data/tags.json";
import type { Tag } from "@/models/tag";

const getTagFromSlug = (slug: string) => {
  const storeTag = tagsData.find((tag) => tag.slug === slug);

  const tag: Tag = {
    title: slug,
    weight: 0,
    slug,
    ...storeTag,
    url: `/tags/${slug}`,
  };

  return tag;
};

export default getTagFromSlug;
