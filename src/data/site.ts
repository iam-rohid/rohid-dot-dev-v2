export const mainMenu = [
  {
    label: "Home",
    href: "/",
    match: "^/$",
  },
  {
    label: "Posts",
    href: "/posts",
    match: "^/posts/?.*",
  },
  {
    label: "Tags",
    href: "/tags",
    match: "^/tags/?.*",
  },
  {
    label: "Newsletter",
    href: "/newsletter",
    match: "^/newsletter/?.*",
  },
  {
    label: "About",
    href: "/about",
    match: "^/about/?.*",
  },
];

export const socialLinks = [
  {
    label: "Github",
    href: "https://github.com",
    icon: "fa-github",
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: "fa-twitter",
  },
  {
    label: "Linked In",
    href: "https://linkedin.com",
    icon: "fa-linkedin",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: "fa-youtube",
  },
];

export const profilePic = {
  url: "/images/profile_pic.jpg",
  alt: "Profile Pic",
};

export const featuredPosts = [
  "next-js-setup-with-typescript-and-tailwindcss",
  "next-js-with-typescript",
  "top-10-vs-code-extensions-for-react",
];

export const featuredTags = [
  "typescript",
  "next-js",
  "react",
  "firebase",
  "supabase",
];
