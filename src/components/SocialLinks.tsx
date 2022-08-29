import { socialLinks } from "@/data/site.json";
import Link from "next/link";

const SocialLinks = () => {
  return (
    <ul className="flex items-center justify-center gap-1">
      {socialLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>
            <a
              target="_blank"
              className="flex h-9 w-9 items-center justify-center rounded-md text-xl text-gray-600 shadow-blue-900/10 hover:bg-white hover:text-gray-900 hover:shadow-lg dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <i className={`fa-brands ${link.icon}`} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
