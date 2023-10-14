import { Box, styled } from '@mui/material'
import React from 'react'

function ColorBox({color, addColor}) {
    const StyledColorBox = styled(Box)({
        width: '25px', 
        height: '25px',
        backgroundColor: color,
        transition: 'transform 0.3s',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.2)'
        },
        border: '1px solid grey'
        
    })
  return (
    <StyledColorBox className='rounded-md' onClick={() => addColor(color)}>
    </StyledColorBox>
  )
}

export default ColorBox