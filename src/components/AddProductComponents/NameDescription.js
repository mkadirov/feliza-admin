import { Grid } from '@mui/material'
import React from 'react'

function NameDescription({productNameUz, setProductNameUz, descriptionRu, 
    setDescriptionRu, descriptionUz, setDescriptionUz, productNameRu, setProductNameRu}) {

  return (
    <div className="my-5">
        <p className="text-2xl mt-3 mb-2">
            Mahsulot nomi UZB*
        </p>
        <div className="input-container " >
            <input 
                placeholder='Mahsulot nomini kriting' 
                style={{flex: 1}} 
                type="text" 
                className='main-input'
                value={productNameUz}
                onChange={(e) => setProductNameUz(e.target.value)}
            />
        </div>
        <p className="text-2xl mt-3 mb-2">
            Mahsulot nomi RUS*
        </p>
        <div className="input-container " >
            <input 
                placeholder='Mahsulot nomini kriting' 
                style={{flex: 1}} 
                type="text" 
                className='main-input'
                value={productNameRu}
                onChange={(e) => setProductNameRu(e.target.value)}
            />
        </div>

        <Grid container spacing={2}>
            <Grid item xs= {6}>
                <p className="text-2xl mt-5 mb-2">
                    Mahsulot haqida ma'lumot
                </p>
                <textarea 
                    value={descriptionUz}
                    onChange={(e) => setDescriptionUz(e.target.value)} 
                    style={{height: '150px', padding: '10px'}} 
                    className='w-full border border-gray-600 ' 
                    type= 'text' 
                />

                
            </Grid>
            <Grid item xs= {6}>
                <p className="text-2xl mt-5 mb-2">
                    Opisanie tovara
                </p>
                <textarea 
                    value={descriptionRu}
                    onChange={(e) => setDescriptionRu(e.target.value)}
                    style={{height: '150px', padding: '10px'}} 
                    className='w-full border border-gray-600' 
                    type= 'text'
                />
            </Grid>
        </Grid>
    </div>
  )
}

export default NameDescription