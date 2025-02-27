import { differenceInYears, format, isSameDay, parseISO } from "date-fns";
import { formatTitle, getInitials } from "../../../utils";
import { motion } from "framer-motion";
import { Gift, MessageCircleIcon } from "lucide-react";
import { Staff } from "../../../types/types";

const BirthdayCard = ({ staff, isUpcoming }: { staff: Staff & { date_of_birth: string }; isUpcoming?: boolean }) => {
  const today = new Date();
  const dob = parseISO(staff.date_of_birth);
  const isBirthdayToday = isSameDay(dob, today);
  const age = differenceInYears(today, new Date(staff.date_of_birth));

  return (
    <div key={staff.id} className="card transition-all duration-200 border border-gray-200 rounded-lg mb-6">
      <div className="flex items-center justify-between xl:px-8 md:px-4 px-3 xl:py-6 md:py-3 py-2">
        <div className="flex items-center gap-6">

          <motion.div
            className="my-2 grid h-[45px] w-[45px] place-content-center rounded-[15px] border border-gray-300 border-opacity-50 overflow-hidden flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {staff.image && staff.image !== "" && staff.image !== "string" ? (
              <img
                src={staff.image}
                alt={`${staff.name}'s profile picture`}
                loading="eager"
                className="h-[45px] w-[45px] object-cover rounded-[15px]"
              />
            ) : (
              <p className="text-gray-600 font-semibold">{getInitials(staff.name)}</p>
            )}
          </motion.div>


          <div className='md:text-base sm:text-sm text-xs'>
            <h3 className="font-semibold md:text-lg sm:text-base text-sm text-gray-900">{staff.name}</h3>
            <p className="text-gray-600">{formatTitle(staff.department)}</p>
            <div className="sm:text-sm text-xs text-[#8396f6] flex items-center gap-2 sm:mt-2">
              {isBirthdayToday ? (
                <Gift className="sm:w-5 sm:h-5 w-4 h-4 text-primary-500" />
              ) : (
                <p>🎂</p>
              )}
              {!isBirthdayToday ? (
                <div className="flex flex-wrap line-clamp-1">Turning {age} on {format(dob, 'MMMM do')} 🎉</div>
              ) : (
                <div className="flex flex-wrap line-clamp-1">Turning {age} today! 🎉 <span className='text-sm sm:block hidden line-clamp-1'>({format(dob, 'MMMM do')})</span></div>
              )}
            </div>
          </div>
        </div>

        <a
          href={`mailto:${staff.email}?subject=🎉 Happy Birthday, ${staff.name}!&body=Dear%20${staff.name},%0D%0A%0D%0AWishing%20you%20a%20wonderful%20birthday!%0D%0A%0D%0ABest%20wishes,%0D%0A${'Replace with your name'}`}
        >
          <button className="bg-blue-500 text-white xl:p-4 md:p-3 p-2 cursor-pointer rounded-full flex items-center justify-center">
            <MessageCircleIcon className="xl:w-8 md:w-6 w-5 xl:h-8 md:h-6 h-5 text-white fill-white" />
          </button>
        </a>
      </div>
    </div>
  );
};

export { BirthdayCard };      