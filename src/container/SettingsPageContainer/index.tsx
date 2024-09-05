import SettingsPageComponent from "@/components/SettingsPageComponent";
import { VStack } from "@chakra-ui/react";

const SettingsPageContainer = () => {
  return (
    <VStack h="100vh" w={"full"} overflow={"hidden"} spacing={0}>
      <SettingsPageComponent />
    </VStack>
  );
};

export default SettingsPageContainer;
