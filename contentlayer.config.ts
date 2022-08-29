import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import slug from "slug";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "blogs/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    tags: { type: "list", required: true, of: [{ type: "string" }] },
    draft: { type: "boolean", required: true },
  },
  computedFields: {
    readingTime: {
      type: "string",
      resolve: (doc) => readingTime(doc.body.raw).text,
    },
    slug: {
      type: "string",
      resolve: (doc) => slug(doc.title),
    },
  },
}));

export default makeSource({
  contentDirPath: "src/contents",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
