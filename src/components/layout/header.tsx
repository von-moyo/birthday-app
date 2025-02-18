import React, { useRef, useEffect, useState } from "react";
import { ChevronDownIcon, LogOut, MenuIcon, SettingsIcon, XIcon } from "lucide-react";
import { Search } from "../search";
import { BirthDayIcon } from "../../assets/icons";
import { NoPfp } from "../../assets/images";
import { useClickOutside } from "../../hooks";
import { useNavigate } from "react-router-dom";
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

  const [dropdown, setDropdown] = useState(false);
  const dropdownButtonRef = useRef<HTMLDivElement | null>(null);
  const dropdownPopupRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(dropdownPopupRef, dropdownButtonRef, () =>
    setDropdown(false)
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <header
        className={`
          sticky top-0 z-[60] flex items-center justify-between bg-white px-8 py-[14.5px] border-b border-[#D9D9D9]
          ${className}
        `}
      >
        <h2 className='flex items-center gap-2 md:text-2xl text-xl font-bold text-blue-800'>
          <img src={BirthDayIcon} alt="birthday-icon" className=' md:w-16 md:h-16 w-12 h-12' />
          Birthday App
        </h2>
        <Search className="w-[425px] !rounded-full" placeholder={"Search"} />
        <div className="flex items-center gap-8">
          <p>Welcome Admin</p>
          <div className="relative">
            <div
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center gap-4 cursor-pointer"
              ref={dropdownButtonRef}>
              <div className="h-[40px] w-[40px] rounded-[15px] border border-gray-300 overflow-hidden grid place-content-center">
                <img src={NoPfp} alt="no-pfp" className="w-full h-full object-cover mt-1" />
              </div>
              <ChevronDownIcon />
            </div>
            {dropdown && (
              <div
                ref={dropdownPopupRef}
                className='absolute -right-[25px] top-[40px] z-[99] mt-[15px] flex w-[250px] flex-col gap-2 rounded-[20px] bg-[#FFFFFF] p-4 pt-0 shadow-lg'
                style={{ boxShadow: '0rem .25rem .625rem 0rem #00000040' }}
              >
                <div className='mb-2 mt-4 flex items-center gap-3'>
                  <div className='my-2 grid h-[37px] w-[37px] place-content-center rounded-[15px] border border-gray-300 border-opacity-50 overflow-hidden'>
                    {NoPfp ? (
                      <img
                        src={NoPfp}
                        alt='Profile picture'
                        loading='eager'
                        className='h-[37px] w-[37px] object-cover mt-2'
                      />
                    ) : (
                      <p className='text-[#898989]'>V K</p>
                    )}
                  </div>
                  <div>
                    <p className='line-clamp-1 max-w-[150px] font-medium text-[#1E272F]'>
                      Von Kloss
                    </p>
                    <p className='line-clamp-1 max-w-[150px] text-xs font-light text-[#898989]'>
                      vonkloss@gmail.com
                    </p>
                  </div>
                </div>
                <div className='flex flex-col gap-3 border-b border-t border-[#C4C4C480] py-4'>
                  <a
                    href='/dashboard/profile'
                    className='items-center flex h-fit cursor-pointer gap-2 rounded-[.3125rem] px-2 py-1'
                    onClick={() => {
                      setDropdown(false);
                    }}
                  >
                    <SettingsIcon size={20} color='#12121280' />
                    <p
                      className={
                        'cursor-pointer text-sm font-light text-[#12121280]'
                      }
                    >
                      Manage Account
                    </p>
                  </a>
                </div>
                <div
                  className='items-between my-1 flex h-fit cursor-pointer gap-2 rounded-[.3125rem] px-2 py-1'
                  onClick={handleLogout}
                >
                  <LogOut size={20} color='#D74B42' />
                  <p className='text-sm font-light text-[#D74B42]'>Logout</p>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className={`
                flex lg:hidden cursor-pointer text-foreground-light relative z-[50] box-content h-6 w-6 p-1 transition-transform duration-200 ease-in
                ${isMobileMenuOpen ? "relative z-[50] rotate-180" : "rotate-0"}
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