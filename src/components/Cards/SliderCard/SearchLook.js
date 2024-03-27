import { Search } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { getLookCollectionByID } from '../../../api/LookCollection';

function SearchLook({linkType, setLinkId}) {
    const [value, setValue] = useState();
    const [product, setProduct] = useState('')

    const handelClick = () => {
        value > 0 ? findLook() : alert('ID musbat bölishi kerak')
    }

    const findLook = async () => {
        const res = await getLookCollectionByID(value)
        if(res.success) {
            console.log(res.data);
            setLinkId(res.data.id);
            setProduct(res.data)
        } else {
            alert('Bunday mahsulot mavjud emas')
        }
    }

  return (
    <Box>
        <div className="flex gap-1 justify-center">
            <TextField 
                variant='outlined' 
                label = {linkType} 
                size='small'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type='number'
            />
            <Button variant='outlined' size='small' onClick={handelClick}>
                <Search />
            </Button>
        </div>

        <Box display={'flex'} justifyContent={'center'}>
            <Box sx={{width: '60px'}}>
                <Box className = 'look-box' sx={{height: '120px'}}>
                    {
                        product? (<img src={product?.images[0]?.url} alt="" /> )
                    : <Box></Box>
                    }
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default SearchLook