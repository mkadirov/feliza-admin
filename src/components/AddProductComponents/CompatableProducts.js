import { Button, Grid } from '@mui/material'
import React from 'react'
import { createCompatableProduct } from '../../api/CompatableProducts.js';

function CompatableProducts({compatibleProductId, setCompatibleProductId, colorItem}) {

  const objIndex = compatibleProductId.findIndex(item => item.color == colorItem)

  function addCompatableProductId(e) {
    e.preventDefault();
    const id = e.target.value;
    if(objIndex >= 0) {
        const list = [...compatibleProductId]
        list[objIndex].groupId = id;
        setCompatibleProductId(list);
    } else {
        setCompatibleProductId([... compatibleProductId, {color: colorItem, groupId: id}])
    }
  }


  const createNewCompatableProduct = async () => {
    const res = await createCompatableProduct();
    if(res.success) {
      if(objIndex >= 0) {
        const list = [...compatibleProductId]
        list[objIndex].groupId = res.data.object;
        setCompatibleProductId(list);
      } else {
        setCompatibleProductId([... compatibleProductId, {color: colorItem, groupId: res.data.object}])
      }
    }
  }

  return (
    <Grid container spacing={2}>
        <Grid item xs={6}>
            <div className='my-5'>
                <p className="text-2xl">
                    Mos mahsulotlar guruhi
                </p>
                <div className="input-container">
                     <input 
                       type="number" 
                       className='main-input' 
                       placeholder='Mos mahsulotlar gruhi IDsi'
                       value={objIndex>=0? compatibleProductId[objIndex].groupId: ''}
                       onChange={(e) => addCompatableProductId(e)}
                   />
    
                   <Button onClick={createNewCompatableProduct}>
                      Generatsiya qilish
                   </Button>
                </div>
            </div>
        </Grid>
    </Grid>
  )
}

export default CompatableProducts