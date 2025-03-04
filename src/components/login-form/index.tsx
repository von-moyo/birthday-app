import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


interface LoginPayload {
  email: string;
  password: string;
}
interface LoginFormProps {
  onSubmit: (data: LoginPayload) => void;
  isLoading: boolean;
} 


const loginFormSchema = yup.object().shape({
  email: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmitHandler: SubmitHandler<LoginPayload> = (data: LoginPayload) => {
    onSubmit(data);
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md md:text-sm text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:font-extralight placeholder:text-sm"
            placeholder="Enter your email adddress"
            {...register('email')}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md md:text-sm text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:font-extralight placeholder:text-sm"
            placeholder="Enter your password"
            {...register('password')}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </div>

        <div className="text-center">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  )
}

export { LoginForm };
