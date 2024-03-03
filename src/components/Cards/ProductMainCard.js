import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { deleteProduct } from '../../api/Product';

function ProductMainCard({item, setNewProduct}) {

  const deleteProductById = async() => {
    const res = await deleteProduct(item.product.id)

    if(res.success) {
      console.log('Mahsulot öchirildi');
      setNewProduct(item)
    }
  }

  return (
    <Card sx={{ maxWidth: 320 }}>
      <CardActionArea>
        <div className='image-box'>
            <img src={item.productImagesList[0]?.url} alt="" />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {item.product.nameUZB}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {item.product.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ref: {item.product.referenceNumber}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Box>
        <IconButton onClick={deleteProductById}>
            <Delete/>
        </IconButton>
      </Box>
    </Card>
  )
}

export default ProductMainCard