import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { deleteProduct } from '../../api/Product';
import { useNavigate } from 'react-router-dom';

function ProductMainCard({item, setNewProduct}) {

  const navigate = useNavigate();

  const deleteProductById = async() => {
    const res = await deleteProduct(item.id)

    if(res.success) {
      console.log('Mahsulot öchirildi');
      setNewProduct(item)
    }
  }

  return (
    <Card sx={{ maxWidth: 320 }}>
      
        <div className='image-box' onClick = {() => navigate(`/product/${item.referenceNumber}`)}>
            <img src={item.productImages[0]?.url} alt="" />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {item.nameUZB}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {item.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ref: {item.referenceNumber}
          </Typography>
        </CardContent>
      

      <Box>
        <IconButton onClick={deleteProductById}>
            <Delete/>
        </IconButton>
      </Box>
    </Card>
  )
}

export default ProductMainCard