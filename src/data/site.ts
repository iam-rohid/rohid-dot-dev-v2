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
    href: "https://github.com/rohid-dev",
    icon: "fa-github",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/rohid_dev",
    icon: "fa-twitter",
  },
  {
    label: "Linked In",
    href: "https://www.linkedin.com/in/md-rohidul-islam-04a655229",
    icon: "fa-linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC3fyatEjSzRkzt_Wj1sg1hw",
    icon: "fa-youtube",
  },
];

export const profilePic = {
  url: "/images/profile_pic.jpg",
  alt: "Profile Pic",
};

export const featuredPosts = [
  "nextjs-setup-with-typescript-and-tailwindcss",
  "nextjs-with-typescript",
  "top-10-vscode-extensions-for-react",
];

export const featuredTags = [
  "typescript",
  "nextjs",
  "react",
  "firebase",
  "supabase",
];
