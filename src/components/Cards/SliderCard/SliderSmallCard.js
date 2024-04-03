import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { deleteKaruselSlideByID } from '../../../api/Karusel';

function SliderSmallCard({item, idx, setIsChanged}) {

    const deleteKaruselSlide = async() => {
        const res = await deleteKaruselSlideByID(item?.id);

        if(res.success) {
            setIsChanged(prev => prev + 1)
        } else {
            alert('xatolik')
        }
    }


  return (
    <Card>
      
      <Box className = 'look-box' sx={{height: '240px'}}>
        <img src={item? item.productImages[0].url : ''} alt="" />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          #{idx + 1} Slide
        </Typography>
        <Box display={'flex'}  gap={1}>
          <Typography variant="body2" color="text.secondary">
            Link type:
          </Typography>
          <Typography variant="body2">
            {item.karuselType}
          </Typography>
        </Box>
        <Box display={'flex'}  gap={1}>
          <Typography variant="body2" color="text.secondary">
            Link ID:
          </Typography>
          <Typography variant="body2">
            {item.parameterId}
          </Typography>
        </Box>
      </CardContent>
      
        <Box display={'flex'} justifyContent={'end'}>
            <IconButton onClick={deleteKaruselSlide}>
                <Delete/>
            </IconButton>
        </Box>
      
    </Card>
  )
}

export default SliderSmallCard