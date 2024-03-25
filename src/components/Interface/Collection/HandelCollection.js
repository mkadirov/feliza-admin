import { Box, Grid } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { getAllCollections } from '../../../api/LookCollection'
import { useState } from 'react'

function HandelCollection({refreshList, setRefreshList}) {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllCollections();
            if(res.success) {
                console.log(res.data);
                setList(res.data)
            }
        }

        fetchData();
    }, [refreshList])
    
  return (
    <Box sx={{marginTop: 2}}>
        <Grid container spacing={1}>
            {
                list.map((item, idx) => {
                    return(
                        <Grid item xs = {3} key={(item.id * (idx + 9))}>
                            <Box className = 'look-box'>
                                <img src={item.images[0]?.url} alt="" />
                            </Box>
                        </Grid>
                    )
                })
            }
        </Grid>
    </Box>
  )
}

export default HandelCollection