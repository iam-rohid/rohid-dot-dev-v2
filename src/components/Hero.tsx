import Image from "next/image";
import { profilePic } from "@/data/site.json";
import SocialLinks from "./SocialLinks";

const Hero = () => {
  return (
    <div className="max-w-xl mx-auto px-4 text-center flex flex-col items-center gap-6 py-12 w-full">
      <div className="relative w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <Image
          src={profilePic.url}
          alt={profilePic.alt}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 object-cover"
        />
      </div>

      <h1 className="text-3xl font-black font-mono text-gray-700 dark:text-gray-200 leading-10">
        Rohidul Islam
      </h1>

      <SocialLinks />

      <form className="w-full">
        <p className="pb-4 text-gray-600 dark:text-gray-400">
          Get dev news on every Sunday for free!
        </p>
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none shadow-blue-900/10 rounded-lg overflow-hidden flex">
          <input
            type="text"
            className="flex-1 w-full h-12 outline-none px-4 font-medium text-lg block bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-600"
            placeholder="Enter your email address"
          />
          <div className="p-1.5">
            <button className="bg-gray-800 text-white dark:bg-white dark:text-gray-900 font-medium px-4 rounded-md h-9 flex items-center justify-center">
              Subscribe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Hero;
