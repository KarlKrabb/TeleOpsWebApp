import React, {useEffect, useState} from "react"
import {GetConfig} from "../../endpoints"

const Timeline = (props) => {

    const [UserID, setUserID] = useState(sessionStorage.getItem("UserID"))
    const [ConfigID, setConfigID ] = useState(sessionStorage.getItem("ConfigID"))
    const [UserStatus, setUserStatus] = useState(sessionStorage.getItem("UserStatus"))
    const [loading, setLoading] = useState(true)

    if(!UserID){
        props.history.push("/");
    }
    
    useEffect(() => {
        GetConfig(ConfigID)
        .then((response) => {
            setLoading(false)
            console.log(response)
        })
    })

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    return(  
        <React.Fragment>            
            <div>
                Timeline
            </div>            
        </React.Fragment>        
    )
}

export default Timeline