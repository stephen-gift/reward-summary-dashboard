"use client";

import { navItems } from "@/constants/navData";
import { List, ListItem, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { NavItem } from "./NavItem";
import { Logo } from "../Logo";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleNavItemClick = (index: number, href?: string) => {
    setActiveIndex(index);
    if (href) {
      router.push(href);
    }
  };
  return (
    <VStack
      alignItems="flex-start"
      width="full"
      height="100%"
      justifyContent={"flex-start"}
      maxW={{ base: 56, "2xl": 72 }}
      borderRightColor="gray.dark"
      borderRightWidth={2}
      flexShrink={0}
    >
      <Logo />

      <List width="full" overflowY="auto">
        {navItems.map((item, index) => (
          <ListItem key={item.label}>
            <NavItem
              item={item}
              isActive={index === activeIndex}
              onClick={() => handleNavItemClick(index, item.href)}
            />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Sidebar;
