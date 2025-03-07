import { useAdminDetails } from '@/context';
import { getInitials } from '@/utils';
import { CameraIcon, Loader2 } from 'lucide-react';

interface ProfilePictureProps {
  onImageUpload: (file: any) => void;
  showCam: boolean;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ onImageUpload, showCam }) => {
  const { adminDetails, isLoading } = useAdminDetails();
  const fileToRawBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const rawBase64 = base64.split(",")[1];
        resolve(rawBase64);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const rawBase64 = await fileToRawBase64(file);
      onImageUpload(`data:image/png;base64,${rawBase64}`);
    }
  };

  return (
    <div className={`relative my-2 grid h-[37px] w-[37px] place-content-center rounded-[15px] ${!adminDetails?.profile_image && 'border'} border-gray-300 border-opacity-50 overflow-hidden`}>
      {isLoading ?
        (<div className='flex items-center justify-center'>
          <Loader2 className='animate-spin' />
        </div>) : adminDetails?.profile_image_url ? (
          <img
            src={adminDetails?.profile_image_url}
            alt="Profile picture"
            loading="eager"
            className="h-full w-full object-cover rounded-[15px]"
          />
        ) : (
          <p>{getInitials(`${adminDetails?.first_name} ${adminDetails?.last_name}`)}</p>
        )}
      {showCam && <label
        htmlFor="upload-image"
        className="absolute bottom-[2px] left-1/2 -translate-x-1/2 rounded-full h-fit grid place-content-center cursor-pointer z-[99]"
      >
        <CameraIcon className={`w-3 h-3 ${adminDetails?.profile_image_url ? 'text-white' : 'text-[#1E272F]'}`}/>
      </label>}
      <input
        type="file"
        id="upload-image"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePicture;
