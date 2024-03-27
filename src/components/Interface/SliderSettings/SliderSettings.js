import { Box, Button, Card, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SliderCard from '../../Cards/SliderCard/SliderCard'
import { sliderList } from '../../../data/SliderList'

function SliderSettings() {

  const [list, setList] = useState([])
  const [isChanged, setIsChanged] = useState(0)

  useEffect(() => {
    setList(sliderList)
  }, [isChanged])



  return (
    <div>
      <Card>
        <div className="p-3">
          <p className="text-2xl">
            Asosiy Slider
          </p>

          <Grid container spacing={2}>
          <Grid item xs= {12} >
                    <SliderCard  setIsChanged = {setIsChanged}/>
                  </Grid>
          </Grid>
        </div>
      </Card>
    </div>
  )
}

export default SliderSettings