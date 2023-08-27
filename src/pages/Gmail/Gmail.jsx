import { Box, Button, TextField, Typography } from '@mui/material';
import { useSession } from '@supabase/auth-helpers-react';
import axios from 'axios';
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import Inbox from './Inbox/Inbox'
import EmailIcon from '@mui/icons-material/Email'
import ArticleIcon from '@mui/icons-material/Article';
import { toast } from 'react-hot-toast';
const Gmail = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [userReceive, setUserRecieve] = useState('');
  const session = useSession()
  const accessToken = session?.provider_token

  const sendEmail = async () => {
    console.log(subject, message, userReceive)
    try {
      const response = await axios.post(
        'https://www.googleapis.com/gmail/v1/users/me/messages/send',
        {
          raw: btoa(
            `To: ${userReceive}\r\n` +
            `Subject: ${subject}\r\n\r\n` +
            `${message}`
          )
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        setMessage('')
        setSubject('')
        setUserRecieve('')
        toast.success('Email sent successfully')
      }

    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  return (
    <Box display='flex' flexDirection='column' gap={2} p={5} borderRadius={4}>
      <Typography variant='h4' fontWeight={600} marginBottom={4}>Send Email through Gmail API</Typography>
      {/* <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ width: '350px', backgroundColor: '#fff' }} /> */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField onChange={(e) => setUserRecieve(e.target.value)} id="standard-basic" label="Email" variant="standard" sx={{ maxWidth: '400px', minWidth: '300px' }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <ArticleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField onChange={(e) => setSubject(e.target.value)} id="standard-basic" fullWidth label="Subject" variant="standard" />
      </Box>
      <TextField
        id="standard-multiline-static"
        label="Write your message"
        multiline
        rows={6}
        variant="standard"
        // value={description}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Box>
        <Button disabled={!message || !subject || !userReceive} variant='contained' onClick={sendEmail} sx={{ textTransform: 'none' }} endIcon={<SendIcon sx={{ fontSize: '14px !important' }} />}>Send Email</Button>
      </Box>
      <Inbox />
    </Box>
  )
}

export default Gmail