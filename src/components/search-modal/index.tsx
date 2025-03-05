import { useApiRequest, useClickOutside } from '@/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import { BirthdayCard } from '../birthday-list/birthday-card'
import { staffsService } from '@/api'
import { Staff, StaffResponse } from '@/types'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'


interface SearchModalProps {
  searchText: string
  isOpen: boolean
  onClose: () => void
}

const SearchModal: FC<SearchModalProps> = ({ searchText, isOpen, onClose }) => {
  const popUpRef = useRef<HTMLDivElement>(null);
  useClickOutside(popUpRef, popUpRef, onClose);

  const [staffs, setStaffs] = useState<Staff[]>([]);

  const {
    run: runStaffs,
    data: staffsResponse,
    error,
    requestStatus,
  } = useApiRequest({});

  useEffect(() => {
    runStaffs(staffsService({
      search: searchText
    }));
  }, [runStaffs, searchText]);

  useEffect(() => {
    if (staffsResponse?.status === 200) {
      const filteredStaffs = staffsResponse.data.map(
        (staff: StaffResponse) => ({
          id: staff.id,
          name: `${staff.first_name} ${staff.last_name}`,
          department: staff.department,
          date_of_birth: staff.date_of_birth,
          email: staff.email,
          created_at: staff.created_at,
          image: staff.profile_image_url || undefined,
        })
      );

      setStaffs(filteredStaffs);
    } else if (error) {
      toast.error("Error Fetching Staffs");
    }
  }, [staffsResponse, error]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popUpRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-0 top-[68px] z-50 sm:h-[calc(100vh-95px)] h-[calc(100vh-68px)] w-full bg-background-regular/50 backdrop-blur-xl sm:top-[95px]"
          key={'modal'}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-10 flex w-full justify-center bg-background-regular pt-10"
          >
            <div className="no-scrollbar z-10 w-full max-w-[85rem] border-b border-white/10 bg-background-regular px-[10%] pb-7">
              {requestStatus.isPending ?
                <div className="flex justify-center items-center sm:h-[calc(100vh-94px)] h-[calc(100vh-69px)] w-full">
                  <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
                </div>
                :
                <div>
                  {staffs.map((staff) => <BirthdayCard key={staff.id} staff={staff} />)}
                </div>
              }
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { SearchModal }
