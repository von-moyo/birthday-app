import React, { useEffect } from 'react'
import { loginBg } from '../../assets/images'
import { BirthDayIcon } from '../../assets/icons'
import { ForgotPasswordForm } from '../../components/forgot-password-form'
import { toast } from 'sonner';
import { useApiRequest } from '../../hooks';
// import { forgotPasswordService } from '../../api';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const { run: runForgotPassword, data: forgotPasswordResponse, error, requestStatus } = useApiRequest({});

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
            <h2 className="md:text-3xl text-2xl font-bold text-gray-900 md:mb-4 mb-2">Forgot Password</h2>
            <p className="text-gray-600 font-extralight md:text-base text-sm">Please enter your email to reset your password</p>
          </div>

          <ForgotPasswordForm onSubmit={onSubmit} isLoading={requestStatus.isPending} />
        </div>
      </div>
    </div>

  )
}

export { ForgotPassword }
