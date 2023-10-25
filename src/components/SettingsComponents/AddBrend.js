import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { addBrend } from '../../api/Category'

function AddBrend() {

    const [name, setName] = useState('')
    


    // const createBrend = () => {
    //     const res = addBrend({name: name})

    //     if(res.success) {
    //         alert('Kategoriya qöshildi')
    //     } else {
    //         alert('Xatolik')
    //     }
    // }
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
                {/* <Button onClick={createBrend}>
                    Qöshish
                </Button> */}
            </div>
        </div>
    </div>
  )
}

export default AddBrend