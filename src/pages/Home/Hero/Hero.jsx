import { Button, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import apiImg from '../../../assets/images/api.gif'

const Hero = () => {
  return (
    <Grid container alignItems='center' mt={-2}>
      <Grid item xs={6}>
        <Typography variant='h3' color='#252B68' fontWeight={600}>Integrate Essential <span className='text-[#0079FF]'>APIs</span> for Enhanced Application Features</Typography>
        <Typography variant='body1' mt={3}>Let's delve into the world of API integration. Join us to explore the art of integrating APIs for a multitude of features and functionalities that will elevate your application's performance and user experience.</Typography>
        <Stack direction='row' gap={2} mt={6}>
          <Button variant='contained' sx={{borderRadius:'8px', textTransform:'none'}}>Get started</Button>
          <Button variant='outlined' sx={{borderRadius:'8px', textTransform:'none'}}>Watch Tutorial</Button>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <img src={apiImg} className='w-full mx-auto' />
      </Grid>

    </Grid>
  )
}

export default Hero
