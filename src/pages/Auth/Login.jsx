import { Button } from '@mui/material'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import React from 'react'

const Login = () => {
  const supabase = useSupabaseClient()
  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.send'
      }
    })
    if (error) {
      alert('Error!')
      console.log(error)
    }
  }
  return (
    <div className='h-[90vh] grid place-items-center'>
      <Button variant='contained' sx={{ textTransform: 'none', px: 4 }} onClick={() => handleGoogleSignIn()}>Signin with Google</Button>
    </div>
  )
}

export default Login
