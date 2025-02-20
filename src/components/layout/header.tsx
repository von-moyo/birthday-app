import React, { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Search } from "../search";
import { LogoIcon } from "../../assets/icons";
import { useNavigate, Link } from "react-router-dom";
import AnimatedDropdown from "./animated-dropdown";

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
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);


  return (
    <>
      <header
        className={`
          sticky top-0 z-[60] flex items-center justify-between gap-4 bg-white sm:px-8 px-4 sm:py-[14.5px] py-[10px] border-b border-[#D9D9D9]
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
        <Search className="sm:w-[425px] w-full sm:h-[46px] h-[36px] !rounded-full" placeholder={"Search"} setIsSearchExpanded={setIsSearchExpanded} />
        <div className="flex items-center gap-8">
          {isAdmin && <p className="text-[18px] font-medium text-[#1E272F]">Welcome Admin</p>}
          <AnimatedDropdown />
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