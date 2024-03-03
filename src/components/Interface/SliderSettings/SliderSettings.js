import { Box, Button, Card, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SliderCard from '../../Cards/SliderCard'
import { sliderList } from '../../../data/SliderList'

function SliderSettings() {

  const [list, setList] = useState([])
  const [isChanged, setIsChanged] = useState(0)

  useEffect(() => {
    setList(sliderList)
  }, [isChanged])

  const addNewSlide = () => {
    const newList = [...list]
    setList([...newList, {}])
  }


  return (
    <div>
      <Card>
        <div className="p-3">
          <p className="text-2xl">
            Asosiy Slider
          </p>

          <Grid container spacing={2}>
            {
              list.map((item, idx) => {
                const key = idx * 99

                return(
                  <Grid item xs= {6} key={key}>
                    <SliderCard item={item} idx = {idx} setIsChanged = {setIsChanged}/>
                  </Grid>
                )
              })
            }
          </Grid>
          <div className="flex justify-end mt-2">
            <Button variant='contained' onClick={addNewSlide}>
              Yangi sahifa qöshish
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SliderSettings