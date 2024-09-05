import { FaHome, FaCog } from "react-icons/fa";
import { NavItem } from "@/types/navItems";

export const navItems: NavItem[] = [
  {
    type: "link",
    href: "/",
    icon: FaHome,
    label: "Home",
  },
  {
    type: "header",
    label: "Settings",
  },
  {
    type: "link",
    href: "/settings",
    icon: FaCog,
    label: "Settings",
  },
];
