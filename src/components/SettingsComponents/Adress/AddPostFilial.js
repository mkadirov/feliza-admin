import { Button, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { addPostFilial } from '../../../api/Address/Post'
import SubRegionDropDown from './SubRegionDropDown'
import PostRegionDropDown from './PostRegionDropDown'
import { getSubRegionsByParent } from '../../../api/Address/Region'


function AddPostFilial({setNewPostFilial, regions}) {
    const [postName, setPostName] = useState('')
    const [postFilialName, setPostFilialName] = useState('')
    const [description, setDescription] = useState('');
    const [street, setStreet] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [subRegionId, setSubRegionId] = useState('');
    const [subRegion, setSubRegion] = useState('');
    const [region, setRegion] = useState('');
    const [subRegions, setSubRegions] = useState([])
    
    
    const createNewPostFilial = async () => {
        // if (!postName || !postFilialName || !description || !street || !houseNumber || !subRegionId) {
        //     alert('Bitte fülle alle erforderlichen Felder aus.');
        //     return;
        //   }
        const postFilial = {
          postName: postName, 
          postFilialName: postFilialName,
          description: description,
          street: street,
          houseNumber: houseNumber,
          subRegionId: subRegion.id,
          regionId: region.id
        }
        console.log(postFilial);
         const res = await addPostFilial(postFilial)
       
        if (res?.success) {
          setPostName('');
          setPostFilialName('');
          setDescription('')
          setStreet('');
          setHouseNumber('');
          setSubRegionId('');
          setRegion('')
          setNewPostFilial(postFilialName)

        } else {
          alert(res.message);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await getSubRegionsByParent(region.id)
            if(res.success) {
                setSubRegions(res.data)
            }
        }
        if(region !== '') {
            fetchData();
        }
    }, [region])

    

  return (
    <div className="mt-6">
        <p className="text-2xl text-center">
            Pochta filiali qöshish
        </p>

        <div className="my-5">
            <div className="input-container-big  px-2">
                <div  className="input-container">
                    <div className="dropdown-box">
                        <input 
                            type="text" 
                            placeholder='Viloyat'
                            value={region == ''? '' : region.name}
                            onChange={(e) => setRegion(e.target.value)}
                            readOnly
                        
                        />
                        <PostRegionDropDown regions={regions} setRegion= {setRegion}  setSubRegion={setSubRegion}/>
                    </div>

                    <div className="dropdown-box">
                        <input 
                            type="text" 
                            placeholder='Tuman'
                            value={subRegion == ''? '' : subRegion.name}
                            onChange={(e) => setSubRegion(e.target.value)}
                            readOnly
                        
                        />
                        <SubRegionDropDown subRegions={subRegions} setSubRegion= {setSubRegion} region = {region}/>
                    </div>

                    <input 
                        className='settings-input' 
                        type="text" 
                        placeholder='Pochta nomi'
                        value={postName}
                        onChange={(e) => setPostName(e.target.value)}
                    />
                    

                   
                </div>
                <div className="input-container">
                        <input 
                            className='settings-input' 
                            type="text" 
                            placeholder='Pochta filiali'
                            value={postFilialName}
                            onChange={(e) => setPostFilialName(e.target.value)}
                        />
                        <input 
                            className='settings-input' 
                            type="text" 
                            placeholder='Köcha nomi'
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                        <input 
                            className='settings-input' 
                            type="text" 
                            placeholder='Uy raqami'
                            value={houseNumber}
                            onChange={(e) => setHouseNumber(e.target.value)}
                        />
                </div>

                <div className="input-container">
                    <input 
                        className='settings-input' 
                        type="text" 
                        placeholder="Pochta filiali haqida ma'lumot"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button  onClick={createNewPostFilial}>
                        Qöshish
                    </Button>
                </div>
                
            </div>
        </div>

        <Divider/>

    </div>
  )
}

export default AddPostFilial