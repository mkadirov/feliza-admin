import React, { useState } from 'react'
import ImageContainer from './ImageContainer'
import { Button, Grid, Typography } from '@mui/material'
import ColorBox from './ColorBoxs'
import CompatableProducts from './CompatableProducts'


function ProductMainDetailes({colorList, imageList, handleImageChange, 
    sizeDetailes, addBarcode, addQuantity, sizeList, compatibleProductId, setCompatibleProductId, addGeneretedBarcode}) {

        

        const genereteBarCode =(colorItem, sizeItem) => {
            const barcode ='B' + (new Date().getTime())
            addGeneretedBarcode(barcode, colorItem, sizeItem)
        }

       

  return (
    <div className='my-5'>
            {
                colorList.map(colorItem => 
                    {
                        const key = colorItem + 'go'
                        return(
                            <div key={key}>
                                <ImageContainer colorItem={colorItem} imageList={imageList} handleImageChange={handleImageChange}/>
                                {/* <CompatableProducts compatibleProductId= {compatibleProductId} setCompatibleProductId = {setCompatibleProductId} colorItem={colorItem}/> */}
                                {
                                    sizeList.map(sizeItem => {
                                        const key = sizeItem + 'size'
                                        const detail = sizeDetailes.find(item => item.color == colorItem && item.size == sizeItem);
                                        return(
                                            <div key={key} className="input-container pl-3 mt-3 ">
                                                <div className="flex w-full">
                                                    <div className="flex items-center gap-2 " style={{width: '150px', height: '40px'}}>
                                                        <ColorBox color= {colorItem}/>
                                                        <Typography>
                                                           / {sizeItem}
                                                        </Typography>
                                                    </div>

                                                    <div className="flex-1">
                                                        <Grid container spacing={2} pr={2}>
                                                            <Grid item xs={6}> 
                                                                <div className="flex pl-2 bg-gray-200 rounded-xl" style={{height: '40px'}}>
                                                                    <div className='w-full'>
                                                                        <input
                                                                         type="text" 
                                                                         className='main-input' 
                                                                         placeholder='Barcode...'
                                                                         value={detail?.barCode !== undefined ? detail.barCode : ''}
                                                                         onChange={(e) => addBarcode(e, colorItem, sizeItem)}
                                                                        />  
                                                                    </div>
                                                                    <Button sx={{px: 2}} onClick={() => genereteBarCode(colorItem, sizeItem)}>
                                                                       Generatsiya
                                                                    </Button>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6}> 
                                                            <div className="flex pl-2 bg-gray-200 rounded-xl" style={{height: '40px'}}>
                                                                    <div className='w-full'>
                                                                        <input 
                                                                            type="number" 
                                                                            className='main-input ' 
                                                                            placeholder='Mahsulot soni...'
                                                                            value={detail?.quantity !== undefined ? detail.quantity : 0}
                                                                            onChange={(e) => addQuantity(e, colorItem, sizeItem)}
                                                                        />  
                                                                    </div>
                                                                    <Button sx={{px: 2}}>
                                                                       Generatsiya
                                                                    </Button>
                                                                </div>
                                                            </Grid>
                                                            
                                                        </Grid>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    
                                }
                            </div>
                        )
                        
                    }
                )
            }
        </div>
  )
}

export default ProductMainDetailes