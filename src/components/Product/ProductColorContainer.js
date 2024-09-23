import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import ColorIcon from '../AddProductComponents/ColorIcon'
import ColorBox from '../AddProductComponents/ColorBoxs'
import { grey } from '@mui/material/colors'

function ProductColorContainer({colorList, colors, deleteColor, addColor}) {

    

    
  return (
    <div>
        <Grid container marginY={3}>
        <Grid item xs={12}>
                <div className="flex-1 p-3 rounded-3xl border border-gray-400" >
                    <p className="text-2xl mt-3 mb-2">
                        Ranglar
                    </p>
                    <Box className="input-container pl-3"  >
                        <div className="flex items-center gap-2 ">
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
        </Grid>
    </div>
  )
}

export default ProductColorContainer