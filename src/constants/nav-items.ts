import { LayoutDashboard, Users, Calendar, Bell } from "lucide-react";

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
    href: "/birthday-calendar",
    icon: Calendar,
  },
  {
    name: "Notification Settings",
    href: "/notification-settings",
    icon: Bell,
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
    href: "/birthday-calendar",
    icon: Calendar,
  },
];