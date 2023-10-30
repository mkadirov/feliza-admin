import { Box, styled } from '@mui/material'
import React from 'react'

function LongColorIcon({color}) {
    const StyledBox = styled(Box)({
        width: '120px',
        height: '25px',
        backgroundColor: color,
        borderRadius: '5px',
        border: '1px solid grey'
    })
  return (
    <StyledBox>

    </StyledBox>
  )
}

export default LongColorIcon