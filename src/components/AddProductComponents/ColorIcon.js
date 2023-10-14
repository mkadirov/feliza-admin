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

    const InnerCircle = styled(Box)({
        width: '20px',
        height: '20px',
        position: 'absolute',
        backgroundColor: 'red',
        color: 'white',
        top: 0,
        right: 0,
        transform: 'translate(25%, -25%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid gray',
        borderRadius: '100%',
        cursor: 'pointer'
    })

  return (
    <Badge badgeContent= {'x'} color='error' onClick={() => deleteColor(color)} sx={{cursor: 'pointer'}}>
        <StyledBox>
        
        </StyledBox>
    </Badge>
  )
}

export default ColorIcon