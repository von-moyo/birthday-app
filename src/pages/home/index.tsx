import React, { useState, useEffect } from 'react'
import { Employee, Staff } from '../../types'
import { HomeUI } from '../../features/home';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useApiRequest } from '../../hooks';
import { staffsService } from '../../api';

const Home: React.FC = () => {
  const [staffs, setStaffs] = useState<Employee[]>([]);
  const selectedMonth = new Date();

  const {
    run: runStaffs,
    data: staffsResponse,
    error,
    requestStatus
  } = useApiRequest({});

  useEffect(() => {
    runStaffs(staffsService());
  }, []);

  useEffect(() => {
    if (staffsResponse?.status === 200) {
      const filteredStaffs = staffsResponse.data
        .map((staff: Staff) => ({
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
    <>
      <HomeUI employees={staffs} selectedMonth={selectedMonth} />
    </>
  )
}

export { Home }
