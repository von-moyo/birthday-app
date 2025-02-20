import { LayoutDashboard, Users, Calendar, Bell } from "lucide-react";

export const navLinks = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard, // A grid-like dashboard icon
  },
  {
    name: "Staff Management",
    href: "/staff-management",
    icon: Users, // Multiple user profiles icon
  },
  {
    name: "Birthday Calendar",
    href: "/birthday-calendar",
    icon: Calendar, // Calendar icon
  },
  {
    name: "Notification Settings",
    href: "/notification-settings",
    icon: Bell, // Bell/notification icon
  },
];
