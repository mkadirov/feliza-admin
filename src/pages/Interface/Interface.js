import React, { useState } from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import { Box, Button, Card, Divider } from '@mui/material'
import SliderSettings from '../../components/Interface/SliderSettings/SliderSettings'
import ContainerSettings from '../../components/Interface/ContainerSettings/ContainerSettings'
import BestsellerSlider from '../../components/Interface/SliderSettings/BestsellerSlider'
import Collection from '../../components/Interface/Collection/Collection'

function Interface() {
    const [index, setIndex] = useState(1)

  return (
    <MainLayout>
        <div className="mt-12 w-full">
            
            <div className="flex my-3 w-full  gap-2">
                <div className="w-1/3">
                    <Button fullWidth variant={index == 1? 'contained' : 'outlined'} onClick={() => setIndex(1)}>
                        Slider
                    </Button>
                </div>
                <div className="w-1/3">
                    <Button fullWidth variant={index == 2? 'contained' : 'outlined'} onClick={() => setIndex(2)}>
                        Container
                    </Button>
                </div>
                <div className="w-1/3">
                    <Button fullWidth variant={index == 3? 'contained' : 'outlined'} onClick={() => setIndex(3)}>
                        Collection
                    </Button>
                </div>
                
            </div>

            <Divider/>
            
            <div className="my-3">
                <div className={index === 1 ? 'block' : 'hidden'}>
                    <SliderSettings/>
                    
                    <Divider sx={{marginY: 3}}/>
                    
                    {/* <BestsellerSlider/> */}
                </div>
                <div className={index === 2 ? 'block' : 'hidden'}>
                    <ContainerSettings/>
                </div>
                <div className={index === 3 ? 'block' : 'hidden'}>
                    <Collection/>
                </div>
            </div>
        </div>
    </MainLayout>
  )
}

export default Interface