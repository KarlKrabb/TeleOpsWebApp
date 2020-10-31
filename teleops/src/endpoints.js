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