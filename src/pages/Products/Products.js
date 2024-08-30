import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import { Button, Chip, Divider, Grid, styled } from '@mui/material'
import { grey } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../api/Product';
import ProductMainCard from '../../components/Cards/ProductMainCard';


function Products() {

    const [activePage, setActivePage] = useState(1)
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState('')

    
    const StyledChip = styled(Chip)({

        '&.activeChip': {
            backgroundColor: grey[400],
        }

    })

    useEffect( () => {
        async function fetchData() {
            const res = await getAllProducts();
            if(res.success) {
                console.log(res.data.content);
                setProducts(res.data.content)
            }
        }
        fetchData();
    }, [newProduct]);
  return (
    <MainLayout>
        <div className="mt-12 ">

            <div className="py-4 flex gap-2">
                <StyledChip className={activePage == 1? 'activeChip' : 'inactiveChip'}  label={`Barcha mahsulotlar(${products?.length})`} onClick= {() => setActivePage(1)}/>
                <StyledChip className={activePage == 2? 'activeChip' : 'inactiveChip'}  label='Aktiv(0)' onClick= {() => setActivePage(2)}/>
                <StyledChip className={activePage == 3? 'activeChip' : 'inactiveChip'}  label='Kam qolgan mahsulotlar(0)' onClick= {() => setActivePage(3)}/>
                <StyledChip className={activePage == 4? 'activeChip' : 'inactiveChip'}  label='Tugagan mahsulotlar(0)' onClick= {() => setActivePage(4)}/>
            </div>

            <Divider/>

            <div className="mt-4 flex gap-2" style={{height: '50px'}}>
                <div className="w-full rounded-md bg-gray-300 h-full flex pl-4 overflow-hidden" >
                    <div className='flex justify-center items-center'>
                        <Search/>
                    </div>
                    <input style={{flex: 1}} type="text" className='main-input'/>
                </div>
                <div className="rounded-md bg-gray-300 h-full flex " >
                    <Button>
                        Qidirish
                    </Button>
                </div>
                <Button 
                    variant='contained' 
                    startIcon= {<AddIcon/>}
                    onClick={() => navigate('/addproduct')}
                >
                    Qo'shish
                </Button>
            </div>

            <Grid container  sx={{marginTop: 3}}  spacing={2}>
                {
                    products?.map((item, index) => {
                        return(
                            <Grid item xs= {6} md= {4} lg= {4} xl= {3} key={index} className="mt-2">
                                <ProductMainCard item={item} setNewProduct = {setNewProduct}/>
                            </Grid>
                        )
                    })
                }
            </Grid>

        </div>
    </MainLayout>
  )
}

export default Products