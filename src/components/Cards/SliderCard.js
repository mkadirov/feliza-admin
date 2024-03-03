import { Cancel, Delete, DeleteForever, Done, Edit, Save, Search } from '@mui/icons-material'
import { Button, Card, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'


function SliderCard({item, idx, setIsChanged}) {
    const [editSliderCard, setEditSliderCard] = useState(false);
    const [isProduct, setIsProduct] = useState(true);
    const [refNumber, setRefNumber] = useState(0)
    const [image, setImage] = useState(null)
    const [showImageBox, setShowImageBox] = useState(true)
    const [isNew, setIsNew] = useState(false)

    useEffect(() => {
        if(Object.keys(item).length === 0) {
            setIsNew(true)
            setEditSliderCard(true);
            setShowImageBox(false);
        }
    }, [item])
    

    const cancelEdit = () => {
        setEditSliderCard(false)
        setShowImageBox(true);
        setImage(null)
    }

    const handleImageChange = (event) => {
        setShowImageBox(true)
        const file = event.target.files[0];
        setImage(file);
        console.log(image);
    }

    const editCard = () => {
        setShowImageBox(false)
        setEditSliderCard(true)
    }

  return (
    <Card>
        <p>#{idx + 1}</p>

        <div className="flex p-1">

            <div className="w-2/5 ">
                <div className={` ${showImageBox ? 'hidden' : 'block'} flex justify-center items-center border border-gray-300 rounded-md`} 
                     style={{height: '180px'}}>

                    <input 
                        type="file" 
                        multiple
                        accept='image/*' 
                        placeholder='Data' 
                        id={`card-image-input-btn-${idx}`} 
                        hidden 
                        onChange={(e) => handleImageChange(e)}
                    />

                    <div>
                        <Button variant='outlined' onClick={() => document.getElementById(`card-image-input-btn-${idx}`).click()}>
                            Rasm yuklash
                        </Button>
                    </div>
                </div>
                
                <div className={showImageBox ?  'block' : 'hidden'} style={{height: '180px'}}>
                   <img src={image? URL.createObjectURL(image) : item?.image} alt="" />
                </div>
            </div>

            <div className="w-3/5 flex justify-between flex-col">
                <div className="flex justify-center gap-1 flex-col px-2">
                    <div className="flex justify-center gap-1 mb-2">
                        <Button variant='contained' size='small'>
                            Product
                        </Button>
                        <Button variant='outlined' size='small'>
                            Group
                        </Button>
                        <Button variant='outlined' size='small'>
                            Collection
                        </Button>
                    </div>
                    <div className="flex gap-1 justify-center">
                        <TextField 
                            variant='outlined' 
                            label = 'RefNumber' 
                            size='small'
                            value={refNumber}
                            onChange={(e) => setRefNumber(e.target.value)}
                        />
                        <Button variant='outlined' size='small'>
                            <Search/>
                        </Button>
                    </div>
                </div>

                <div className={editSliderCard?  'block' : 'hidden'}>
                    <div className="flex justify-end gap-1">
                            
                        {
                            isNew ? <IconButton onClick={() => setIsChanged(prev => prev +1)}>
                                <Delete sx={{color: 'red'}}/>
                            </IconButton> : <IconButton onClick={cancelEdit}>
                                <Cancel sx={{color: 'red'}}/>
                            </IconButton>
                        }
                    
                        <IconButton>
                            <Save sx={{color: 'green'}}/>
                        </IconButton>    

                    </div>
                </div>
                <div className={editSliderCard?  'hidden' : 'block'}>
                    <div className="flex justify-end gap-1">                    
                        <IconButton onClick={editCard}>
                            <Edit sx={{color: 'green'}}/>
                        </IconButton>
                    
                        <IconButton>
                            <DeleteForever sx={{color: 'red'}}/>
                        </IconButton>
                        
                    </div>
                </div>
            </div>
        </div>
    </Card>
  )
}

export default SliderCard