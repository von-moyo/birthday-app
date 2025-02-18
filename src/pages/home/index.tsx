import React, { useState, useEffect } from 'react'
import { BirthdayList, AddEmployeeForm } from '../../components'
import { Employee } from '../../types'

const Home: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  useEffect(() => {
    setEmployees([
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        department: 'Engineering',
        date_of_birth: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ]);
    setSelectedMonth(new Date());
  }, []);
  return (
    <div className='mt-5'>
      <BirthdayList employees={employees} selectedMonth={selectedMonth} />
      <AddEmployeeForm onEmployeeAdded={() => {
        setEmployees([...employees, {
          id: employees.length.toString(),
          name: 'John Doe',
          email: 'john.doe@example.com',
          department: 'Engineering',
          date_of_birth: new Date().toISOString(),
          created_at: new Date().toISOString(),
        }]);
      }} />
    </div>
  )
}

export { Home }
