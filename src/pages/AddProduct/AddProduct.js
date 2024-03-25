import {Box, Button, Container, Divider, styled} from '@mui/material'
import WestIcon from '@mui/icons-material/West';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import CategoryBox from '../../components/AddProductComponents/CategoryBox';

import ProductMainDetailes from '../../components/AddProductComponents/ProductMainDetailes';
import SizeColorContainer from '../../components/AddProductComponents/SizeColorContainer';
import { createProduct } from '../../api/Product';
import { getAllColors } from '../../api/Color';
import BrandPriceContainer from '../../components/AddProductComponents/BrandPriceContainer';
import NameDescription from '../../components/AddProductComponents/NameDescription';
import RefNumber from '../../components/AddProductComponents/RefNumber';

function AddProduct() {
    const navigate = useNavigate()
   
    const [actionType, setActionType] = useState(1);
    const [productType, setProductType] = useState(2)
    const [productNameUz, setProductNameUz] = useState('');
    const [productNameRu, setProductNameRu] = useState('');
    const [refNumber, setRefNumber] = useState('')
    const [size, setSize] = useState('')
    const [sizeList, setSizeList] = useState([]);
    const [colorList, setColorList] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [sizeDetailes, setSizeDetailes] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [colors, setColors] = useState([])
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [importPrice, setImportPrice] = useState('');
    const [backUpList, setBackUpList] = useState([]);
    const [descriptionUz, setDescriptionUz] = useState('');
    const [descriptionRu, setDescriptionRu] = useState('');
    const [refreshCategory, setRefreshCategory] = useState(0)
    const [colorListRefresh, setColorListRefresh] = useState([])


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

    useEffect(()=> {
        const fetchData = async () => {
            const res = await getAllColors();
            if(res?.success) {
                setColors(res.data)
            }
        }

        fetchData();
    }, [])

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
            const tempSizeDetail = backUpList.find(item => item.color == colorItem && item.size == sizeItem);
            if(tempSizeDetail) {
                newDetailes.push(tempSizeDetail)
            } else {
                newDetailes.push({ color: colorItem, size: sizeItem, barCode: '', quantity: '' });
            }
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
        // const newList = [...sizeDetailes];
        // const sizeIndex = newList.findIndex(item => item.color == color && item.size == s)
        // if (sizeIndex !== -1) {
        //     newList[sizeIndex].barCode = barCode; 
        //     setSizeDetailes(newList);
        // } 
        setSizeDetailes(prevData => prevData.map(item =>
                item.color == color && item.size == s ? { ...item, barCode: barCode } : item
            )
          );   
    }
    function addGeneretedBarcode(barCode, color, s) {
             
        // const newList = [...sizeDetailes];
        // const sizeIndex = newList.findIndex(item => item.color == color && item.size == s)
        // if (sizeIndex !== -1) {
        //     newList[sizeIndex].barCode = barCode; 
        //     setSizeDetailes(newList);
        // }  
        
        setSizeDetailes(prevData => prevData.map(item =>
                item.color == color && item.size == s ? { ...item, barCode: barCode } : item
            )
          );
    }

    function addQuantity(e, color, s) {
        const quantity = e.target.value 
        // const newList = [...sizeDetailes];
        // const sizeIndex = newList.findIndex(item => item.color == color && item.size == s)
        // if (sizeIndex !== -1 && quantity >= 0) {
        //     newList[sizeIndex].quantity = quantity; 
        //     setSizeDetailes(newList);
        // }

        setSizeDetailes(prevData => prevData.map(item =>
                item.color == color && item.size == s ? { ...item, quantity: quantity } : item
            )
          );
    }


   function  createProductList() {
        let counter = 0;
        setBackUpList(sizeDetailes);
        colorList.map(colorItem => {
            let productImageList = [];
            let productSizeDetailes = [];

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

            const colorObj = colors.find(item => item.colorCode == colorItem)
            const categoryIdList = categoryList.map(item => item.id)

            const product = {
                nameUZB: productNameUz,
                nameRUS: productNameRu,
                descriptionUZB: descriptionUz,
                descriptionRUS: descriptionRu,
                referenceNumber: refNumber,
                importPrice: importPrice,
                sellPrice: price,
                sale: 0,
                brandId: brand.id,
                categoryId: categoryIdList,
                colorId: colorObj.id,
                productSizeVariantDtoList: productSizeDetailes,
            }
            console.log(product);
            
            ;
            const fetchData = async() => {
                const res = await createProduct(product, productImageList)
                if(res?.success) {
                    console.log('Mahsulot yaratildi');
                    
                } else {
                    console.log('Xatolik!!!!!!!!!!!!!!!');
                }
            }
            fetchData();
        });

        refreshForm();
    }
    
    

    const refreshForm = () => {
        console.log(colorListRefresh);
        setColorList(prev => prev.filter(item => !colorListRefresh.includes(item)))
        // setProductNameUz('');
        // setProductNameRu('');
        // setDescriptionUz('');
        // setDescriptionRu('');
        // setRefNumber('');
        // setImportPrice('');
        // setPrice('');
        // setBrand('');
        // setCategoryList([]);
        // setColorList([]);
        // setImageList([]);
        // setSizeDetailes([]);
        // setSizeList([])
        // setRefreshCategory(prev => prev + 1);
        
    }
    

    
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
            <StyledButton className={productType == 1? 'activeButton' : 'inactiveButton'} 
                onClick={() => {
                    const newArray = ['Standard']
                    setProductType(1)
                    setSizeList(newArray)
                }}>
                Oddiy Mahsulot 
            </StyledButton>
            <StyledButton className={productType == 2? 'activeButton' : 'inactiveButton'} 
                onClick={() => {
                    setProductType(2)
                    setSizeList([])
                }}>
                Turkumli mahsulot
            </StyledButton>
            
        </div>
        <NameDescription productNameUz={productNameUz} setProductNameUz={setProductNameUz} 
         productNameRu={productNameRu} setProductNameRu={setProductNameRu}
        descriptionRu={descriptionRu} descriptionUz = {descriptionUz} 
        setDescriptionRu={setDescriptionRu} setDescriptionUz = {setDescriptionUz}/>



        <CategoryBox categoryList= {categoryList} setCategoryList= {setCategoryList} refreshCategory = {refreshCategory}/>

        <RefNumber refNumber={refNumber} setRefNumber={setRefNumber}/>

        
        <BrandPriceContainer brand = {brand} setBrand = {setBrand} price = {price} setPrice = {setPrice}  
        importPrice= {importPrice} setImportPrice = {setImportPrice} 
        />

        <SizeColorContainer colorList={colorList} deleteColor={deleteColor} colors={colors} addColor={addColor}
            handleSize={handleSize} addSize={addSize} sizeList={sizeList} deleteSize={deleteSize} 
            productType={productType} size={size}
        />

        <Divider/>

        <ProductMainDetailes colorList={colorList} imageList= {imageList} 
            handleImageChange={handleImageChange} sizeDetailes={sizeDetailes} addBarcode={addBarcode}
            addQuantity={addQuantity} sizeList={sizeList} addGeneretedBarcode = {addGeneretedBarcode}
        />

        <Divider/>

        <div className="flex justify-end mt-2 mb-6">
            <Button onClick={createProductList} type='submit' variant='contained'>
                Kiritish
            </Button >
        </div>
   
    </Container>
  )
}

export default AddProduct