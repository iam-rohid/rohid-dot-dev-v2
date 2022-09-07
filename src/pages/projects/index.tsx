import BaseLayout from "@/layouts/BaseLayout";
import { CustomNextPage } from "@/types/next";

const ProjectsPage: CustomNextPage = () => {
  return <div>ProjectsPage</div>;
};

ProjectsPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default ProjectsPage;
