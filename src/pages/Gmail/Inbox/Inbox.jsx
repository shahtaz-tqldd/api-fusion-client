import { Button } from '@mui/material';
import { useSession } from '@supabase/auth-helpers-react';
import axios from 'axios';
import React from 'react'
import { toast } from 'react-hot-toast';

const Inbox = () => {
  const userId = 'shahtazrahman17@gmail.com'
  const session = useSession()
  const accessToken = session?.provider_token
  const handleGetEmail = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/gmail/v1/users/${userId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        toast.success('Email get successfully')
      }

    } catch (error) {
      console.error('Error receiving email:', error);
    }
  }
  return (
    <div>
      <Button onClick={handleGetEmail}>Get email</Button>
    </div>
  )
}

export default Inbox