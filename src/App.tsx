import { RouterProvider } from 'react-router-dom'
import router from './router/routes'
import { Toaster } from 'sonner'
import { AdminDetailsProvider, AuthProvider } from './context'

const App = () => {
  return (
    <>
      <AuthProvider>
        <AdminDetailsProvider>
          <RouterProvider router={router} />
          <Toaster richColors className='text-center' position='bottom-center' />
        </AdminDetailsProvider>
      </AuthProvider>
    </>
  )
}

export default App
