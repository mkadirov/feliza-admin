import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { addColor, deleteColor, getAllColors } from '../../../api/Color'
import SmallColorIcon from '../../Global/SmallColorIcon'
import HandelColor from './HandelColor'


function AddColor() {

    const [nameUz, setNameUz] = useState('')
    const [nameRu, setNameRu] = useState('')
    const [colorCode, setColorCode] = useState('')
    const [lastAction, setLastAction] = useState('');
    const [colors, setColors] = useState([]);


    const createColor = async() => {

        if(nameRu.trim() !== '' && nameUz.trim() !== '' && colorCode.trim() !== '') {
            const color = {
                nameUZB: nameUz,
                nameRUS: nameRu,
                colorCode: colorCode
            }
            const res = await addColor(color)
    
            if(res?.success) {
                setLastAction(nameUz + 'created');
                setNameRu('');
                setNameUz('');
                setColorCode('');
            } else {
                alert('Xatolik')
            }
        } else {
            alert("Bösh matin kritish mumkin emas");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllColors();
            if(res?.success) {
                setColors(res.data)
            }
        }
        fetchData();
    }, [lastAction])

    const deleteColorById = async(id) => {
        const res = await deleteColor(id);
        if(res.success) {
            setLastAction(id + 'deleted')
        } else {
            alert('Xatolik')
        }
    }


  return (
    <div className="my-5">
        <p className="text-2xl text-center">
            Yangi rang qöshish
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

                    <input 
                        className='settings-input' 
                        type="text" 
                        placeholder='Rang kodi'
                        value={colorCode}
                        onChange={(e) => setColorCode(e.target.value)}
                    />
                </div>
                <Button onClick={createColor}>
                    Qöshish
                </Button>
            </div>
        </div>

        <HandelColor colors={colors} deleteColorById={deleteColorById} setLastAction={setLastAction}/>
    </div>
  )
}

export default AddColor