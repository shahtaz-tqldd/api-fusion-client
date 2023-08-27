import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import { PopupWidget } from 'react-calendly';
import CalendlySchedules from '../../components/CalendarEvents';
import HolidayModule from "date-holidays";

const Events = () => {
  const session = useSession()
  const [description, setDescription] = useState('')
  const [eventName, setEventName] = useState('')
  const [startEvent, setStartEvent] = useState()
  const [endEvent, setEndEvent] = useState()
  const [events, setEvents] = useState([])

  const [updated, setUpdated] = useState(0)

  const handleSetEvent = async () => {
    const start = startEvent?._d
    const end = endEvent?._d

    const event = {
      'summary': eventName,
      'description': description,
      'start': {
        'dateTime': start.toISOString(),
        'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': end.toISOString(),
        'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }

    await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session?.provider_token}`
      },
      body: JSON.stringify(event)
    })
      .then(res => res.json())
      .then((data) => {
        if (data.status === 'confirmed') {
          setDescription('')
          setEventName('')
          setStartEvent(null)
          setEndEvent(null)
          setUpdated(updated + 1)
          toast.success('Event created successfully!')
        }
      })
  }

  // HOLIDAYS
  const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
  const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY = "holiday@group.v.calendar.google.com";
  const API_KEY = "AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs";
  const CALENDAR_REGION = "bn.BD";
  const currentYear = new Date().getFullYear();
  const timeMin = new Date(`${currentYear}-01-01`).toISOString();
  const timeMax = new Date(`${currentYear}-12-31`).toISOString();

  const [holidays, setHolidays] = useState([]);
  console.log(holidays)

  useEffect(() => {
    fetch(
      `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}`
    )
      .then((response) => response.json())
      .then((response) => {
        const formattedResponse = response.items
          .map(({ summary, start, end }) => ({ summary, start, end }))
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        setHolidays(formattedResponse);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
      headers: {
        'Authorization': `Bearer ${session?.provider_token}`
      }
    })
      .then((response) => {
        setEvents(response?.data?.items);

      })
      .catch((error) => {
        console.log(error);
      });
  }, [updated]);

  const userEmail = 'shahtazrahman17@gmail.com'
  const sortedEvents = events?.filter(event => event?.creator?.email === userEmail)

  // const calendlyToken = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkxNDA4MDc0LCJqdGkiOiJmMGNiZTQyMi0wZjhkLTQyZWUtYTRhMi0zNWQzYzM5MWZkMDkiLCJ1c2VyX3V1aWQiOiI3YzQ5Y2Y1ZC0zYWUxLTQ4MTYtOTgzYy0zZTEyNmNkMmI2ZGUifQ.pQrqJxv4zsvUqM1Aew2d_3XJIMsNNxQLY_pZrz7n6yn5Jo5cvrkgSDwA6QjUWYlKywAqzumU7Wf2woZLbqEQmA'

  const handleDeleteEvent = (id) => {
    axios.delete(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`, {
      headers: {
        'Authorization': `Bearer ${session?.provider_token}`
      }
    })
      .then((res) => {
        console.log(res)
        toast.success('Event Deleted!')
        setUpdated(updated + 1)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      <Grid item xs={8}>
        <Typography variant='h4' sx={{ mb: 3, fontWeight: 'bold' }}>Set your Google Calendar Event</Typography>
        <TextField
          id="standard-basic"
          label="Event Name"
          sx={{ width: 600 }}
          variant="standard"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <Stack direction='row' sx={{ my: 3 }} alignItems='center' gap={2}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker value={startEvent} onChange={(newValue) => setStartEvent(newValue)} label="Start date and time" />
            </DemoContainer>
          </LocalizationProvider>
          <span>-</span>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker value={endEvent} onChange={(newValue) => setEndEvent(newValue)} label="End date and time" />
            </DemoContainer>
          </LocalizationProvider>
        </Stack>

        <TextField
          id="standard-multiline-static"
          label="Event Description"
          multiline
          rows={6}
          sx={{ width: 600, mt: 2 }}
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />

        <Button variant='contained' disableElevation sx={{ mt: 6, px: 10, textTransform: 'none' }} onClick={handleSetEvent}>Set Event</Button>
      </Grid>

      <Grid item xs={4}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Upcoming Event</Typography>
        {
          sortedEvents?.length ?
            <Box sx={{ mt: 5, mb: 3 }}>
              {
                sortedEvents.map(event => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <EventOutlinedIcon />
                        {event?.summary}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ textAlign: 'left' }}>
                      <Typography>
                        <span className='text-gray-500 text-xs'>Event Details</span> <br /> {event?.description}
                      </Typography>
                      <div className='grid grid-cols-2 gap-4 my-4'>
                        <div className='flex flex-col'>
                          <span className='text-gray-500 text-xs'>Start</span>
                          <span className='text-md'>{moment(event?.start.dateTime).format('DD MMM YYYY')}</span>
                          <span className='text-xs font-bold'>{moment(event?.start.dateTime).format('hh:mm A')}</span>
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-gray-500 text-xs'>End</span>
                          <span className='text-md'>{moment(event?.end.dateTime).format('DD MMM YYYY')}</span>
                          <span className='text-xs font-bold'>{moment(event?.end.dateTime).format('hh:mm A')}</span>
                        </div>
                      </div>
                      <Button color='error' onClick={() => handleDeleteEvent(event.id)} variant='outlined' size={'small'} sx={{ textTransform: 'none' }}>Delete Event</Button>

                    </AccordionDetails>
                  </Accordion>
                ))
              }
            </Box>
            : <Box sx={{ mt: 7 }}>
              <CircularProgress />
            </Box>
        }
        {/* <CalendlySchedules /> */}
        <div>
          <h2 className='mb-4 ml-2 font-bold text-2xl'>Holidays of Bangladesh</h2>
          <div className='flex flex-wrap gap-1'>
            {
              holidays?.map(holiday => <div className='bg-blue-100 py-1 px-3 rounded-full text-xs'>{holiday.summary} - {moment(holiday.start.date).format('DD MMM')}</div>)
            }
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default Events