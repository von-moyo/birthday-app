import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Import eye icons

export interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordPayload) => void;
  isLoading: boolean;
}

const resetFormSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match') // Ensure confirmPassword matches password
    .required('Confirm Password is required'),
});



const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPayload>({
    resolver: yupResolver(resetFormSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmitHandler: SubmitHandler<ResetPasswordPayload> = (data: ResetPasswordPayload) => {
    onSubmit(data);
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
        {/* Password Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md md:text-sm text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:font-extralight placeholder:text-sm"
              placeholder="Enter your password"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md md:text-sm text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:font-extralight placeholder:text-sm"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5 text-gray-500"/> : 'Change Password'}
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <a href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            Login?
          </a>
        </div>
      </form>
    </div>
  );
};

export { ResetPasswordForm };
