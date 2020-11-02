import React, { useEffect, useState } from "react"
import {GetConfig} from "../../endpoints"

const WorkDayConfig = (props) => {
    const [UserID, setUserID] = useState(sessionStorage.getItem("UserID"))
    const [ConfigID, setConfigID ] = useState(sessionStorage.getItem("ConfigID"))
    const [loading, setLoading] = useState(true)
    const [timeConfig, setTimeConfig] = useState({})

    const [timeOptionsArray, setTimeOptionsArray] = useState(getSelectTimeArray())

    const [workStartOptions, setWorkStartOptions] = useState([])
    const [firstBreakStartOptions, setFirstBreakStartOptions] = useState([])
    const [firstBreakEndOptions, setFirstBreakEndOptions] = useState([])
    const [secondBreakStartOptions, setSecondBreakStartOptions] = useState([])
    const [secondBreakEndOptions, setSecondBreakEndOptions] = useState([])
    const [lunchStartOptions, setLunchStartOptions] = useState([])
    const [lunchEndOptions, setLunchEndOptions] = useState([])
    const [thirdBreakStartOptions, setThirdBreakStartOptions] = useState([])
    const [thirdBreakEndOptions, setThirdBreakEndOptions] = useState([])
    const [workEndOptions, setWorkEndOptions] = useState([])

    const [workStartTime, setWorkStartTime] = useState()
    const [firstBreakStartTime, setFirstBreakStartTime] = useState()
    const [firstBreakEndTime, setFirstBreakEndTime] = useState()
    const [secondBreakStartTime, setSecondBreakStartTime] = useState()
    const [secondBreakEndTime, setSecondBreakEndTime] = useState()
    const [lunchStartTime, setLunchStartTime] = useState()
    const [lunchEndTime, setLunchEndTime] = useState()
    const [thirdBreakStartTime, setThirdBreakStartTime] = useState()
    const [thirdBreakEndTime, setThirdBreakEndTime] = useState()
    const [workEndTime, setWorkEndTime] = useState()
    

    if(!UserID){
        props.history.push("/");
    }

    useEffect(() => {
        if(Object.keys(timeConfig).length <= 0){
            GetConfig(ConfigID)
            .then((response) => {
                setTimeConfig(response.data.Response)
                setLoading(false)
                // console.log(response.data.Response)                
            })
            .then(()=>{
                
            })
        }else{
            FormatTimes()
        }
    }, [timeConfig])    

    useEffect(() => {
        console.log(workStartOptions)
    }, [workStartOptions])

    useEffect(() => {
        console.log(firstBreakStartOptions)
    }, [firstBreakStartOptions])
    
    useEffect(() => {
        console.log(firstBreakEndOptions)
    }, [firstBreakEndOptions])
    
    useEffect(() => {
        console.log(secondBreakStartOptions)
    }, [secondBreakStartOptions])
    
    useEffect(() => {
        console.log(secondBreakEndOptions)
    }, [secondBreakEndOptions])
    
    useEffect(() => {
        console.log(lunchStartOptions)
    }, [lunchStartOptions])

    const FormatTimes = () => {
        const {WorkStart, FirstBreakStart, FirstBreakEnd, SecondBreakStart, SecondBreakEnd, LunchBreakStart, LunchBreakEnd, ThirdBreakStart, ThirdBreakEnd, EndOfWork} = timeConfig        
        
        setWorkStartTime(WorkStart.Time.slice(0,5))
        setFirstBreakStartTime(FirstBreakStart.Time.slice(0,5))
        setFirstBreakEndTime(FirstBreakEnd.Time.slice(0,5))
        setSecondBreakStartTime(SecondBreakStart.Time.slice(0,5))
        setSecondBreakEndTime(SecondBreakEnd.Time.slice(0,5))
        setLunchStartTime(LunchBreakStart.Time.slice(0,5))
        setLunchEndTime(LunchBreakEnd.Time.slice(0,5))
        setThirdBreakStartTime(ThirdBreakStart.Time.slice(0,5))
        setThirdBreakEndTime(ThirdBreakEnd.Time.slice(0,5))
        setWorkEndTime(EndOfWork.Time.slice(0,5))

    }

    useEffect(() => {
        console.log("Work Start: " + workStartTime)
        const workStartIndex = timeOptionsArray.findIndex(options => options === workStartTime)
        const firstBreakStartIndex = timeOptionsArray.findIndex(options => options === firstBreakStartTime)
        setWorkStartOptions(timeOptionsArray.slice(0, firstBreakStartIndex))
    },[workStartTime])

    useEffect(() => {
        console.log("Work Start: " + firstBreakStartTime)
        const workStartIndex = timeOptionsArray.findIndex(options => options === workStartTime)
        const firstBreakEndIndex = timeOptionsArray.findIndex(options => options === firstBreakEndTime)
        setFirstBreakStartOptions(timeOptionsArray.slice(workStartIndex, firstBreakEndIndex))
    },[firstBreakStartTime])

    useEffect(() => {
        console.log("Work Start: " + firstBreakEndTime)
        const firstBreakStartIndex = timeOptionsArray.findIndex(options => options === firstBreakStartTime)
        const secondBreakStartIndex = timeOptionsArray.findIndex(options => options === secondBreakStartTime)
        setFirstBreakEndOptions(timeOptionsArray.slice(firstBreakStartIndex, secondBreakStartIndex))
    },[firstBreakEndTime])

    useEffect(() => {
        console.log("Work Start: " + secondBreakStartTime)
        const firstBreakEndIndex = timeOptionsArray.findIndex(options => options === firstBreakEndTime)
        const secondBreakEndIndex = timeOptionsArray.findIndex(options => options === secondBreakEndTime)
        setSecondBreakStartOptions(timeOptionsArray.slice(firstBreakEndIndex, secondBreakEndIndex))
    },[secondBreakStartTime])

    useEffect(() => {
        console.log("Work Start: " + secondBreakEndTime)
        const secondBreakStartIndex = timeOptionsArray.findIndex(options => options === secondBreakStartTime)
        const lunchBreakStartIndex = timeOptionsArray.findIndex(options => options === lunchStartTime)
        setSecondBreakEndOptions(timeOptionsArray.slice(secondBreakStartIndex,lunchBreakStartIndex))
    },[secondBreakEndTime])

    useEffect(() => {
        console.log("Work Start: " + lunchStartTime)
        const secondBreakEndIndex = timeOptionsArray.findIndex(options => options === secondBreakEndTime)
        const lunchBreakEndIndex = timeOptionsArray.findIndex(options => options === lunchEndTime)
        setLunchStartOptions(timeOptionsArray.slice(secondBreakEndIndex, lunchBreakEndIndex))
    },[lunchStartTime])

    useEffect(() => {
        console.log("Work Start: " + lunchEndTime)
        setLunchEndOptions(timeOptionsArray.slice())
    },[lunchEndTime])

    useEffect(() => {
        console.log("Work Start: " + thirdBreakStartTime)
    },[thirdBreakStartTime])

    useEffect(() => {
        console.log("Work Start: " + thirdBreakEndTime)
    },[thirdBreakEndTime])
    
    useEffect(() => {
        console.log("Work Start: " + workEndTime)
    },[workEndTime])


    const SortTimeOptions = () => {
        const timeOptionsArray = getSelectTimeArray()
        const workStartIndex = timeOptionsArray.findIndex(options => options === workStartTime)
        console.log(firstBreakStartTime)
        const firstBreakStartIndex = timeOptionsArray.findIndex(options => options === firstBreakStartTime)
        console.log(firstBreakStartIndex)
        const firstBreakEndIndex = timeOptionsArray.findIndex(options => options === firstBreakEndTime)
        const secondBreakStartIndex = timeOptionsArray.findIndex(options => options === secondBreakStartTime)
        const secondBreakEndIndex = timeOptionsArray.findIndex(options => options === secondBreakEndTime)
        const lunchBreakStartIndex = timeOptionsArray.findIndex(options => options === lunchStartTime)
        const lunchBreakEndIndex = timeOptionsArray.findIndex(options => options === lunchEndTime)
        const thirdBreakStartIndex = timeOptionsArray.findIndex(options => options === thirdBreakStartTime)
        const thirdBreakEndIndex = timeOptionsArray.findIndex(options => options === thirdBreakEndTime)
        const workEndIndex = timeOptionsArray.findIndex(options => options === workEndTime)

        
        
        
    }

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    return(
        <div>
            {Object.keys(timeConfig).map((keyValue) => (
                <div key={keyValue}>
                    <label>{timeConfig[keyValue].Name}</label>
                    <select
                        value={timeConfig[keyValue].Time}
                    >

                    </select>
                </div>
            ))

            }
        </div>
    )
}

export default WorkDayConfig

const getSelectTimeArray = () => {
    //There needs to be 96 time intervals in total
    const intervalCount = 24
    let optionsArray = []
    let hourCounter = 0
    for (let i = 0; i < intervalCount; i++) {
        const quarterCount = 4
        //set the hours
        let hour = ""
        if(hourCounter < 10){
            hour = "0"+hourCounter+":"
        }else if(hourCounter >= 10){
            hour = hourCounter+":"
        }
        
        for (let q = 0; q < quarterCount; q++) {            
            switch (q) {
                case 0:
                    optionsArray.push(hour+"00")
                    break;
                case 1:
                    optionsArray.push(hour+"15")
                    break;
                case 2:
                    optionsArray.push(hour+"30")
                    break;
                case 3:
                    optionsArray.push(hour+"45")
                    break;
                default:
                    break;
            }
        }
        hourCounter++
    }
    // console.log(optionsArray)
    return optionsArray
}

