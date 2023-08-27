import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import ArticleIcon from '@mui/icons-material/Article';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Mailgun = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { fromEmail, fromName, toEmail, subject, message } = data;
    const { data: response } = await axios.post('http://localhost:5000/send-email', {
      fromEmail,
      fromName,
      toEmail,
      subject,
      message,
    });
    if (response) {
      toast.success(response?.message);
      reset();
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} p={5} borderRadius={4}>
      <Typography variant="h4" fontWeight={600} marginBottom={4}>
        Mailgun Email Sending
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            {...register('fromEmail', { required: true })}
            id="fromEmail"
            label="Your Email"
            variant="standard"
            sx={{ maxWidth: '400px', minWidth: '300px' }}
          />
        </Box>
        {errors.fromEmail && <span>This field is required</span>}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            {...register('fromName', { required: true })}
            id="fromName"
            label="Your Name"
            variant="standard"
            sx={{ maxWidth: '400px', minWidth: '300px' }}
          />
        </Box>
        {errors.fromName && <span>This field is required</span>}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            {...register('toEmail', { required: true })}
            id="toEmail"
            label="Recipient Email"
            variant="standard"
            sx={{ maxWidth: '400px', minWidth: '300px' }}
          />
        </Box>
        {errors.toEmail && <span>This field is required</span>}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <ArticleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            {...register('subject', { required: true })}
            id="subject"
            fullWidth
            label="Subject"
            variant="standard"
          />
        </Box>
        {errors.subject && <span>This field is required</span>}
        <TextField
          {...register('message', { required: true })}
          id="message"
          label="Write your message"
          multiline
          rows={6}
          variant="standard"
          fullWidth
          sx={{mb:4}}
        />
        {errors.message && <span>This field is required</span>}
        <Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: 'none' }}
            endIcon={<SendIcon sx={{ fontSize: '14px !important' }} />}
          >
            Send Email
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Mailgun;
