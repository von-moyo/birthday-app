import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { useApiRequest } from '../../hooks';
import { forgotPasswordService } from '../../api';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordUI } from '../../features/forgot-password';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const {
    run: runForgotPassword, 
    data: forgotPasswordResponse,
    error,
    requestStatus
  } = useApiRequest({});

  const onSubmit = (data: {
    email: string;
  }) => {
    runForgotPassword(forgotPasswordService(data));
  };

  useEffect(() => {
    if (forgotPasswordResponse?.status === 200) {
      toast.success('Password reset email sent');
      setTimeout(() =>{
        navigate('/reset-password');
      }, 2000);
    } else if (error) {
      toast.error(error?.response?.data?.email[0])
      
    }
  }, [forgotPasswordResponse, error]);

  return (
    <>
      <ForgotPasswordUI isLoading={requestStatus.isPending} onSubmit={onSubmit} />
    </>
  )
}

export { ForgotPassword }
