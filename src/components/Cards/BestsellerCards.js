import { Delete, Edit } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'

function BestsellerCards({item}) {
  return (
    <Card sx={{ maxWidth: 240 }}>
      <CardMedia
        sx={{ height: 340 }}
        image={item.productImages[0]?.url}
        title="green iguana"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Id: {item.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ref: {item.referenceNumber}
        </Typography>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
        <IconButton size='small'>
            <Delete/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default BestsellerCards