import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { addCategory } from '../../api'

function AddCategory() {
    const [nameUz, setNameUz] = useState('')
    const [nameRu, setNameRu] = useState('')
    const [newCategory, setNewCategory] = useState('')



    const createCategory = () => {
        const category = {
            nameUZB: nameUz, 
            nameRUS: nameRu
        }
        const res = addCategory(category)

        if(res.success) {
            alert('Kategoriya qöshildi')
        } else {
            alert('Xatolik')
        }
    }

  return (
    <div className="mt-6">
        <p className="text-2xl text-center">
            Kategoriya qöshish
        </p>

        <div className="my-5">
            <div className="input-container justify-between gap-5 px-2">
                <div className="flex w-full h-full items-center gap-2">

                    <input 
                        className='settings-input' 
                        type="text" 
                        placeholder='Name UZ'
                        value={nameUz}
                        onChange={(e) => setNameUz(e.target.value)}
                    />
                    <input 
                        className='settings-input' 
                        type="text" 
                        placeholder='Name RU'
                        value={nameRu}
                        onChange={(e) => setNameRu(e.target.value)}
                    />
                </div>
                <Button onClick={createCategory}>
                    Qöshish
                </Button>
            </div>
        </div>
    </div>
  )
}

export default AddCategory