/* eslint-disable react-refresh/only-export-components */
'use client';
import { createContext, useContext, useState } from 'react';
const AdminDetailsContext = createContext<{
  adminDetails: any;
  setAdminDetails: (AdminDetails: any) => void;
  isLoading: boolean; 
  setIsLoading: any;
}>({
  adminDetails: false,
  setAdminDetails: () => { },
  isLoading: true,
  setIsLoading: () => { },
});

export const AdminDetailsProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminDetails, setAdminDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AdminDetailsContext.Provider value={{ adminDetails, setAdminDetails, isLoading, setIsLoading,  }}>
      {children}
    </AdminDetailsContext.Provider>
  );
};

export const useAdminDetails = () => useContext(AdminDetailsContext);