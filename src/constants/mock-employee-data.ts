import { NoPfp, Pfp } from "../assets/images";

// Define the function type
const generateBirthdate = (month: number, day: number): string => {
  const randomYear = Math.floor(Math.random() * (2000 - 1965) + 1965);
  return new Date(randomYear, month - 1, day).toISOString();
};

const today = new Date();
const todayMonth = today.getMonth() + 1;
const todayDay = today.getDate();

const mockEmployees = [
  // Today's Birthdays
  {
    id: "1",
    name: "Abass Olaiya",
    email: "abass.olaiya@gmail.com",
    department: "Computer Science",
    date_of_birth: generateBirthdate(todayMonth, todayDay),
    created_at: new Date().toISOString(),
    image: Pfp,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Biochemistry",
    date_of_birth: generateBirthdate(todayMonth, todayDay),
    created_at: new Date().toISOString(),
    image: NoPfp,
  },

  // Birthdays this month (excluding today's)
  {
    id: "3",
    name: "Michael Adeyemi",
    email: "michael.adeyemi@example.com",
    department: "Physics",
    date_of_birth: generateBirthdate(todayMonth, todayDay + 1),
    created_at: new Date().toISOString(),
    image: "",
  },
  {
    id: "4",
    name: "Fatima Bello",
    email: "fatima.bello@example.com",
    department: "Mathematics",
    date_of_birth: generateBirthdate(todayMonth, todayDay + 10),
    created_at: new Date().toISOString(),
    image: Pfp,
  },

  // Upcoming Birthdays (Next 4 Months)
  {
    id: "5",
    name: "Daniel Chukwu",
    email: "daniel.chukwu@example.com",
    department: "Chemistry",
    date_of_birth: generateBirthdate(todayMonth + 1, 15),
    created_at: new Date().toISOString(),
    image: NoPfp,
  },
  {
    id: "6",
    name: "Aisha Usman",
    email: "aisha.usman@example.com",
    department: "Botany",
    date_of_birth: generateBirthdate(todayMonth + 2, 8),
    created_at: new Date().toISOString(),
    image: "",
  },
  {
    id: "7",
    name: "Samuel Johnson",
    email: "samuel.johnson@example.com",
    department: "Economics",
    date_of_birth: generateBirthdate(todayMonth + 3, 20),
    created_at: new Date().toISOString(),
    image: Pfp,
  },
  {
    id: "8",
    name: "Jessica O'Neal",
    email: "jessica.oneal@example.com",
    department: "History",
    date_of_birth: generateBirthdate(todayMonth + 4, 5),
    created_at: new Date().toISOString(),
    image: NoPfp,
  },
];

export default mockEmployees;
