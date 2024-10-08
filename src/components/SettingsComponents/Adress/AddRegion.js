import React, { useEffect, useState } from 'react'
import { Button, Divider, Grid, Typography } from '@mui/material'
import { addNewRegion, getAllRegions, getSubRegions } from '../../../api/Address/Region'
import HandelRegion from './HandelRegion'
import AddSubRegion from './AddSubRegion'
import HandleSubRegion from './HandleSubRegion'
import AddPostFilial from './AddPostFilial'
import { getAllPostFilials } from '../../../api/Address/Post'
import HandlePostFilials from './HandlePostFilials'

function AddRegion() {
    const [nameUZB, setNameUZB] = useState('')
    const [nameRUS, setNameRUS] = useState('')
    const [postCode, setPostCode] = useState('')
    const [newRegion, setNewRegion] = useState('')
    const [regions, setRegions] = useState([])
    const [newSubRegion, setNewSubRegion] = useState('')
    const [subRegions, setSubRegions] = useState([]);
    const [parentRegion, setParentRegion] = useState('')
    const [newPostFilial, setNewPostFilial] = useState(1)
    const [postFilials, setPostFilials] = useState([]);


    const createRegion = async () => {
        const region = {
          nameUZB: nameUZB,
          nameRUS: nameRUS, 
          postCode: postCode,
        }
        const res = await addNewRegion(region)

        if (res?.success) {
          setNewRegion(nameUZB)
          setNameUZB('');
          setNameRUS('')
          setPostCode('');
          
        } else {
          alert(res.message);
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllRegions();
            if(res?.success) {
                setRegions(res.data)
            }
        }
        fetchData();
    }, [newRegion])

    useEffect(() => {
        const fetchData = async() => {
            const res = await getSubRegions();
            if(res?.success) {
                setSubRegions(res.data)
            }
        }
        fetchData();
    }, [newSubRegion])

    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllPostFilials();
            if(res?.success) {
                console.log(res.data);
                setPostFilials(res.data)
            }
        }
        fetchData();
    }, [newPostFilial])


  return (
    <div className="mt-6">
        <p className="text-2xl text-center">
            Viloyat qo'shish
        </p>

        <div className="my-5">
            <div className="input-container justify-between gap-5 px-2"> 
                    <input 
                        className='settings-input'
                        type="text" 
                        placeholder='Viloyat (UZB)'
                        value={nameUZB}
                        onChange={(e) => setNameUZB(e.target.value)}   
                    />
                    <input 
                        className='settings-input'
                        type="text" 
                        placeholder='Viloyat (RUS)'
                        value={nameRUS}
                        onChange={(e) => setNameRUS(e.target.value)}   
                    />
                    <input 
                        className='settings-input' 
                        type="text" 
                        placeholder='Postkod'
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                    />
                <Button onClick={createRegion}>
                    Qöshish
                </Button>
            </div>
        </div>
        <AddSubRegion regions={regions} setNewSubRegion={setNewSubRegion} 
        parentRegion ={parentRegion} setParentRegion ={setParentRegion}/>

        <AddPostFilial subRegions={subRegions} setNewPostFilial={setNewPostFilial} regions={regions}/>
        <Divider/>
        <p className="text-xl text-center mt-2">Viloyatlar</p>
        <HandelRegion regions= {regions} setNewRegion= {setNewRegion}/>
        
        <p className="text-xl text-center mt-2">Tumanlar</p>
        <HandleSubRegion regions= {regions} setNewSubRegion= {setNewSubRegion} 
           parentRegion={parentRegion} setParentRegion={setParentRegion} subRegions={subRegions}
        />

        <p className="text-xl text-center mt-2">Pochta</p>
        <HandlePostFilials postFilials={postFilials} setNewPostFilial={setNewPostFilial}/>
    </div>
  )
}

export default AddRegion