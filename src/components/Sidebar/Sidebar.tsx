import {
  Box,
  Button,
  CloseButton,
  Flex,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import NavItem, { LinkItems } from "./NavItem";
import { SidebarProps } from "../../types/layout";
import { Logo } from "../Logo";
import { usePathname } from "next/navigation";
import { useBookingsStore } from "../../../store";

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const pathname = usePathname();
  const { initializeStore } = useBookingsStore();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <VStack spacing={8} align="stretch" px={4}>
        <Flex direction="column" w="full">
          {LinkItems.map((link) => (
            <NavItem
              key={link.name}
              icon={link.icon}
              href={link.href as string}
              isActive={pathname === link.href}
            >
              {link.name}
            </NavItem>
          ))}
        </Flex>
        <Button colorScheme="teal" onClick={initializeStore}>
          Initialize Bookings
        </Button>
      </VStack>
    </Box>
  );
};

export default SidebarContent;
