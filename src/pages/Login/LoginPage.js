import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/Login';

function LoginPage({setUser}) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('')

    const checkUser = async() =>  {
        const userDetailes = {
            phoneNumber: login,
            password: password
        }
        const res = await loginUser(userDetailes)

        if(res.success) {
            const currentTime = new Date().getTime();
            const expirationTime = currentTime + 24 * 60 * 60 * 30000;

            const userData = {
              user: res.data,
              expirationTime: expirationTime,
            };

            localStorage.setItem('userData', JSON.stringify(userData));
            setUser(res.data);
            navigate('/home')
            setLogin('')
            setPassword('')
        } else {
            setMessage(message)
        } 
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
                type='password'
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
            
            
            <p className="text-end text-red-500">
                {message}
            </p>
            
            </div>
            
        </div>
    </div>
  )
}

export default LoginPage