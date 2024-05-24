import axios from 'axios'

const apiUrl = 'https://felizabackend.uz/api/sms/'

const addSMS = async (sms) => {
    try {
        const token = localStorage.getItem('userToken');
        console.log(token);
        const res = await axios.post(apiUrl + 'add', sms, {
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        console.log(res);
        if(res.status == 200) {
            return {success: true, data: res.data}
        } else {
            return {success: false}
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getAllSmsTemplateNames = async() => {
    try {
        const res = await axios.get(apiUrl + 'enums/smsNames')
        if(res.status == 200) {
          return {success: true, data: res.data}
        } else {
          return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

const getAllSms = async() => {
    try {
        const res = await axios.get(apiUrl + 'getAll')
        if(res.status == 200) {
          return {success: true, data: res.data}
        } else {
          return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

const editSms = async(tempSmsName, textBody) => {

    const token = localStorage.getItem('userToken');
    console.log(token);
    
    try {
        const res = await axios.put(apiUrl + 'edit/' + tempSmsName,  textBody, {
            headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
           },
         })

        if(res.status == 200) {
            return { success: true, data: res.data}
        } else {
            return { success: false}
        }
    } catch (error) {
        return { success: false}
    }
}



export {addSMS, getAllSmsTemplateNames, getAllSms, editSms}