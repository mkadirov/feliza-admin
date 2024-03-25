import { Button } from '@mui/material'
import React from 'react'

function RefNumber({refNumber, setRefNumber}) {
    
  return (
    <div className="w-full flex gap-2 mt-3">
        <div className="flex-1">
                <p className="text-2xl mt-3 mb-2">
                    Reference nomer *
                </p>
                <div className="input-container " >
                    <input 
                        placeholder='Mahsulot nomini kriting' 
                        style={{flex: 1}} 
                        type="text" 
                        className='main-input'
                        value={refNumber}
                        onChange={(e) => setRefNumber(e.target.value)}
                    />
                    <Button onClick={() => setRefNumber('R' + (new Date().getTime()))}>
                        Generatsiya qilish
                    </Button>
                </div>
        </div>
    </div>
  )
}

export default RefNumber