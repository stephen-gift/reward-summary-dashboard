import {
  Flex,
  IconButton,
  HStack,
  Avatar,
  VStack,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Button,
  useColorMode,
  Switch,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { MobileProps } from "../../types/layout";
import { useBookingsStore } from "../../../store";

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { withdrawableCashback, updateWithdrawableCashback, stats } =
    useBookingsStore();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              as={Button}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="bold"
              cursor="pointer"
              rightIcon={<FiChevronDown />}
            >
              ${withdrawableCashback.toFixed(2)}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  updateWithdrawableCashback(); 
                }}
              >
                Update Withdrawable Cashback (${stats.totalCashback.toFixed(2)})
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  name="Justina Clark"
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>
                <HStack justify="space-between" w="full">
                  <Text>Dark Mode</Text>
                  <Switch
                    isChecked={colorMode === "dark"}
                    onChange={toggleColorMode}
                  />
                </HStack>
              </MenuItem>
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
