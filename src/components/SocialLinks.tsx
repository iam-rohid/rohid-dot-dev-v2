import Link from "next/link";
import { FaGithub, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <ul className="flex items-center">
      <li>
        <Link href="https://github.com/rohid-dev">
          <a
            className="group block p-3"
            target="_blank"
            rel="noreferrer"
            aria-label="Github"
          >
            <span className="text-2xl transition-colors duration-300 ease-in-out group-hover:text-priamry-400">
              <FaGithub className="transition-transform duration-300 ease-in-out group-hover:scale-125" />
            </span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="https://twitter.com/rohid_dev">
          <a
            className="group block p-3"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <span className="text-2xl transition-colors duration-300 ease-in-out group-hover:text-priamry-400">
              <FaTwitter className="transition-transform duration-300 ease-in-out group-hover:scale-125" />
            </span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="https://www.youtube.com/channel/UC3fyatEjSzRkzt_Wj1sg1hw">
          <a
            className="group block p-3"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            <span className="text-2xl transition-colors duration-300 ease-in-out group-hover:text-priamry-400">
              <FaYoutube className="transition-transform duration-300 ease-in-out group-hover:scale-125" />
            </span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="https://instagram.com/rohid.dev">
          <a
            className="group block p-3"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <span className="text-2xl transition-colors duration-300 ease-in-out group-hover:text-priamry-400">
              <FaInstagram className="transition-transform duration-300 ease-in-out group-hover:scale-125" />
            </span>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default SocialLinks;
