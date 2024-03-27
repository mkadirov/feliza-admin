import { Box, Button, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CategoryDropDown from './CategoryDropDown';
import SaleDropDown from './SaleDropDown';
import SearchProduct from './SearchProduct';
import SearchLook from './SearchLook';
import { createKarusel } from '../../../api/Karusel';


function SliderCard() {
    const [linkId, setLinkId] = useState('')
    const [image, setImage] = useState(null)
    const [showImageBox, setShowImageBox] = useState(false)
    const [linkType, setLinkType] = useState('product_id')


    useEffect(() => {
        setLinkId('')
    }, [linkType])
    

    const handleImageChange = (event) => {
        setShowImageBox(true)
        const file = event.target.files[0];
        setImage(file);
    }

    const handelClick = () => {
        if(linkId !== '' && image) {
            createNewSlide();
        } else {
            alert('error')
        }
    }

    const createNewSlide = async() => {
        const item = {
            karuselType: linkType,
            parameterId: linkId
        }
        console.log(item);
        console.log(image);
        const res = await createKarusel(item, image);

        if(res.success) {
            console.log('Slide yaratildi');
            setShowImageBox(false);
            setImage(null);
            setLinkId('');
            setLinkType('ProductId')  
        }
    }

  return (
    <Card>
        <div className="flex p-1">

            <div className="w-2/5 ">
                <div className={` ${showImageBox ? 'hidden' : 'block'} flex justify-center items-center border border-gray-300 rounded-md`} 
                     style={{height: '280px'}}>

                    <input 
                        type="file" 
                        multiple
                        accept='image/*' 
                        placeholder='Data' 
                        id={`card-image-input-btn`} 
                        hidden 
                        onChange={(e) => handleImageChange(e)}
                    />

                    <div>
                        <Button variant='outlined' onClick={() => document.getElementById(`card-image-input-btn`).click()}>
                            Rasm yuklash
                        </Button>
                    </div>
                </div>
                
                <div className={showImageBox ?  'block' : 'hidden'} style={{height: '280px'}}>
                   {
                    image ? (<img src={URL.createObjectURL(image)} alt="" />) : (<Box></Box>)
                   }
                </div>
            </div>

            <div className="w-3/5 flex justify-between flex-col">
                <div className="flex justify-center gap-1 flex-col px-2">
                    <div className="flex justify-center gap-1 mb-2">
                        <Button 
                            variant={linkType == 'product_id' ? 'contained' : 'outlined'} 
                            size='small'
                            onClick={() => setLinkType('product_id')}
                        >
                            Product
                        </Button>
                        <Button 
                            variant={linkType == 'look_id' ? 'contained' : 'outlined'} 
                            size='small'
                            onClick={() => setLinkType('look_id')}
                        >
                            Look
                        </Button>
                        <Button 
                            variant={linkType == 'category_id' ? 'contained' : 'outlined'} 
                            size='small'
                            onClick={() => setLinkType('category_id')}
                        >
                            Category
                        </Button>
                        <Button 
                            variant={linkType == 'sale_id' ? 'contained' : 'outlined'} 
                            size='small'
                            onClick={() => setLinkType('sale_id')}
                        >
                            Sale group
                        </Button>
                        <Button 
                            variant={linkType == 'all_sale' ? 'contained' : 'outlined'} 
                            size='small'
                            onClick={() => setLinkType('all_sale')}
                        >
                            All sale
                        </Button>
                    </div>
                    {
                        linkType == 'product_id' && (
                            <Box>
                                <SearchProduct  linkType={linkType} setLinkId={setLinkId}/>
                            </Box>
                        )
                    }

                    {
                        linkType == 'look_id' && (
                            <Box>
                                <SearchLook  linkType={linkType} setLinkId={setLinkId}/>
                            </Box>
                        )
                    }

                    {
                        linkType == 'category_id' && (
                            <Box>
                                <CategoryDropDown setLinkId={setLinkId}/>
                            </Box>
                            
                        )
                    }
                    {
                        linkType == 'sale_id' && (
                            <Box>
                                <SaleDropDown setLinkId={setLinkId}/>
                            </Box>
                            
                        )
                    }
                    <Box >
                        <Box display={'flex'} gap={2} justifyContent={'center'} marginTop={2}>
                            <Box display={'flex'} gap={1}>
                                <Typography sx={{color: 'grey'}}>
                                    Link type: 
                                </Typography>
                                <Typography >
                                    {linkType} 
                                </Typography>
                            </Box>
                            <Box  gap={1} sx={{ display: linkType == 'all_sale' ? 'none' : 'flex' }}>
                                <Typography sx={{color: 'grey'}}>
                                    Link ID: 
                                </Typography>
                                <Typography >
                                    {linkId} 
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </div>
                
                <Box>
                <div>
                    <div className="flex justify-end gap-1">  
                        <Button 
                            variant='contained' 
                            size='small' 
                            sx={{backgroundColor: 'green'}}
                            onClick={handelClick}
                        >
                            Saqlash
                        </Button>
                    </div>
                </div>
            </Box>
            </div>

            
        </div>
    </Card>
  )
}

export default SliderCard