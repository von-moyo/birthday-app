import { LayoutDashboard, Users, Calendar } from "lucide-react";

export const adminNavLinks = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Staff Management",
    href: "/staff-management",
    icon: Users,
  },
  {
    name: "Birthday Calendar",
    href: "/calendar",
    icon: Calendar,
  },
];

export const guestNavLinks = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Birthday Calendar",
    href: "/calendar",
    icon: Calendar,
  },
];