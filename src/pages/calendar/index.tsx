/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CalendarUI } from '../../features'
import { useApiRequest } from '../../hooks';
import { staffsService } from '../../api';
import { Loader2 } from 'lucide-react';
import { Staff, StaffResponse } from '../../types/types';
const Calendar = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const getCurrentMonthIndex = () => {
    const currentDate = new Date();
    return currentDate.getMonth() + 1;
  }
  const [birthMonth, setBirthMonth] = useState<number>(getCurrentMonthIndex());
  const {
    run: runStaffs,
    data: staffsResponse,
    error,
    requestStatus
  } = useApiRequest({});

  useEffect(() => {
    runStaffs(staffsService({
      birth_month: birthMonth
    }));
  }, [birthMonth]);

  useEffect(() => {
    if (staffsResponse?.status === 200) {
      const filteredStaffs = staffsResponse.data
        .map((staff: StaffResponse) => ({
          id: staff.id,
          name: `${staff.first_name} ${staff.last_name}`,
          department: staff.department,
          date_of_birth: staff.date_of_birth,
          email: staff.email,
          created_at: staff.created_at,
          image: staff.profile_image_url || undefined,
        }))

      setStaffs(filteredStaffs);
    } else if (error) {
      toast.error("Login failed");
    }
  }, [staffsResponse, error]);

  if (requestStatus.isPending) {
    return <div className='flex justify-center items-center sm:h-[calc(100vh-94px)] h-[calc(100vh-69px)] w-full'><Loader2 className="animate-spin h-12 w-12 text-gray-500" /></div>
  }

  return (
    <div>
      <CalendarUI staffs={staffs} setBirthMonth={setBirthMonth} currentBirthMonth={birthMonth}/>
    </div>
  )
}

export { Calendar }
