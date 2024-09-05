import { HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const HomepageComponent = () => {
  return (
    <HStack width="full" flex={1} overflow="hidden">
      <Text>SideBar Component</Text>
      {/* SideBar */}
      <VStack
        px={12}
        pt={12}
        width="full"
        height="full"
        spacing={6}
        overflow="hidden"
      >
        <Text>HomepageComponent</Text>
        {/* Main Content */}
      </VStack>
    </HStack>
  );
};

export default HomepageComponent;
