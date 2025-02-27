import mockEmployees from '../../constants/mock-employee-data'
import { CalendarUI } from '../../features'

const Calendar = () => {
  return (
    <div>
      <CalendarUI employees={mockEmployees} />
    </div>
  )
} 

export { Calendar }
