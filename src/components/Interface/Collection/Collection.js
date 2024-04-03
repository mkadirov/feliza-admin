import { Delete } from '@mui/icons-material';
import { Badge, Box, Button, Card, Grid, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { getProductByID } from '../../../api/Product';
import { addLookCollection } from '../../../api/LookCollection';
import HandelCollection from './HandelCollection';

function Collection() {
    const [lookImage, setLookImage] = useState(null)
    const [showLookImageBox, setShowLookImageBox] = useState(false)
    const [tempProduct, setTempProduct] = useState('');
    const [showTempProduct, setShowTempProduct] = useState(false);
    const [lookProducts, setLookProducts] = useState([])
    const [productId, setProductId] = useState('');
    const [lookImageList, setLookImageList] = useState([])
    const [refresfList, setRefreshList] = useState(0)



    const handleLookImageChange = (event) => {
        setShowLookImageBox(true)
        const files = event.target.files;
        setLookImage(files[0]);
        setLookImageList(files)
        
    }

    const deleteMainImage = () => {
        setShowLookImageBox(false);
    }


    const handelAddClick = () => {
        if(productId > 0 ) {
            findProduct();
        } else {
            alert('Product IDsini kriting')
        }
    }
    

    const findProduct = async() => {
       
        const res = await getProductByID(productId);
        if(res?.success) {
            console.log(res.data);
            setTempProduct(res.data)
            setShowTempProduct(true)
            setProductId('')
        }
    }

    const addProductToList = () => {
        setLookProducts(prev => [...prev, tempProduct])
        setShowTempProduct(false)
        setTempProduct('')
    }

    const createLookCollection = async() => {
        const productIdList = lookProducts.map(item => item.id)
        const item = {
            productIds: productIdList
        }
        const res = await addLookCollection(lookImageList, item)
        if(res.success) {
            console.log(res.data);
            console.log('Collection yaratildi');
            setLookImage(null);
            setLookImageList([]);
            setLookProducts([]);
            setProductId('');
            setShowLookImageBox(false);
            setShowTempProduct(false);
            setTempProduct('')
            setRefreshList(prev => prev + 1)
        } else {
            console.log('xatolik');
        }
    }

    const deleteLookProduct = (id) => {
        setLookProducts(prev => prev.filter(item => item.id !== id))
    }

    
  return (
    <Box marginY={3}>
        <Card sx={{padding: 1}}>
            <Box sx={{display: 'flex padding: 1'}}>

                <Grid container spacing={1}>

                    <Grid item xs = {3} >
                    <Box sx={{ display: showLookImageBox? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', height: {xs: '380px', xl: '480px'}}}>

                        <input 
                            type="file" 
                            multiple
                            accept='image/*' 
                            placeholder='Data' 
                            id={'card-image-input-btn-look'} 
                            hidden 
                            onChange={(e) => handleLookImageChange(e)}
                        />

                        <div>
                            <Button variant='outlined' onClick={() => document.getElementById('card-image-input-btn-look').click()}>
                                Rasm yuklash
                            </Button>
                        </div>
                    </Box>
                
                    <Box sx={{display : showLookImageBox? 'block' : 'none'}}>
                        <Box sx={{position: 'relative', height: {xs: '380px', xl: '480px'}}}>
                        {lookImage ? (
                          <img src={URL.createObjectURL(lookImage)} alt="" />
                          ) : (
                          <span>Error: Image URL not found</span>
                        )}

                        <div className='absolute top-1 right-1'>
                            <IconButton onClick={deleteMainImage}>
                                <Delete/>
                            </IconButton>
                        </div>
                        </Box>
                    </Box>
                    </Grid>


                    <Grid item xs = {6} >
                        <Box>
                            <Grid container spacing={1}>
                                {
                                   lookProducts.map(item => {
                                    return(
                                        <Grid item xs = {2}  key={item.id}>
                                            <Badge 
                                            badgeContent = {'x'} 
                                            color='secondary' 
                                            onClick = {() => deleteLookProduct(item.id)}
                                            sx={{cursor: 'pointer'}}
                                        >
                                                <Box>
                                                    <img src={item?.productImages[0]?.url} alt="" />
                                                </Box>
                                            </Badge>
                                        </Grid>
                                    )
                                   })
                                }
                            </Grid>
                        </Box>
                    </Grid>


                    <Grid item xs = {3} sx={{display: 'flex', flexDirection: 'column'}}>
                        <div className='flex justify-between'>
                            <TextField 
                                variant='outlined' 
                                size='small' 
                                label = 'Product ID' 
                                className='flex-1'
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                type='number'
                            />
                            <Button variant='contained' onClick={handelAddClick}>
                               Add
                            </Button>
                        </div>

                        <Box sx={{flex: 1, }}>
                            <Box sx={{display: showTempProduct? 'flex':'none', paddingX: 1, paddingY: 3, flexDirection: 'column'}}>
                                <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Grid item xs = {10}>
                                        <Box>
                                            <Box >
                                               {
                                                tempProduct? (<img src={tempProduct?.productImages[0]?.url} alt="" /> )
                                                : (<span>Error: Image URL not found</span>)
                                               }
                        
                                            </Box>
                                            <Box sx={{display: 'flex', justifyContent: 'end', marginTop: 2}}>
                                                <Button 
                                                   variant='outlined' 
                                                   size='small'
                                                   onClick={addProductToList}
                                                >
                                                   OK
                                                </Button>
                                             </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>

                        <Box>
                            <Button 
                                variant='contained' 
                                color = 'success' 
                                size='small' 
                                fullWidth
                                onClick={createLookCollection}
                            >
                                Saqlash
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Card>

        <HandelCollection refreshList={refresfList} setRefreshList={setRefreshList}/>
    </Box>
  )
}

export default Collection