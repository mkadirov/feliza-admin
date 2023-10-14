import { Badge, Box, Button, Chip, Container, Divider, Grid, Typography, styled, useTheme } from '@mui/material'
import WestIcon from '@mui/icons-material/West';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import ColorBox from '../../components/AddProductComponents/ColorBoxs';
import ColorIcon from '../../components/AddProductComponents/ColorIcon';
import ImageContainer from '../../components/AddProductComponents/ImageContainer';
import CategoryBox from '../../components/AddProductComponents/CategoryBox';
import { createProduct } from '../../api';

function AddProduct() {
    const navigate = useNavigate()
   
    const [actionType, setActionType] = useState(1);
    const [productType, setProductType] = useState(2)
    const [productName, setProductName] = useState('');
    const [refNumber, setRefNumber] = useState('')
    const [size, setSize] = useState('')
    const [sizeList, setSizeList] = useState([]);
    const [colorList, setColorList] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [sizeDetailes, setSizeDetailes] = useState([])
    const [categoryList, setCategoryList] = useState([])

    const StyledButton = styled(Box)(({theme}) => ({
        borderRadius: '20px',
        '&:hover, &.activeButton': {
            backgroundColor:  theme.palette.primary.main,
            color: 'white'
        },
        flex: 1,
        height: '60px',
        backgroundColor: grey[300],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'   
    }))


    const handleImageChange = (e, color) => {
        const files = e.target.files;
        console.log(color);
        if (files && files.length > 0) {
          const newColorImages = { colorName: color, imagesList: Array.from(files) };
          const colorIndex = imageList.findIndex((item) => item.colorName === color);
          const updatedImageList = [...imageList];
      
          if (colorIndex !== -1) {
            updatedImageList[colorIndex] = newColorImages;
          } else {
            updatedImageList.push(newColorImages);
          }
          setImageList(updatedImageList);
        }
    };


    const handleSize = (event) => {
        let newValue = event.target.value;
        const newValueUpperCase = newValue.replace(/[a-z]/g, (match) => match.toUpperCase());
        setSize(newValueUpperCase);
    };


    function addSize() {
        if(!sizeList.includes(size) && size.trim() != ''){
            setSizeList([...sizeList, size]);
        }else{
            alert("Mavjud ölcham yoki bösh matin kritildi")
        }
        setSize('')
    }

    function deleteSize(item) {
        const list = [...sizeList];
        setSizeList(list.filter(s => s!=item))
    }

    function addColor(color) {
        if(!colorList.includes(color)){
            setImageList([...imageList, {colorName: color, imagesList: [] }])
            setColorList([...colorList, color])
        }
    }

    useEffect(() => {
        updateSizeDetailes();
    }, [colorList, sizeList])

    function updateSizeDetailes() {
        const newDetailes = [];
      
        colorList.forEach((colorItem) => {
          sizeList.forEach((sizeItem) => {
            newDetailes.push({ color: colorItem, size: sizeItem, barCode: '', quantity: '' });
          });
        });
        setSizeDetailes(newDetailes); 
    }

    function deleteColor(color) {
        const list = [...colorList];
        setColorList(list.filter(item => item != color))
    }

    
    function addBarcode(e, color, s) {
        const barCode = e.target.value       
        const newList = [...sizeDetailes];
        const sizeIndex = newList.findIndex(item => item.color == color && item.size == s)
        if (sizeIndex !== -1) {
            newList[sizeIndex].barCode = barCode; 
            setSizeDetailes(newList);
        }    
    }

    function addQuantity(e, color, s) {
        const quantity = e.target.value 
        const newList = [...sizeDetailes];
        const sizeIndex = newList.findIndex(item => item.color == color && item.size == s)
        if (sizeIndex !== -1 && quantity >= 0) {
            newList[sizeIndex].quantity = quantity; 
            setSizeDetailes(newList);
        }
    }


    function createProductList() {
        let productList = [];
        let productImageList = [];
        let productSizeDetailes = [];

        colorList.map(colorItem => {
            
            sizeDetailes.map(sizeDetail => {
                if(sizeDetail.color == colorItem){
                    productSizeDetailes.push({size: sizeDetail.size, barCode: sizeDetail.barCode, quantity: sizeDetail.quantity})
                }
            })

            imageList.map(imageObj => {
                if(imageObj.colorName == colorItem){
                    productImageList = [...imageObj.imagesList]
                }
            })

            const product = {
                nameUZB: productName,
                nameRUS: productName,
                descriptionUZB: "testuzb",
                descriptionRUS: "testrus",
                referenceNumber: refNumber,
                price: 150000,
                sale: 0,
                brandId: 1,
                categoryId: [1],
                colorId: 1,
                compatibleProductIdList: [1],
                productSizeVariantDtoList: productSizeDetailes,
                files: productImageList
            }

            const res = createProduct(product)
            console.log(res.message);
        });
        console.log(productSizeDetailes);
        console.log(productImageList);
        console.log(productList);
    }
    

    const colors = ['red', 'blue', 'green', 'yellow', 'coral', 'pink', 'black', 'white']
    return (
    <Container sx={{border: '1px solid grey'}}>
        <Button sx={{my: 2}} variant='contained' onClick={() =>  navigate('/products')}  startIcon={<WestIcon/>}> 
            Mahsulotlar
        </Button>
        <Divider/>
        <p className="text-2xl py-2">
           Asosoiy malumotlar
        </p>
        <div className="flex gap-2 w-full">
            <StyledButton className={actionType == 1? 'activeButton' : 'inactiveButton'} onClick={() => setActionType(1)}>
                Yangi mahsulot qo'shish
            </StyledButton>
            <StyledButton className={actionType == 2? 'activeButton' : 'inactiveButton'} onClick={() => setActionType(2)}>
                Mavjud turkumga mahsulot qo'shish
            </StyledButton>
            <StyledButton className={actionType == 3? 'activeButton' : 'inactiveButton'} onClick={() => setActionType(3)}>
                Mahsulotga qo'shimcha miqdor
            </StyledButton>
        </div>
        <p className="text-2xl mt-3 mb-2">
            Mahsulot turi
        </p>
        <div className="flex gap-2 w-full">
            <StyledButton className={productType == 1? 'activeButton' : 'inactiveButton'} onClick={() => setProductType(1)}>
                Oddiy Mahsulot
            </StyledButton>
            <StyledButton className={productType == 2? 'activeButton' : 'inactiveButton'} onClick={() => setProductType(2)}>
                Turkumli mahsulot
            </StyledButton>
            
        </div>
        <p className="text-2xl mt-3 mb-2">
            Mahsulot nomi *
        </p>
        <div className="input-container " >
            <input 
                placeholder='Mahsulot nomini kriting' 
                style={{flex: 1}} 
                type="text" 
                className='main-input'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
        </div>

        <CategoryBox categoryList= {categoryList} setCategoryList= {setCategoryList}/>

        <div className="w-full flex gap-2 mt-3">
            <div className="flex-1" style={{display: productType==2? 'none': 'block'}}>
                <p className="text-2xl mt-3 mb-2">
                    Barcode *
                </p>
                <Box className="input-container "  >
                    <input 
                        placeholder='Reference number kriting' 
                        style={{flex: 1}} type="text" 
                        className='main-input'
                    />
                    <Button>
                        Generatsiya qilish
                    </Button>
                </Box>
            </div>
            <div className="flex-1">
                <p className="text-2xl mt-3 mb-2">
                    Reference nomer *
                </p>
                <div className="input-container " >
                    <input 
                        placeholder='Mahsulot nomini kriting' 
                        style={{flex: 1}} 
                        type="text" 
                        className='main-input'
                        value={refNumber}
                        onChange={(e) => setRefNumber(e.target.value)}
                    />
                    <Button>
                        Generatsiya qilish
                    </Button>
                </div>
            </div>
        </div>

        
        <Grid container spacing={1} sx={{my: 2}}>
            <Grid item xs={6}>
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
                        <div className="flex gap-2 items-center">
                           {
                            colors.map(color => {
                                return(
                                    <ColorBox key={color} addColor= {addColor} color = {color}/>
                                )
                            })
                           }
                        </div>
                    </div>
                </div>
            
            </Grid>
            <Grid item xs={6}> 
                <div className="flex-1 p-3 rounded-3xl border border-gray-400" style={{display: productType==1? 'none': 'block'}}>
                    <p className="text-2xl mt-3 mb-2">
                        Ölchamlar
                    </p>
                    <div className="input-container " >
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
                                            onDelete={() => deleteSize(item)} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>

        <Divider/>

        <div className='my-5'>
            {
                colorList.map(colorItem => 
                    {
                        const key = colorItem + 'go'
                        return(
                            <div key={key}>
                                <ImageContainer colorItem={colorItem} imageList={imageList} handleImageChange={handleImageChange}/>
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
                                                                    <Button sx={{px: 2}}>
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

        <Divider/>

        <div className="flex justify-end mt-2 mb-6">
            <Button onClick={createProductList} variant='contained'>
                Kiritish
            </Button>
        </div>


    </Container>
  )
}

export default AddProduct