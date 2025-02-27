import { differenceInYears, format, isSameDay, parseISO } from "date-fns";
import { Employee } from "../../../types";
import { getInitials } from "../../../utils";
import { motion } from "framer-motion";
import { Gift, MessageCircleIcon } from "lucide-react";

const BirthdayCard = ({ employee, isUpcoming }: { employee: Employee & { date_of_birth: string }; isUpcoming?: boolean }) => {
  const today = new Date();
  const dob = parseISO(employee.date_of_birth);
  const isBirthdayToday = isSameDay(dob, today);
  const age = differenceInYears(today, new Date(employee.date_of_birth));

  const formatTitle = (str: string): string => {
    return str
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div key={employee.id} className="card transition-all duration-200 border border-gray-100 rounded-lg mb-6">
      <div className="flex items-center justify-between xl:px-8 md:px-4 px-3 md:py-6 sm:py-4 py-3">
        <div className="flex items-center gap-6">

          <motion.div
            className="my-2 grid h-[45px] w-[45px] place-content-center rounded-[15px] border border-gray-300 border-opacity-50 overflow-hidden flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {employee.image && employee.image !== "" && employee.image !== "string" ? (
              <img
                src={employee.image}
                alt={`${employee.name}'s profile picture`}
                loading="eager"
                className="h-[45px] w-[45px] object-cover rounded-[15px]"
              />
            ) : (
              <p className="text-gray-600 font-semibold">{getInitials(employee.name)}</p>
            )}
          </motion.div>


          <div className='md:text-base text-sm'>
            <h3 className="font-semibold md:text-lg text-base text-gray-900">{employee.name}</h3>
            <p className="text-gray-600">{formatTitle(employee.department)}</p>
            <div className="text-sm text-[#8396f6] flex items-start gap-2 sm:mt-2">
              {isBirthdayToday ? (
                <Gift className="w-5 h-5 text-primary-500" />
              ) : (
                <p>🎂</p>
              )}
              {isUpcoming ? (
                <div className="flex flex-wrap line-clamp-1">Turning {age} on {format(dob, 'MMMM do')} 🎉</div>
              ) : (
                <div className="flex flex-wrap line-clamp-1">Turning {age} today! 🎉 <span className='text-sm sm:block hidden line-clamp-1'>({format(dob, 'MMMM do')})</span></div>
              )}
            </div>
          </div>
        </div>

        <a
          href={`mailto:${employee.email}?subject=🎉 Happy Birthday, ${employee.name}!&body=Dear%20${employee.name},%0D%0A%0D%0AWishing%20you%20a%20wonderful%20birthday!%0D%0A%0D%0ABest%20wishes,%0D%0A${'Replace with your name'}`}
        >
          <button className="bg-blue-500 text-white md:px-4 px-2 md:py-4 py-2 cursor-pointer rounded-full flex items-center justify-center">
            <MessageCircleIcon className="md:w-8 md:h-8 w-6 h-6 text-white fill-white" />
          </button>
        </a>
      </div>
    </div>
  );
};

export { BirthdayCard };      