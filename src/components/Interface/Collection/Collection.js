import { Delete } from '@mui/icons-material';
import { Badge, Box, Button, Card, Grid, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { getProductByID } from '../../../api/Product';
import { addLookCollection } from '../../../api/LookCollection';
import HandelCollection from './HandelCollection';

function Collection() {
    const [image, setImage] = useState(null)
    const [showImageBox, setShowImageBox] = useState(false)
    const [tempProduct, setTempProduct] = useState('');
    const [showTempProduct, setShowTempProduct] = useState(false);
    const [lookProducts, setLookProducts] = useState([])
    const [productId, setProductId] = useState('');
    const [imageList, setImageList] = useState([])
    const [refresfList, setRefreshList] = useState(0)



    const handleImageChange = (event) => {
        setShowImageBox(true)
        const files = event.target.files;
        setImage(files[0]);
        setImageList(files)
        
    }

    const deleteMainImage = () => {
        setShowImageBox(false);
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
        const res = await addLookCollection(imageList, item)
        if(res.success) {
            console.log(res.data);
            console.log('Collection yaratildi');
            setImage(null);
            setImageList([]);
            setLookProducts([]);
            setProductId('');
            setShowImageBox(false);
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
                    <Box sx={{ display: showImageBox? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', height: {xs: '380px', xl: '480px'}}}>

                        <input 
                            type="file" 
                            multiple
                            accept='image/*' 
                            placeholder='Data' 
                            id={'card-image-input-btn'} 
                            hidden 
                            onChange={(e) => handleImageChange(e)}
                        />

                        <div>
                            <Button variant='outlined' onClick={() => document.getElementById('card-image-input-btn').click()}>
                                Rasm yuklash
                            </Button>
                        </div>
                    </Box>
                
                    <Box sx={{display : showImageBox? 'block' : 'none'}}>
                        <Box sx={{position: 'relative', height: {xs: '380px', xl: '480px'}}}>
                        {image ? (
                          <img src={URL.createObjectURL(image)} alt="" />
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