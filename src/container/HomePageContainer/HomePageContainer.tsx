'use client'
import { HomepageComponent } from "@/components";
import Layout from "@/components/Layout";
import { Box } from "@chakra-ui/react";

const HomePageContainer = () => {
  return (
    <Box>
      <Layout>
        <HomepageComponent />
      </Layout>
    </Box>
  );
};

export default HomePageContainer;
