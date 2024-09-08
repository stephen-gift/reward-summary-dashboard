import { Flex, Icon, Box, useStyleConfig } from "@chakra-ui/react";
import { NavItemProps, LinkItemProps } from "../../types/layout";
import { FiHome } from "react-icons/fi";


export const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, href: "/" },
  
];

const NavItem = ({
  icon,
  children,
  href,
  isActive,
  ...rest
}: NavItemProps & { href: string; isActive?: boolean }) => {
  const styles = useStyleConfig("NavItem", { isActive });
  return (
    <Box
      as="a"
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      sx={styles}
    >
      <Flex
        align="center"
        p="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        bg={isActive ? "cyan.400" : "transparent"}
        color={isActive ? "white" : "inherit"}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export default NavItem;
