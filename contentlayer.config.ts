import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import remarkPrism from "remark-prism";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    coverPhoto: { type: "string", required: false },
    date: { type: "string", required: true },
    tags: { type: "list", required: true, of: [{ type: "string" }] },
    draft: { type: "boolean", required: false },
  },
  computedFields: {
    readingTime: {
      type: "string",
      resolve: (doc) => readingTime(doc.body.raw).text,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx/, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "contents",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkPrism],
    rehypePlugins: [],
  },
});
