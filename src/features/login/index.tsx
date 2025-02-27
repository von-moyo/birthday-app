import React from 'react'
import { loginBg } from '../../assets/images'
import { LogoIcon, MobileLogoIcon } from '../../assets/icons'
import { LoginForm } from '../../components/login-form'

interface LoginUIProps {
  isLoading: boolean;
  onSubmit: (data: { email: string; password: string }) => void;
}

const LoginUI: React.FC<LoginUIProps> = ({ isLoading, onSubmit }) => {


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
        className="min-h-screen relative flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center cursor-pointer sm:absolute top-5 left-5 sm:mb-0 mb-4">
          <img src={LogoIcon} alt="birthday-icon" className="sm:w-16 sm:h-16 w-12 h-12 sm:block hidden" />
          <img src={MobileLogoIcon} alt="birthday-icon" className="sm:hidden w-12 h-12" />
          <div className="sm:-mt-1 text-start sm:w-auto w-[100px] sm:block hidden">
            <h2 className="sm:text-[20px] text-[16px] font-semibold text-[#4162FF] leading-[0.5]">Birthday</h2>
            <p className="sm:text-[15px] text-[12px] font-medium text-[#8396f6]">Tracker</p>
          </div>
        </div>

        <div className="max-w-md w-full space-y-8 bg-white md:p-8 p-6 rounded-lg sm:shadow-[0_0_25px_rgba(0,0,0,0.2)]">
          <div className="text-center">
            <h2 className="md:text-3xl text-2xl font-bold text-gray-900 md:mb-4 sm:mb-2 mb-6">Login</h2>
            <p className="text-gray-600 font-extralight md:text-base text-sm">Please enter your credentials to access the system</p>
          </div>

          <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>

  )
}

export { LoginUI }
