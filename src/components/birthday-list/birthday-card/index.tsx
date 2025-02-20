import { differenceInYears, format, isSameDay, parseISO } from "date-fns";
import { Employee } from "../../../types";
import { getInitials } from "../../../utils";
import { motion } from "framer-motion";
import { Cake, Gift, MessageCircleIcon } from "lucide-react";

const BirthdayCard = ({ employee, isUpcoming }: { employee: Employee & { date_of_birth: string }; isUpcoming?: boolean }) => {
  const today = new Date();
  const dob = parseISO(employee.date_of_birth);
  const isBirthdayToday = isSameDay(dob, today);
  const age = differenceInYears(today, new Date(employee.date_of_birth));
  const senderName = "Von Kloss";
  return (
    <div key={employee.id} className="card transition-all duration-200 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-lg mb-6">
      <div className="flex items-center justify-between sm:px-8 px-4 sm:py-6 py-4">
        <div className="flex items-center gap-6">

          <motion.div
            className="my-2 grid sm:h-[45px] sm:w-[45px] h-[37px] w-[37px] place-content-center rounded-[15px] border border-gray-300 border-opacity-50 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {employee.image ? (
              <img
                src={employee.image}
                alt={`${employee.name}'s profile picture`}
                loading="eager"
                className="h-full w-full object-cover rounded-[15px]"
              />
            ) : (
              <p className="text-gray-600 font-semibold">{getInitials(employee.name)}</p>
            )}
          </motion.div>

          <div className='sm:text-base text-sm'>
            <h3 className="font-semibold sm:text-lg text-base text-gray-900">{employee.name}</h3>
            <p className="text-gray-600">{employee.department}</p>
            <p className="text-sm text-[#8396f6] flex items-center gap-2 sm:mt-2">
              {isBirthdayToday ? (
                <Gift className="w-5 h-5 text-primary-500" />
              ) : (
                <Cake className="w-5 h-5 text-gray-400" />
              )}
              {isUpcoming ? (
                <>Turning {age} on {format(dob, 'MMMM do')} 🎉</>
              ) : (
                <>Turning {age} today! 🎉 <span className='text-sm sm:block hidden'>({format(dob, 'MMMM do')})</span></>
              )}
            </p>
          </div>
        </div>

        <a
          href={`mailto:${employee.email}?subject=🎉 Happy Birthday, ${employee.name}!&body=Dear%20${employee.name},%0D%0A%0D%0AWishing%20you%20a%20wonderful%20birthday!%0D%0A%0D%0ABest%20wishes,%0D%0A${senderName}`}
        >
          <button className="bg-blue-500 text-white sm:px-4 px-2 sm:py-4 py-2 cursor-pointer rounded-full flex items-center justify-center">
            <MessageCircleIcon className="sm:w-8 sm:h-8 w-6 h-6 text-white fill-white" />
          </button>
        </a>
      </div>
    </div>
  );
};

export { BirthdayCard };      