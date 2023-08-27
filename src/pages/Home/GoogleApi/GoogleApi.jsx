import React from 'react'
import bgImg from '../../../assets/images/bg.jpg'
import calendar from '../../../assets/images/calendar.webp'
import { Button, Container, Stack, Typography } from '@mui/material'
import { BiSolidCheckCircle } from 'react-icons/bi'

const GoogleApi = () => {
  return (
    <section style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover' }} className='absolute left-0 right-0 my-12 py-16'>
      <Container>
        <div className='grid grid-cols-2 gap-10 items-center'>
          <div>
            <img src={calendar} className='' />
          </div>
          <div>
            <Typography variant='h4' mb={2}>Google Calendar API</Typography>
            <Typography variant='body'>Using the Google Calendar API helps you create a complete scheduling system for your app. This adds a useful feature for users who want to organize their time better, making your app really valuable to them.</Typography>
            <ul className='mt-4'>
              <li className='flex items-center gap-2 my-1'><BiSolidCheckCircle className='text-green-400' />Real-time Calendar Sync</li>
              <li className='flex items-center gap-2 my-1'><BiSolidCheckCircle className='text-green-400' />Event Creation and Management</li>
              <li className='flex items-center gap-2 my-1'><BiSolidCheckCircle className='text-green-400' />Custom Event Types</li>
              <li className='flex items-center gap-2 my-1'><BiSolidCheckCircle className='text-green-400' />Personalization</li>
            </ul>

            <Stack direction='row' spacing={1.5} mt={4} >
              <Button variant='contained' sx={{ textTransform: 'none', borderRadius: '10px' }}>See Demo</Button>
              <Button variant='outlined' sx={{ textTransform: 'none', borderRadius: '10px' }}>Documentation</Button>
            </Stack>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default GoogleApi
