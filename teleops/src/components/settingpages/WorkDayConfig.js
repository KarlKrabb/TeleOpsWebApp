import React, { useEffect, useState } from "react"
import {GetConfig} from "../../endpoints"
import SetupForm from "./SetupForm"


const WorkDayConfig = (props) => {
    const [UserID, setUserID] = useState(sessionStorage.getItem("UserID"))
    const [ConfigID, setConfigID ] = useState(sessionStorage.getItem("ConfigID"))
    const [loading, setLoading] = useState(true)
    const [timeConfig, setTimeConfig] = useState()

    if(!UserID){
        props.history.push("/");
    }

    useEffect(() => {
        GetConfig(ConfigID)
        .then((response) => {
            setTimeConfig(response.data.Response)            
        })        
    },[])

    useEffect(() => {
        if(timeConfig){
            console.log(timeConfig)
            setLoading(false)
        }        
    }, [timeConfig])

    

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }else{
        return(
            <SetupForm 
                timeConfig={timeConfig}
            />        
        )
    }    
}

export default WorkDayConfig




