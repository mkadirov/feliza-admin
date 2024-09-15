import { Button, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MainRegionDropDown from './MainRegionDropDown'
import { addNewSubRegion } from '../../../api/Address/Region'

function AddSubRegion({regions, setNewSubRegion, parentRegion, setParentRegion}) {

    const [nameUZB, setNameUZB] = useState('')
    const [nameRUS, setNameRUS] = useState('')
    const [postCode, setPostCode] = useState('')
    
    
    const createNewSubRegion = async () => {
        const region = {
          nameUZB: nameUZB, 
          nameRUS: nameRUS,
          postCode: postCode,
          regionId: parentRegion.id,
        }
         const res = await addNewSubRegion(region)
       
        if (res?.success) {
            console.log('Sub region yaratildi');
          setNameUZB('');
          setNameRUS('')
          setPostCode('');
          setParentRegion('')
          setNewSubRegion(nameUZB)
        } else {
          alert(res.message);
        }
    }

    

  return (
    <div className="mt-6">
        <p className="text-2xl text-center">
            Tuman qo'shish
        </p>

        <div className="my-5">
            <div className="input-container justify-between gap-5 px-2">
                <div className="flex w-full h-full items-center gap-2">

                    <div className="dropdown-box">
                    <input 
                        type="text" 
                        placeholder='Main Region'
                        value={parentRegion == ''? '' : parentRegion.nameUZB}
                        onChange={(e) => setParentRegion(e.target.value)}
                        readOnly
                        
                    />
                    <MainRegionDropDown setParentRegion = {setParentRegion} regions = {regions}/>
                    </div>

                    <input 
                        className='settings-input' 
                        type="text" 
                        placeholder='Tuman (UZB)'
                        value={nameUZB}
                        onChange={(e) => setNameUZB(e.target.value)}
                    />
                    <input 
                        className='settings-input' 
                        type="text" 
                        placeholder='Tuman (RUS)'
                        value={nameRUS}
                        onChange={(e) => setNameRUS(e.target.value)}
                    />
                    <input 
                        className='settings-input-small' 
                        type="text" 
                        placeholder='Postkod'
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                    />
                </div>
                <Button onClick={createNewSubRegion}>
                    Qöshish
                </Button>
            </div>
        </div>

        <Divider/>

    </div>
  )
}

export default AddSubRegion