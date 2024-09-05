import { IconType } from "react-icons";

export type NavItem = {
  type: "link" | "header";
  label: string;
  href?: string;
  icon?: IconType; // Icon is only required for 'link' items
};