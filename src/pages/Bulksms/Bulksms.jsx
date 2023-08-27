import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Bulksms = () => {
  const apiKey = 'hXtlbkebCShoMjYG0w3J'
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const { toNumber, message } = data;
    const { data: response } = await axios.post(`http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=(${toNumber})&senderid=8809617612501&message=(${message})`, {
      toNumber, 
      message
    });

    if (response?.response_code === 202) {
      toast.success(response?.success_message);
      reset();
    }
  };
  return (
    <Box display="flex" flexDirection="column" gap={2} p={5} borderRadius={4}>
      <Typography variant="h4" fontWeight={600} marginBottom={4}>
        Bulksms | SMS Sending
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <LocalPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            {...register('toNumber', { required: true })}
            id="toNumber"
            label="Number"
            variant="standard"
            sx={{ maxWidth: '400px', minWidth: '300px' }}
          />
        </Box>
        {errors.toNumber && <span>This field is required</span>}
        
        <TextField
          {...register('message', { required: true })}
          id="message"
          label="Write your message"
          multiline
          rows={6}
          variant="standard"
          fullWidth
          sx={{ mb: 4 }}
        />
        {errors.message && <span>This field is required</span>}
        <Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: 'none' }}
            endIcon={<SendIcon sx={{ fontSize: '14px !important' }} />}
          >
            Send SMS
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default Bulksms
