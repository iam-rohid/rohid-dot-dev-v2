---
layout: "@/layouts/BlogLayout.astro"
title: "My second post"
description: "This is my second post"
date: "10 Aug 2022"
tags:
  - tailwindcss
  - typescript
draft: false
---

## Hello wrold 2

This is a **bold** text

## This is section

```js
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

const remarkReadingTime = () => {
  return (tree, { data }) => {
    const text = toString(tree);
    const readingTime = getReadingTime(text);
    data.astro.frontmatter.readingTime = readingTime.text;
  };
};

export default remarkReadingTime;
```
