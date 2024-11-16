import React, { useEffect, useState } from 'react'
import ColorIcon from './ColorIcon'
import ColorBox from './ColorBoxs'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { getAllColors } from '../../api/Color'


function SizeColorContainer({colorList, colors, deleteColor, addColor, handleSize, 
    addSize, sizeList, deleteSize, productType, size }) {

  return (
    <div className='my-5'>

        <Grid container spacing={1}>
            <Grid item xs={6}>
                <div className="flex-1 p-3 rounded-3xl border border-gray-400" >
                    <p className="text-2xl mt-3 mb-2">
                        Ranglar
                    </p>
                    <Box className="input-container ">
                        <div className="flex items-center gap-2 mt-2" >
                            {
                                (colorList.length == 0) && (<Typography sx={{color: grey[500]}}>Rang tanlang</Typography>)
                            }
                            {
                                colorList.map(item => { 
                                    return(
                                        <div key={item}>                                           
                                            <ColorIcon deleteColor={deleteColor} color= {item}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    
                    </Box>
                    <div className="input-container mt-3 pl-3" >
                        {/* <div className="flex gap-2 items-center">
                           
                        </div> */}
                        <Grid container>
                        {
                            colors.map(color => {

                                return(
                                    <Grid key = {color.colorCode} item xs={1} marginBottom={'2px'}>
                                        <ColorBox  key={color.id} addColor= {addColor} color = {color.colorCode}/>
                                    </Grid>
                                )
                            })
                           }
                        </Grid>
                    </div>
                </div>
            
            </Grid>
            <Grid item xs={6}> 
                <div className="flex-1 p-3 rounded-3xl border border-gray-400" >
                    <p className="text-2xl mt-3 mb-2">
                        Ölchamlar
                    </p>
                    <div className="input-container " style={{display: productType==1? 'none': 'flex'}}>
                        <input 
                            placeholder="O'lcham kriting" 
                            style={{flex: 1}} 
                            type="text" 
                            className='main-input'
                            value={size}
                            onChange={(e) => handleSize(e)}
                        />
                    
                        <Button onClick={addSize}>
                           Qöshish
                        </Button>
                    
                    </div>

                    <div className="input-container mt-3 pl-3" >
                        <div className="flex items-center gap-2 ">
                            {
                                sizeList.map(item => { 
                                    const key = item + 'chip'
                                    return(
                                        <div key={key} >
                                            <Chip
                                            key={item} 
                                            variant='outlined' 
                                            label={item} 
                                            onDelete={productType==1? undefined : () => deleteSize(item)} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default SizeColorContainer