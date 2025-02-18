import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../../constants";

interface SideBarProps {
  className?: string;
  isMobileMenuOpen: boolean;
}

export const SideBar: React.FC<SideBarProps> = ({ className = "", isMobileMenuOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      {/* Sidebar always visible on large screens */}
      <div className={`hidden lg:flex flex-col bg-white px-4 py-4 md:px-7 md:py-6 fixed top-[94px] z-50 h-[calc(100vh-94px)] lg:px-7 shadow-[5px_0_5px_-5px_rgba(0,0,0,0.1)] ${className}`}>
        <ul className="flex-1 space-y-0 overflow-y-auto">
          {navLinks.map((n) => (
            <li key={n.name}>
              <NavLink
                to={n.href}
                className={({ isActive }) =>
                  `inline-flex w-full items-center justify-between rounded-lg pl-4 pr-14 py-4.5 text-[#2E2E2E] outline-primary transition-colors ${isActive
                    ? "bg-primary text-primary-foreground [&_.count-badge]:bg-primary-foreground [&_.count-badge]:text-primary"
                    : "hover:bg-primary/10 focus:text-primary [&_.count-badge]:bg-primary [&_.count-badge]:text-primary-foreground"
                  }`
                }
                end={n.href === "/app"}
                preventScrollReset={n.name === "Explore"}
              >
                <span className="inline-flex items-center gap-3">
                  {typeof n.icon === "function" ? <n.icon /> : null}
                  <span className="whitespace-nowrap">{n.name}</span>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 cursor-pointer" onClick={handleLogout}>
          <LogOutIcon /> <span>Log out</span>
        </div>
      </div>

      {/* Sidebar with animation for mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed z-50 flex flex-col bg-white px-4 py-4 md:px-7 md:py-6 h-screen lg:px-7 shadow-[5px_0_5px_-5px_rgba(0,0,0,0.1)] max-lg:block ${className}`}
          >
            <ul className="flex-1 space-y-0">
              {navLinks.map((n) => (
                <li key={n.name}>
                  <NavLink
                    to={n.href}
                    className={({ isActive }) =>
                      `inline-flex w-full items-center justify-between rounded-lg pl-4 pr-14 py-4.5 text-[#2E2E2E] outline-primary transition-colors ${isActive
                        ? "bg-primary text-primary-foreground [&_.count-badge]:bg-primary-foreground [&_.count-badge]:text-primary"
                        : "hover:bg-primary/10 focus:text-primary [&_.count-badge]:bg-primary [&_.count-badge]:text-primary-foreground"
                      }`
                    }
                    end={n.href === "/app"}
                    preventScrollReset={n.name === "Explore"}
                  >
                    <span className="inline-flex items-center gap-3">
                      {typeof n.icon === "function" ? <n.icon /> : null}
                      <span className="whitespace-nowrap">{n.name}</span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex gap-3 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOutIcon /> <span>Log out</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
