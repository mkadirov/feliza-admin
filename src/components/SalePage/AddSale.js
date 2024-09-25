import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Grid } from '@mui/material'
import { getProductByRefNumber } from '../../api/Product';
import { addSaleProduct } from '../../api/Sale';
import HandelSaleList from './HandelSaleList';


function AddSale({setRefreshSaleList}) {
    const [name, setName] = useState('');
    const [sale, setSale] = useState('');
    const [refNumber, setRefNumber] = useState('')
    const [productList, setProductList] = useState([]);

    const getInitialListFromLocalStorage = () => {
        const storedList = localStorage.getItem('saleList');
        return storedList ? JSON.parse(storedList) : [];
    };

    const [saleProducts, setSaleProducts] = useState(getInitialListFromLocalStorage());

      
    useEffect(() => {
        localStorage.setItem('saleList', JSON.stringify(saleProducts));
    }, [saleProducts]);


    const findProductByRefNumber = () => {
        const fetchData = async() => {
            const res = await getProductByRefNumber(refNumber)
            if(res.success) {
                setProductList(res.data)
                console.log(res.data);
            } else {
                alert(res.message)
            }
        }
        if(refNumber.trim() !== '' || refNumber !== 0) {
            fetchData();
        } else {
            alert('Article nomer bösh bölishi yoki 0 ga teng bölishi mumkin emas')
        }
    }

    const addToSaleList = () => {
        
        if((refNumber.trim() !== '' || refNumber !== 0) && productList.length !== 0) {
            const tempList = [...saleProducts];
            if(tempList.map(item => item.refNumber).includes(refNumber)) {
                alert('Bu mahsulot röyxatda mavjud')
            } else {
                setSaleProducts(prev => [...prev, {refNumber: refNumber, list: productList}])
                setRefNumber('');
                setProductList([]);  
            } 
        } else {
            alert('Malunotlar kiritilmagan')
        }
    }


    const deleteSaleProduct = (refNumber) => {
        setSaleProducts(prev => prev.filter(item => item.refNumber !== refNumber))
    }


    const createSaleGroup = () => {
        

        const fetchData = async () => {
            const result = saleProducts.map(item => item.refNumber)
            const saleProductObj = {
                sale: sale,
                name: name,
                referenceNumberList: result, 
                categoryId: 7
            }
            
            const res = await addSaleProduct(saleProductObj);
    
            if(res.success) {
                setSaleProducts([]);
                setName('')
                setSale('')
                setRefreshSaleList(prev => prev + 1)
                alert('Sale group saqlandi')
            }
        }
        if(sale !== 0 && name.trim() !== '' && saleProducts.length !== 0) {
            fetchData();
        } else {
            alert("Töliq ma'lumot kiritilmadi")
        }
    }
  return (
    <div className="mt-3">
            <Card sx={{padding: 2}}>
                <div className="my-5 flex gap-2">
                    <div className="input-container justify-between gap-5 px-2">
                        <div className="flex w-full h-full items-center gap-2">
                            <input 
                                className='settings-input' 
                                type="text" 
                                placeholder='Chegirma nomi'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input 
                                className='settings-input' 
                                type="number" 
                                placeholder='Chegirma miqdori (%)'
                                value={sale}
                                onChange={(e) => setSale(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-container justify-between gap-5 px-2">
                        <div className="flex w-full h-full items-center gap-2">
                            <input 
                                className='settings-input' 
                                type="text" 
                                placeholder='Article number'
                                value={refNumber}
                                onChange={(e) => setRefNumber(e.target.value)}
                            />
                        </div>
                        <Button variant='outlined' onClick={findProductByRefNumber}>
                            Qidirish
                        </Button>
                    </div>
                </div>

                <Box
                  display="flex"
                  flexDirection="column"
                  minHeight="200px"
                  gap={1} 
                >
                    <Box  flexGrow={1}>
                        <Grid container spacing={1}>
                            {
                                productList.map(item => {
                                    return(
                                        <Grid item xs={1}>
                                            <Box className = 'global-image-box' sx={{height: {xs: '130px', xl: '180px'}}}>
                                                <img src={item.productImages[0]?.url} alt="" />
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                    <Box display={'flex'} justifyContent={'end'}>
                        <Box display={'flex'} gap={2}>
                            <Button variant='outlined' color='error' size='small'>
                                Bekor qilish
                            </Button>
                            <Button variant="contained" size='small' onClick={addToSaleList}>
                                Qo'shish
                            </Button>  
                        </Box>
                    </Box>
                </Box>
            </Card>
            <HandelSaleList list = {saleProducts} sale={sale} deleteSaleProduct = {deleteSaleProduct}/>
            
            <Box display={'flex'} justifyContent={'end'} marginTop={2}>  
                <Button variant='contained' size='small' onClick={createSaleGroup}>
                    Saqlash
                </Button>    
            </Box>
        </div>
  )
}

export default AddSale