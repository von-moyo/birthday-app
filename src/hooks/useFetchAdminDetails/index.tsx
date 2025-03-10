/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useApiRequest } from '@/hooks/useApiRequest';
import { toast } from 'sonner';
import { fetchStaffService } from '@/api';
import { useAdminDetails } from '@/context';

export const useFetchAdminDetails = () => {
  const { run: runAdminDetails, data: AdminDetailsResponse, error, requestStatus: fetchAdminDetailsRequestStatus } = useApiRequest({});
  const { setAdminDetails, setIsLoading } = useAdminDetails();

  const fetchAdminDetails = (staffID: string) => {
    runAdminDetails(
      fetchStaffService(staffID)
    );
    setIsLoading(true);
  };

  useEffect(() => {
    if (AdminDetailsResponse?.status === 200) {
      const Admin = AdminDetailsResponse.data;
      setAdminDetails(Admin);
      setIsLoading(false);
    } else if (error) {
      toast.error(error?.response?.data?.detail);
      setIsLoading(false);
      
    }
  }, [AdminDetailsResponse, error]);

  return { fetchAdminDetails, fetchAdminDetailsRequestStatus, error };
};