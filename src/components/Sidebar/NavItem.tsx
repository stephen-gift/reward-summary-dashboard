"use client";

import NextLink from "next/link";
import { Heading, Icon, Text, HStack, Box } from "@chakra-ui/react";
import { NavItem as Item } from "@/types/navItems";

type Props = {
  item: Item;
  isActive: boolean;
  onClick: () => void;
};

export const NavItem = ({ isActive, item, onClick }: Props) => {
  const { label, type } = item;

  if (type === "link") {
    const { icon, href } = item;

    return (
      <NextLink href={href || "#"} passHref>
        <Box _hover={{ textDecoration: "none" }} onClick={onClick}>
          <HStack
            align="center"
            justify="flex-start"
            height={{ base: 10, "2xl": 14 }}
            transition="ease-out"
            transitionProperty="background"
            transitionDuration="normal"
            _hover={{
              background: "gray.dark",
            }}
          >
            <Icon
              width={5}
              height={5}
              mr={4}
              ml={8}
              color={isActive ? "red.200" : "gray"}
              as={icon}
            />
            <Text
              fontSize="md"
              fontWeight="medium"
              flex={1}
              letterSpacing="wider"
              color={isActive ? "red.200" : "gray"}
            >
              {label}
            </Text>
            {isActive && <Box width={1} height={6} bg="red.200" />}
          </HStack>
        </Box>
      </NextLink>
    );
  }

  return (
    <Heading
      color="gray.400"
      fontWeight="normal"
      textTransform="uppercase"
      letterSpacing={6}
      fontSize="sm"
      ml={8}
      mt={{ base: 6, "2xl": 8 }}
      mb={2}
    >
      {label}
    </Heading>
  );
};
