import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginPage({setIsLogin}) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function checkUser() {
        if(login == 'admin' && password == '123') {
            setIsLogin(true)
            navigate('/home')
            
            
        } else {
            alert("Login yoki parol notög'ri kritildi")
        }

        setLogin('')
        setPassword('')
    }


  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-3/4 lg:w-1/4  rounded-lg border border-gray-300 shadow-md py-2">
            <p className="text-center text-3xl">Login</p>

            <div className="w-4/5 m-auto">
            
            <TextField  
                sx={{mt: 2}} 
                size='small' 
                id="outlined-basic" 
                label="Login" 
                variant="outlined" 
                fullWidth
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                />
            
            
            <TextField 
                sx={{mt: 2}} 
                size='small' 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            

            
            <Button
                sx={{my: 3}} 
                variant='contained' 
                fullWidth
                onClick={checkUser}
            >
                Kirish
            </Button>
            
            
            <p className="text-end">
                Parolni unuttingizni?
            </p>
            
            </div>
            
        </div>
    </div>
  )
}

export default LoginPage