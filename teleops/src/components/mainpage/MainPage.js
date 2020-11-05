import React, {useState, useEffect} from "react"
import {GetConfig} from "../../endpoints"
import Timeline from "./Timeline"

const MainPage = () => {

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
    } else {
        return(
            <div>
                <Timeline  
                    timeConfig={timeConfig}
                />
            </div>
        )
    }
}

export default MainPage