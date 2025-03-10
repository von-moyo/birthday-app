/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useApiRequest } from '@/hooks/useApiRequest';
import { toast } from 'sonner';
import { StaffUpdateData, staffUpdateService } from '@/api';
import { useFetchAdminDetails } from '../useFetchAdminDetails';
import { useAdminDetails } from '@/context';

export const useUpdateStaffDetails = () => {
  const { run: runUpdateStaffDetails, data: updateStaffDetailsResponse, error, requestStatus: updateStaffDetailsRequestStatus } = useApiRequest({});
  const { adminDetails } = useAdminDetails();
  const { fetchAdminDetails } = useFetchAdminDetails();

  const updateStaffDetails = (data: StaffUpdateData) => {
    runUpdateStaffDetails(
      staffUpdateService(data)
    );
  };

  useEffect(() => {
    if (updateStaffDetailsResponse?.status === 200) {
      toast.info('Your Details Updated Successfully!');
      if (adminDetails) {
        fetchAdminDetails(adminDetails.id);
      }
    } else if (error) {
      toast.error(error?.response?.data?.detail);
      
    }
  }, [updateStaffDetailsResponse, error]);

  return { updateStaffDetails, updateStaffDetailsRequestStatus, error };
};