import React from 'react'
import { Employee } from '../../types/types'
import { CalendarComponent } from '../../components/calendar'
interface CalendarUIProps {
  employees: Employee[]
}

const CalendarUI: React.FC<CalendarUIProps> = ({ employees }) => {

  return (
    <div className='my-5'>
      <h1>Calendar</h1>
      <CalendarComponent month={1} employees={employees}/>
    </div>
  )
}

export { CalendarUI }
