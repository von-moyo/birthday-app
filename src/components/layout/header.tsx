import React, { useEffect, useState } from "react";
import { MenuIcon, XIcon, Lock } from "lucide-react";
import { Search } from "../search";
import { LogoIcon } from "../../assets/icons";
import { Link } from "react-router-dom";
import AnimatedDropdown from "./animated-dropdown";
import { useAuth } from "../../context/authContext";
import { useFetchAdminDetails } from "@/hooks";
interface HeaderProps {
  className?: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  className = "",
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { isAuthenticated } = useAuth();
  const { fetchAdminDetails } = useFetchAdminDetails();

  useEffect(() => {
    if (isAuthenticated && localStorage.getItem("staffID")) {
      fetchAdminDetails(localStorage.getItem("staffID") || '');
    }
  }, [isAuthenticated])

  return (
    <>
      <header
        className={`
          sticky top-0 z-[60] flex items-center justify-between gap-4 bg-white sm:px-8 px-4 sm:py-[14.5px] py-[10px]
          ${className}
        `}
      >
        <Link to="/" className="mr-6">
          <div className='flex items-center cursor-pointer'>
            <img src={LogoIcon} alt="birthday-icon" className=' sm:w-16 sm:h-16 w-12 h-12' />
            <div className="sm:-mt-1 text-start sm:w-auto w-[100px]">
              <h2 className="sm:text-[20px] text-[16px] font-semibold text-[#4162FF] leading-[0.5]">Birthday</h2>
              <p className="sm:text-[15px] text-[12px] font-medium text-[#8396f6]">Tracker</p>
            </div>

          </div>
        </Link>
        <Search className="sm:w-[425px] w-full sm:h-[46px] h-[36px] !rounded-full" placeholder={"Search by name and department..."} setIsSearchExpanded={setIsSearchExpanded} />
        <div className="flex items-center gap-8">
          {isAuthenticated ? (
            <>
              <p className="lg:text-[18px] text-[16px] font-medium text-[#1E272F] hidden md:block">Welcome Admin</p>
              <AnimatedDropdown />
            </>
          ) : (
            <>
              <p className="lg:text-[18px] text-[16px] font-medium text-[#1E272F] hidden lg:block">Welcome Guest</p>
              <Link to="/login" className="lg:flex hidden justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"><Lock className="w-4 h-4 mr-2" /> Login as Admin</Link>
            </>
          )}

          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className={`
                flex lg:hidden cursor-pointer text-foreground-light relative z-[50] box-content h-6 w-6 p-1 transition-transform duration-200 ease-in
                ${isMobileMenuOpen ? "relative z-[50] rotate-180" : "rotate-0"}
                ${isSearchExpanded ? "hidden" : ""}
              `}
            type="button"
          >
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
    </>
  );
};