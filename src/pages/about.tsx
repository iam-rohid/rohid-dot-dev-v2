import BaseLayout from "@/layouts/BaseLayout";
import { CustomNextPage } from "@/types/next";

const AboutPage: CustomNextPage = () => {
  return <></>;
};

AboutPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default AboutPage;
