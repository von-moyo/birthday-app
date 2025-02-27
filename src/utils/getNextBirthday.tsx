import { isSameDay, parseISO } from "date-fns";
import { Staff } from "../types/types";

export const getNextBirthday = (staffList: Staff[]): string => {
  const today = new Date();

  const normalizeDate = (dateString: string) => {
    const dob = parseISO(dateString);
    return new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  };
  
  // Sort all future birthdays (excluding today) by nearest date
  const futureBirthdays = staffList
    .filter(emp => {
      const dob = normalizeDate(emp.date_of_birth);
      return !isSameDay(dob, today) && dob >= today;
    })
    .sort((a, b) => {
      const dateA = normalizeDate(a.date_of_birth);
      const dateB = normalizeDate(b.date_of_birth);
      return dateA.getTime() - dateB.getTime();
    });

  // If no future birthdays this year, look at start of next year
  if (futureBirthdays.length === 0) {
    const nextYearBirthdays = staffList
      .map(emp => {
        const dob = normalizeDate(emp.date_of_birth);
        return new Date(today.getFullYear() + 1, dob.getMonth(), dob.getDate());
      })
      .sort((a, b) => a.getTime() - b.getTime());

    if (nextYearBirthdays.length > 0) {
      return nextYearBirthdays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  // Return formatted date of next birthday
  if (futureBirthdays.length > 0) {
    const nextBirthdayDate = normalizeDate(futureBirthdays[0].date_of_birth);
    return nextBirthdayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return 'No upcoming birthdays';
};