import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const CalendlySchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const calendlyToken = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkxNDA4MDc0LCJqdGkiOiJmMGNiZTQyMi0wZjhkLTQyZWUtYTRhMi0zNWQzYzM5MWZkMDkiLCJ1c2VyX3V1aWQiOiI3YzQ5Y2Y1ZC0zYWUxLTQ4MTYtOTgzYy0zZTEyNmNkMmI2ZGUifQ.pQrqJxv4zsvUqM1Aew2d_3XJIMsNNxQLY_pZrz7n6yn5Jo5cvrkgSDwA6QjUWYlKywAqzumU7Wf2woZLbqEQmA'

  useEffect(() => {
    const apiUrl = 'https://api.calendly.com/scheduled_events';

    // Replace 'YOUR_API_TOKEN' with your actual Calendly API token
    const headers = {
      Authorization: `Bearer ${calendlyToken}`,
      'Content-Type': 'application/json'
    };

    axios.get(apiUrl, { headers })
      .then(response => {
        console.log(response)
        setSchedules(response.data.collection);
      })
      .catch(error => {
        console.error('Error fetching schedules:', error);
      });
  }, []);
  console.log(schedules)
  return (
    <div>
      <Typography variant='h4'>My Calendly Schedules</Typography>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule.id}>{schedule.start_time}</li>
        ))}
      </ul>
    </div>
  );
};

export default CalendlySchedules;
