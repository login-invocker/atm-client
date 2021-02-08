const axios = require('axios')
const  config = require('../config/config')
const helper = require('../helper')

const recharge = async (data) => {
    const bankkerEmail  = helper.getCookie("emailUser")
    const bankerRole  = helper.getCookie("roleUser")
    const bankerPassword  = helper.getCookie("passwordUser")

    
    const rechargeRequest = {
        "banker": {
            "email": bankkerEmail,
            "role": bankerRole,
            "password": bankerPassword
        },
        "user": {
             "email": data.email,
            "password": data.password
        },
        "amount": data.amount
    }
    try{
        const responseData = await axios.post(`${config.API_URL}/api/transaction/recharge`, rechargeRequest);
        if(responseData.status === 200){
            return true
        }
    }catch{
        return false
    }
    
}

const transferee = async (data) => {
    
    const dataRequest = {
        "transferee": {
            "email": data.emailTransferee,
        },
        "user": {
             "email":  data.email,
            "password": data.password,
            "pin": data.pin
        },
        "amount": data.amount,
        "content": data.content
    }

    try{
        const responseData = await axios.post(`${config.API_URL}/api/transaction/transfers`, dataRequest);
        if(responseData.status === 200){
            return true
        }
    }catch{
        return false
    }
}

const withdrawall = async (data) => {
    const dataRequest = {
        "user": {
            "email": data.email,
            "pin": data.pin,
            "password": data.password
        },
        "amount": data.amount
    }
    try{
        const responseData = await axios.post(`${config.API_URL}/api/transaction/withdrawal`, dataRequest);
        if(responseData.status === 200){
            return true
        }
    }catch{
        return false
    }
    
}

const Balance = async () => {
    const userEmail  = helper.getCookie("emailUser")
    const userPassword  = helper.getCookie("passwordUser")
    const userPin  = helper.getCookie("pinUser")

    const dataRequest = {
            "email": userEmail,
            "pin": userPin,
            "password": userPassword
    }
    console.log(dataRequest)
    try{
        const responseData = await axios.post(`${config.API_URL}/api/transaction/balance-inquiry`, dataRequest);
        if(responseData.status === 200){
            return responseData.data
        }
    }catch{
        return false
    }
} 
module.exports = {
    recharge,
    withdrawall,
    transferee,
    Balance
}