import React from 'react'
import { Grid, Typography } from '@mui/material'
import { features } from '../../../data/features'

const Feature = () => {

  return (
    <Grid container my={4}>
      {
        features.map(({ title, detail, img }, index) => (
          <Grid item xs={4} direction='column' textAlign='center' p={4} >
            <img src={img} className='h-40 mx-auto' />
            <Typography variant='h5' fontWeight='bold' color='#252B68' mb={2}>{title}</Typography>
            <Typography color='#526D82'>{detail}</Typography>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default Feature
