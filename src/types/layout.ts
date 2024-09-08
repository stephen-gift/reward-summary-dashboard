import { IconType } from "react-icons";
import { BoxProps, FlexProps } from "@chakra-ui/react";

export interface LinkItemProps {
  name: string;
  href?: string;
  icon: IconType;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}
