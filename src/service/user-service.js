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
        const userResponse = responseData.data

        helper.setCookie("idUser", userResponse.id, 7)
        helper.setCookie("emailUser", userResponse.email, 7)
        helper.setCookie("pinUser", userResponse.pin, 7)
        helper.setCookie("passwordUser", userResponse.password, 7)
        helper.setCookie("roleUser", userResponse.roles, 7)
        return true
    }
}catch{
    return false
}
  
}

const listUser = async () => {
   try{
    const responseData = await axios.get(`${config.API_URL}/api/admin/user`);
    if(responseData.status === 200){
        const listUserResponse = responseData.data
        return listUserResponse
    }
}catch{
    return false
}
  
}

const upDateUser = async (user) => {
    const pinString = user.pin.toString()
    const dataReq = {
        "id": user.id,
        "fullName": user.fullName,
        "email": user.email,
        "roles": user.roles,
        "password": user.password,
        "pin": pinString
        }

        console.log(dataReq)
        try{
            const responseData = await axios.put(`${config.API_URL}/api/admin/user`, dataReq);
            console.log(responseData)
            if(responseData.status === 200){
                return true
            }
        }catch{
            return false
        }
          
}
module.exports = {
    register,
    login,
    listUser,
    upDateUser
}