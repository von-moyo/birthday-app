import { getInitials } from '@/utils';
import { CameraIcon, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProfilePictureProps {
  onImageUpload: (file: any) => void;
  showCam: boolean;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ onImageUpload, showCam }) => {
  const [user, setUser] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
  } | null>(null);

  const [pfp, SetPfp] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
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
      onImageUpload(rawBase64);
      SetPfp(rawBase64);
    }
  };

  return (
    <div className={`relative my-2 grid h-[37px] w-[37px] place-content-center rounded-[15px] ${!user?.profile_image && 'border'} border-gray-300 border-opacity-50 overflow-hidden`}>
      {!user ?
        (<div className='flex items-center justify-center'>
          <Loader2 className='animate-spin' />
        </div>) : user?.profile_image ? (
          <img
            src={`data:image/png;base64,${user?.profile_image}`}
            alt="Profile picture"
            loading="eager"
            className="h-full w-full object-cover rounded-[15px]"
          />
        ) : (
          <p>{getInitials(`${user?.first_name} ${user?.last_name}`)}</p>
        )}
      {showCam && <label
        htmlFor="upload-image"
        className="absolute bottom-[2px] left-1/2 -translate-x-1/2 rounded-full h-fit grid place-content-center cursor-pointer z-[99]"
      >
        <CameraIcon className={`w-3 h-3 ${user?.profile_image ? 'text-white' : 'text-[#1E272F]'}`}/>
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
