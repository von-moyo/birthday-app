import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, SettingsIcon, LogOut } from 'lucide-react';
import { useClickOutside } from '../../hooks';
import { Pfp } from '../../assets/images';
import { getFirstName, getInitials } from '../../utils';
import { useLogout } from '../../hooks';

const AnimatedDropdown = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownButtonRef = useRef(null);
  const dropdownPopupRef = useRef(null);
  const name = 'Von Kloss';
  const email = 'vonkloss@gmail.com';
  const logout = useLogout();
  useClickOutside(dropdownPopupRef, dropdownButtonRef, () =>
    setDropdown(false)
  );

  return (
    <div className="relative lg:block hidden">
      <motion.div
        onClick={() => setDropdown(!dropdown)}
        className="flex items-center gap-4 cursor-pointer"
        ref={dropdownButtonRef}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <motion.div 
          className="h-[40px] w-[40px] rounded-[15px] border border-gray-300 overflow-hidden grid place-content-center"
          whileHover={{ borderColor: '#000' }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <img src={Pfp} alt="profile" className="w-full h-full object-cover rounded-[15px]" />
        </motion.div>
        <p>{getFirstName(name)}</p>
        <motion.div
          animate={{ rotate: dropdown ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          
          <ChevronDownIcon color="#898989"/>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {dropdown && (
          <motion.div
            ref={dropdownPopupRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-[40px] z-[99] mt-[15px] flex w-[250px] flex-col rounded-[20px] bg-[#FFFFFF] py-4 pt-0 shadow-lg"
          >
            <motion.div className="mb-2 mt-4 flex items-center gap-3 px-4">
              <motion.div 
                className="my-2 grid h-[37px] w-[37px] place-content-center rounded-[15px] border border-gray-300 border-opacity-50 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                  {Pfp ? (
                    <img
                      src={Pfp}
                      alt="Profile picture"
                      loading="eager"
                      className="h-full w-full object-cover rounded-[15px]"
                    />
                  ) : (
                    <p>{getInitials(name)}</p>
                  )}
              </motion.div>
              <div>
                <p className="line-clamp-1 max-w-[150px] font-medium text-[#1E272F]">
                  {name}
                </p>
                <p className="line-clamp-1 max-w-[150px] text-xs font-light text-[#898989]">
                  {email}
                </p>
              </div>
            </motion.div>

            <div className="flex flex-col gap-3 border-b border-t border-[#C4C4C480]">
              <motion.a
                href="/profile"
                className="items-center flex h-fit cursor-pointer gap-2 rounded-[.3125rem] px-6 py-4"
                onClick={() => setDropdown(false)}
                initial={{ backgroundColor: "transparent" }}
                whileHover={{ backgroundColor: '#f5f5f5' }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeInOut",
                  backgroundColor: { duration: 0.15 }
                }}
              >
                <SettingsIcon size={20} color="#12121280" />
                <p className="cursor-pointer text-sm font-light text-[#12121280]">
                  Manage Account
                </p>
              </motion.a>
            </div>

            <motion.div
              className="items-between py-3 flex h-fit cursor-pointer gap-2 rounded-[.3125rem] px-6"
              onClick={logout}
              initial={{ backgroundColor: "transparent" }}
              whileHover={{ backgroundColor: '#fff1f1' }}
              transition={{ 
                duration: 0.2, 
                ease: "easeInOut",
                backgroundColor: { duration: 0.15 }
              }}
            >
              <LogOut size={20} color="#D74B42" />
              <p className="text-sm font-light text-[#D74B42]">Logout</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedDropdown;