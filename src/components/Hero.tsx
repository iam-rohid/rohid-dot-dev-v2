import Image from "next/image";
import SocialLinks from "./SocialLinks";

const Hero = () => {
  return (
    <header className="my-32">
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-16 px-8 md:flex-row">
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <h1 className="leading-loose">
            <span className="text-5xl font-bold">Hi 👋</span>
            <br />
            <span className="bg-gradient-to-br from-priamry-300 to-priamry-500 bg-clip-text text-6xl font-black text-transparent md:text-7xl">
              I&apos;m Rohid
            </span>
          </h1>
          <p className="my-4 text-2xl text-gray-300">
            I&apos;m a self-thought developer &amp; designer
          </p>
          <div className="mt-6 flex flex-col-reverse items-center gap-8 sm:flex-row">
            <a
              href="mailto:rohidul209@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 items-center justify-center rounded-md px-4 font-medium text-priamry-400 ring-2 ring-priamry-400 transition-all duration-300 hover:bg-priamry-400 hover:text-gray-900 hover:ring-0"
            >
              Contact Me
            </a>
            <SocialLinks />
          </div>
        </div>

        <div className="relative h-40 w-40">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-priamry-300 to-priamry-500"></div>
          <Image
            src="/images/profile-pic.jpg"
            layout="fill"
            objectFit="cover"
            alt="Rohid - Profile Pic"
            className="overflow-hidden rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Hero;
