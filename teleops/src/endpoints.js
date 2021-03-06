import axios from "axios"

const env = "dev"
// const env = "prod"

const devAPIURL = "http://localhost:8888"
const prodAPIURL = "http://localhost:8888"

const APIURL = (env === "dev" ) ? devAPIURL : prodAPIURL

export const UserAuth = async (username,password) => {
    const bodyData = {
        username,
        password
    }
    const promise = new Promise((resolve, reject) => {
        axios({            
            url:  `${APIURL}/userauth`,
            method: "POST",
            data: bodyData,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            // console.log(response)
            resolve(response)
        })
        .catch(errorResponse => {
            console.error(errorResponse)
            reject(errorResponse)
        })
    })
    return promise
}

export const AddUser = async (name, surname, email, password) => {
    const bodyData = {
        name,
        surname,
        email,
        password
    }
    const promise = new Promise((resolve, reject) => {
        axios({            
            url:  `${APIURL}/adduser`,
            method: "POST",
            data: bodyData,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            // console.log(response)
            resolve(response)
        })
        .catch(errorResponse => {
            console.error(errorResponse)
            reject(errorResponse)
        })
    })
    return promise
}

export const GetConfig = async (configID) => {
    const bodyData = {
        configID
    }
    const promise = new Promise((resolve, reject) => {
        axios({            
            url:  `${APIURL}/getconfig`,
            method: "POST",
            data: bodyData,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            // console.log(response)
            resolve(response)
        })
        .catch(errorResponse => {
            console.error(errorResponse)
            reject(errorResponse)
        })
    })
    return promise
}

export const SaveConfig = (configID, workStart, firstBreakStart, firstBreakEnd, secondBreakStart, secondBreakEnd, lunchBreakStart, lunchBreakEnd, thirdBreakStart, thirdBreakEnd, workEnd) => {
    
    const bodyData = {
        configID,
        workStart,
        firstBreakStart,
        firstBreakEnd,
        secondBreakStart,
        secondBreakEnd,
        lunchBreakStart,
        lunchBreakEnd,
        thirdBreakStart,
        thirdBreakEnd,
        workEnd
    }
    const promise = new Promise((resolve, reject) => {
        axios({            
            url:  `${APIURL}/updateconfig`,
            method: "POST",
            data: bodyData,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            // console.log(response)
            resolve(response)
        })
        .catch(errorResponse => {
            console.error(errorResponse)
            reject(errorResponse)
        })
    })
    return promise
}