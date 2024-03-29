import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { addBrend, getAllBrends } from '../../../api/Brand'
import HandelBrand from './HandelBrand'


function AddBrend() {

    const [name, setName] = useState('')
    const [brends, setBrends] = useState([])
    const [lastAction, setLastAction] = useState('')


    const createBrend = async() => {
        const brand = {
            name: name
        }
        const res = await addBrend(brand)

        if(res?.success) {
            setLastAction(name + 'added')
            setName('')
        } else {
            alert('Xatolik')
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllBrends();
            if(res?.success) {
                setBrends(res.data);
            }
        }
        fetchData();
    },[lastAction])


  return (
    <div className="my-5">
        <p className="text-2xl text-center">
            Brend qöshish
        </p>

        <div className="my-5">
            <div className="input-container justify-between gap-5 px-2">
                <div className="flex w-full h-full items-center gap-2">

                    <input 
                        className='settings-input' 
                        type="text" 
                        placeholder='Name UZ'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                   
                    
                </div>
                <Button onClick={createBrend}>
                    Qöshish
                </Button>
            </div>
        </div>

        <HandelBrand brends= {brends} setLastAction = {setLastAction}/>
    </div>
  )
}

export default AddBrend