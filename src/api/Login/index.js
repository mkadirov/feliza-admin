import axios from 'axios'
const baseURL = 'https://felizabackend.uz/api/auth/loginUser'


const loginUser = async(userDetailes)=> {
    try {
        const res = await axios.post(baseURL, userDetailes);
        if(res.status == 200) {
            const token = res.data.accessToken;
            console.log(token);
            localStorage.setItem('userToken', token);
            return {success: true, data: res.data, message: res.message}
        } else if (res.status == 401 || res.status == 409){
            console.log('Login yoki parol xato terildi');
            return {success: false, message: 'Login yoki parol xato terildi'}  
        } else {
            return {success: false, message: res.message}
        }
    } catch (error) {
        return {success: false, message: error.message}
    }
}

export {loginUser}