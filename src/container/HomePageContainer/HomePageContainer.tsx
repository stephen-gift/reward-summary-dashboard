import { HomepageComponent } from "@/components";
import { VStack } from "@chakra-ui/react";

const HomePageContainer = () => {
  return (
    <VStack h="100vh" w={"full"} overflow={"hidden"} spacing={0}>
      <HomepageComponent />
    </VStack>
  );
};

export default HomePageContainer;
