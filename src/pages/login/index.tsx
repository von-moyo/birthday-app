/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useApiRequest } from '../../hooks';
import { loginService } from '../../api';
import Cookies from 'js-cookie';
import { LoginUI } from '../../features/login';
import { useAuth } from '../../context/authContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const {
    run: runLogin,
    data: loginResponse,
    error,
    requestStatus
  } = useApiRequest({});

  const onSubmit = (data: {
    email: string;
    password: string;
  }) => {
    runLogin(loginService(data));
  };

  const homeRoute = () => {
    navigate('/');
  };

  useEffect(() => {
    if (loginResponse?.status === 200) {
      toast.success('Login successful');
      Cookies.set('access_token', loginResponse.data.access);
      Cookies.set('refresh_token', loginResponse.data.refresh);
      localStorage.setItem("staffID", loginResponse.data?.user?.staff_id);
      setIsAuthenticated(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else if (error) {
      toast.error(error?.response?.data?.message);
    }
  }, [loginResponse, error]);

  return (
    <>
      <LoginUI isLoading={requestStatus.isPending} onSubmit={onSubmit} homeRoute={homeRoute} />
    </>

  )
}

export { Login }
