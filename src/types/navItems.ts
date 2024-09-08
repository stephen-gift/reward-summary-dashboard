import { IconType } from "react-icons";

export type NavItem = {
  type: "link" | "header";
  label: string;
  href?: string;
  icon?: IconType;
};
