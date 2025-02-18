/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { loginBg } from '../../assets/images'
import { BirthDayIcon } from '../../assets/icons'
import { LoginForm } from '../../components/login-form'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useApiRequest } from '../../hooks';
// import { loginService } from '../../api';
const Login: React.FC = () => {
  const navigate = useNavigate();

  const { 
    // run: runLogin, 
    data: loginResponse, 
    error, 
    requestStatus
  } = useApiRequest({});

  const onSubmit = (data: {
    email: string;
    password: string;
  }) => {
    console.log(data);
    // runLogin(loginService(data));
    toast.success('Login successful');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  useEffect(() => {
    if (loginResponse?.status === 200) {
      toast.success('Login successful');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [loginResponse, error]);

  return (
    <div className='grid lg:grid-cols-2 grid-cols-1'>
      <div
        className="min-h-screen lg:flex hidden items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundColor: '#f9fafb',
        }}>
      </div>
      <div
        className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <h2 className='absolute top-5 left-5 flex items-center gap-2 md:text-2xl text-xl font-bold text-blue-800'>
          <img src={BirthDayIcon} alt="birthday-icon" className=' md:w-16 md:h-16 w-12 h-12' />
          Birthday App
        </h2>

        <div className="max-w-md w-full space-y-8 bg-white md:p-8 p-6 rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.2)]">
          <div className="text-center">
            <h2 className="md:text-3xl text-2xl font-bold text-gray-900 md:mb-4 mb-2">Login</h2>
            <p className="text-gray-600 font-extralight md:text-base text-sm">Please enter your credentials to access the system</p>
          </div>

          <LoginForm onSubmit={onSubmit} isLoading={requestStatus.isPending} />
        </div>
      </div>
    </div>

  )
}

export { Login }
