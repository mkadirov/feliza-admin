import { Search } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { getProductByID } from '../../../api/Product';

function SearchProduct({linkType, setLinkId}) {
    const [value, setValue] = useState();
    const [product, setProduct] = useState('')

    const handelClick = () => {
        value !== '' ? findProduct() : alert('Iltimos ID ni kriting')
    }

    const findProduct = async () => {
        const res = await getProductByID(value)
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
                type='text'
            />
            <Button variant='outlined' size='small' onClick={handelClick}>
                <Search />
            </Button>
        </div>

        <Box display={'flex'} justifyContent={'center'}>
            <Box sx={{width: '60px'}}>
                <Box className = 'look-box' sx={{height: '120px'}}>
                    {
                        product? (<img src={product?.productImages[0]?.url} alt="" /> )
                    : <Box></Box>
                    }
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default SearchProduct