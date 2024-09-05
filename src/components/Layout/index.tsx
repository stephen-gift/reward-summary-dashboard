import { HStack, VStack } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import { LayoutProps } from "@/types/layoutProps";

const Layout = ({ children }: LayoutProps) => {
  return (
    <HStack h={"100vh"} width="full" flex={1} overflow="hidden">
      <Sidebar />
      <VStack
        px={12}
        pt={12}
        width="full"
        height="full"
        spacing={6}
        overflow="hidden"
      >
        {children}
      </VStack>
    </HStack>
  );
};

export default Layout;
