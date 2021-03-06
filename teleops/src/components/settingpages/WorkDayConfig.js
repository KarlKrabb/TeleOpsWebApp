import React, { useEffect, useState } from "react"
import {GetConfig} from "../../endpoints"
import SetupForm from "./SetupForm"


const WorkDayConfig = (props) => {
    
    const [ConfigID, setConfigID ] = useState(sessionStorage.getItem("ConfigID"))
    const [loading, setLoading] = useState(true)
    const [timeConfig, setTimeConfig] = useState()    

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




