import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { useApiRequest } from '../../hooks';
// import { forgotPasswordService } from '../../api';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordUI } from '../../features/forgot-password';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const {
    // run: runForgotPassword, 
    data: forgotPasswordResponse,
    error,
    requestStatus
  } = useApiRequest({});

  const onSubmit = (data: {
    email: string;
  }) => {
    console.log(data);
    // runForgotPassword(forgotPasswordService(data));
    toast.success('Password reset email sent');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  useEffect(() => {
    if (forgotPasswordResponse?.status === 200) {
      toast.success('Password reset email sent');
    }
  }, [forgotPasswordResponse, error]);

  return (
    <>
      <ForgotPasswordUI isLoading={requestStatus.isPending} onSubmit={onSubmit} />
    </>
  )
}

export { ForgotPassword }
