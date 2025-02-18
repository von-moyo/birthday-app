import { RouterProvider } from 'react-router-dom'
import router from './router/routes'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    <Toaster richColors className='text-center' position='bottom-center' />
  </>
  )
}

export default App
