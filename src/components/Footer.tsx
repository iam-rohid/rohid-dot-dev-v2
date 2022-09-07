import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto w-full max-w-4xl space-y-4 px-8 py-16">
        <div className="flex items-center justify-center">
          <SocialLinks />
        </div>
        <p className="text-center text-gray-400">
          Copyright © 2022 rohid.dev | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
