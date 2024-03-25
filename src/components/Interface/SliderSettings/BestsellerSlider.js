import { Box, Button, Card, Grid, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../../api/Product'
import BestsellerCards from '../../Cards/BestsellerCards'
import { Close } from '@mui/icons-material'

function BestsellerSlider() {

  const [list, setList] = useState([])
  const [isInputOpen, setIsInputOpen] = useState(false)
  


  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProducts();
      if(res?.success) {
        if(res.data.length > 10) {
          setList(res.data.slice(0, 10))
        } else {
          setList(res.data)
        }
      }
    }

    fetchData();
  }, [])

  

  return (
    
        <Card sx={{marginTop: 3}}>
            <div className="p-3">
                
              <div className="flex justify-between mb-5">
                <p className="text-2xl">
                  Bestseller Slider
                </p>
                <Button 
                  variant='contained' 
                  size='small'
                >
                  Yangi sahifa qöshish
                </Button>
              </div>

              <div className="flex justify-center">
                <div className='my-5'>
                  <TextField variant='outlined' label= 'Mahsulot IDsi' size='small'/>
                  <Button variant='contained' >
                    Ok
                  </Button>
                </div>
              </div>

              <Grid container spacing={2}>
                  {
                    list.map((item, idx) => {
                      return(
                        <Grid item xs={3} key={item.referenceNumber + idx}>
                          <BestsellerCards  item={item}/>
                        </Grid>
                      )
                    })
                  }
              </Grid>
            </div>   
        </Card>
    
  )
}

export default BestsellerSlider