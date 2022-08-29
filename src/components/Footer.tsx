import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <SocialLinks />
        <p className="text-center text-gray-600 dark:text-gray-400">
          Copyright © 2022 rohid.dev | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
