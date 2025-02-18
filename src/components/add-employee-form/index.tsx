import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface AddEmployeeFormProps {
  onEmployeeAdded: () => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onEmployeeAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const employee = {
      name: formData.get('name'),
      email: formData.get('email'),
      department: formData.get('department'),
      date_of_birth: formData.get('date_of_birth'),
    };
    console.log(employee);
    toast.success('Employee added successfully!');
    onEmployeeAdded();
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary flex items-center space-x-2 cursor-pointer mt-4"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </>
        )}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 card space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md md:text-sm text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:font-extralight placeholder:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md md:text-sm text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:font-extralight placeholder:text-sm"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              name="department"
              id="department"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md md:text-sm text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:font-extralight placeholder:text-sm"
            />
          </div>

          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              id="date_of_birth"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md md:text-sm text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:font-extralight placeholder:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary cursor-pointer"
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
        </form>
      )}
    </div>
  );
}

export { AddEmployeeForm }