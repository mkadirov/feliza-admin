import { Badge, Box, styled } from '@mui/material'
import React from 'react'

function ColorIcon({color, deleteColor}) {
    const StyledBox = styled(Box)({
        width: '35px',
        height: '35px',
        backgroundColor: color,
        position: 'relative',
        borderRadius: '10px',
        border: '1px solid grey'
    })

  

  return (
    <Badge badgeContent= {'x'} color='error' onClick={() => deleteColor(color)} sx={{cursor: 'pointer'}}>
        <StyledBox>
        
        </StyledBox>
    </Badge>
  )
}

export default ColorIcon