import { useSession, useSessionContext } from '@supabase/auth-helpers-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

const PrivateRoute = ({ children }) => {
  const session = useSession()
  const location = useLocation()
  const { isLoading } = useSessionContext(false)

  if (isLoading) {
    return <section className='h-screen w-screen grid place-items-center'><CircularProgress /></section>
  }
  if (session?.user) {
    return children
  }
  return <Navigate to='/login' state={{ from: location }} replace />
}

export default PrivateRoute
