import { Box, Button, Card, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SliderCard from '../../Cards/SliderCard/SliderCard'
import { sliderList } from '../../../data/SliderList'
import SliderSmallCard from '../../Cards/SliderCard/SliderSmallCard'
import { getAllKaruselSlides } from '../../../api/Karusel'

function SliderSettings() {

  const [list, setList] = useState([])
  const [isChanged, setIsChanged] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllKaruselSlides();
      if(res?.success) {
        console.log(res.data);
        setList(res.data)
      }
    }

    fetchData();
  }, [isChanged])



  return (
    <div>
      <Card>
        <div className="p-3">
          <p className="text-2xl">
            Asosiy Slider
          </p>
          <SliderCard  setIsChanged = {setIsChanged}/>

          <Grid container spacing={2} marginTop={2}>
            {
              list.map((item, idx) => {

                return(
                  <Grid item xs= {4} key={item.id + item.karuselType}>
                    <SliderSmallCard item={item} idx={idx} setIsChanged = {setIsChanged}/>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
      </Card>
    </div>
  )
}

export default SliderSettings