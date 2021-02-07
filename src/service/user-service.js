const axios = require('axios')
const  config = require('../config/config')
const helper = require('../helper')
const register = async (data) => {
    const user = data.user
    const userRequest = {
        "fullName": user.fullName,
        "email": user.email,
        "password": user.password,
        "phoneNumber": user.phoneNumber
    }
   
    const responseData = await axios.post(`${config.API_URL}/api/user/register`, userRequest);
    return responseData.status === 200;
    
}

const login = async (user) => {

    const userRequest = {
        "email": user.email,
        "password": user.password
    }
   try{
    const responseData = await axios.post(`${config.API_URL}/api/user/login`, userRequest);
    if(responseData.status === 200){
        helper.setCookie("user", responseData.data, 7)
        return true
    }
}catch{
    return false
}
  
}
module.exports = {
    register,
    login
}