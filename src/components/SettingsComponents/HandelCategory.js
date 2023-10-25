import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { deleteCategory } from '../../api/Category'

function HandelCategory({categories, setNewCategory}) {

    const deleteCategoryById = async(id) => {
        const res = await deleteCategory(id);
        setNewCategory('Deleted')
    }
    
  return (
    <div className="my-5">
        <Grid container spacing={4}>
            {
                categories?.map(category => {
                    return (
                        <Grid sx={{my: 3}} item xs={10} key={category.nameUZB}>
                            <div className="w-full flex p-2 border border-gray-400 shadow-lg rounded">
                                <div className="w-full flex items-center gap-2">
                                    <Typography>
                                        NameUZB: {category.nameUZB}
                                    </Typography>
                                    <Typography>
                                        NameRUS: {category.nameRUS}
                                    </Typography>
                                </div>
                                <div className="flex items-center">
                                    <Button>
                                        Edit
                                    </Button>
                                    <Button onClick={() => deleteCategoryById(category.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    )
                })
            }
        </Grid>
    </div>
  )
}

export default HandelCategory