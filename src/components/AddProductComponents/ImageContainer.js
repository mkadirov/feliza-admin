import { Box, Button } from '@mui/material'
import React from 'react'

function ImageContainer({imageList, colorItem, handleImageChange}) {
  return (
    <div className="image-container">
        <div className='flex flex-col gap-3'>
            <input type="file" multiple accept='image/*' placeholder='Data' id={`image-input-btn-${colorItem}`} hidden onChange={(e) =>handleImageChange(e, colorItem)}/>
            <Button variant='outlined' onClick={() => document.getElementById(`image-input-btn-${colorItem}`).click()}>
                Rasm yuklash
            </Button>
            <div className="flex gap-2 mt-2">
                {
                                                
                    Array.isArray(imageList) ? (
                    imageList.find(item => item.colorName === colorItem).imagesList?.map((image, idx) => {
                        const key = idx + 'rasm'
                        return(
                            <Box key={key} sx={{ width: '80px', height: '80px' }}>
                                <img src={URL.createObjectURL(image)} alt="" />
                            </Box>
                        )
                    })
                ) : (
                    <p>Image list is not available.</p>
                )
                }
            </div>

        </div>
            
    </div>
  )
}

export default ImageContainer