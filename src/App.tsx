import { RouterProvider } from 'react-router-dom'
import router from './router/routes'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/authContext'

const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors className='text-center' position='bottom-center' />
      </AuthProvider>
    </>
  )
}

export default App
