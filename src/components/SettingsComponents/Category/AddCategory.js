import { Button, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HandelCategory from './HandelCategory'
import { addCategory, getAllCategories } from '../../../api/Category'
import MainCategoryDropDown from './MainCategoryDropDown'

function AddCategory() {
    const [nameUz, setNameUz] = useState('')
    const [nameRu, setNameRu] = useState('')
    const [parentCategory, setParentCategory] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [categories, setCategories] = useState([]);



    const createCategory = async () => {
        const category = {
          nameUZB: nameUz, 
          nameRUS: nameRu,
          parentCategoryUZ: parentCategory,
          parentCategoryRU: parentCategory
        }
      
        const res = await addCategory(category)
       
        if (res?.success) {
          setNameRu('');
          setNameUz('');
          setParentCategory('')
          setNewCategory(nameUz)
        } else {
          alert(res.message);
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllCategories();
            if(res?.success) {
                setCategories(res.data)
            }
        }

        fetchData();
    }, [newCategory])

  return (
    <div className="mt-6">
        <p className="text-2xl text-center">
            Kategoriya qöshish
        </p>

        <div className="my-5">
            <div className="input-container justify-between gap-5 px-2">
                <div className="flex w-full h-full items-center gap-2">

                    <div className="dropdown-box">
                    <input 
                        
                        type="text" 
                        placeholder='Main Category'
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                        readOnly
                        
                    />
                    <MainCategoryDropDown setParentCategory = {setParentCategory} categories = {categories}/>
                    </div>

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

        <Divider/>

        <HandelCategory categories= {categories} setNewCategory= {setNewCategory}/>
    </div>
  )
}

export default AddCategory