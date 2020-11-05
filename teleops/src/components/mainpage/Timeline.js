import React, {useEffect, useState} from "react"
import {GetConfig} from "../../endpoints"
import moment from "moment"

const Timeline = (props) => {    
    
    const [currentTime, setCurrentTime ] = useState(moment().format("HH:mm"))
    const [initPoll, setInitPoll] = useState(true)

    const [firstWorkIsActive, setFirstWorkIsActive] = useState()
    const [firstBreakIsActive, setFirstBreakIsActive] = useState()
    const [secondWorkIsActive, setSecondWorkIsActive] = useState()
    const [secondBreakIsActive, setSecondBreakIsActive] = useState()
    const [beforeLunchWorkIsActive, setBeforeLunchIsWorkActive] = useState()
    const [lunchBreakIsActive, setLunchBreakIsActive] = useState()
    const [thirdWorkIsActive, setThirdWorkIsActive] = useState()
    const [thirdBreakIsActive, setThirdBreakIsActive] = useState()
    const [lastWorkIsActive, setLastWorkIsActive] = useState()
    
    useEffect(() => {
        console.log(props.timeConfig)
        const pollTime = setInterval(() => {        
            const currentTime = moment().format("HH:mm")
            console.log("Polled To Get Current Time: " + currentTime)
            setCurrentTime(currentTime)
        }, 15000)
        return () => clearInterval(pollTime)
    },[])

    

    useEffect(() => {
        const format = "HH:mm"
        const time = moment(currentTime, format)
        const workStartTime = moment(props.timeConfig.WorkStart.Time, format)
        const firstBreakStart = moment(props.timeConfig.FirstBreakStart.Time, format)
        const firstBreakEnd = moment(props.timeConfig.FirstBreakEnd.Time, format)
        const secondBreakStart = moment(props.timeConfig.SecondBreakStart.Time, format)
        const secondBreakEnd = moment(props.timeConfig.SecondBreakEnd.Time, format)
        const lunchBreakStart = moment(props.timeConfig.LunchBreakStart.Time, format)
        const lunchBreakEnd = moment(props.timeConfig.LunchBreakEnd.Time, format)
        console.log(props.timeConfig.ThirdBreakStart.Time)
        const thirdBreakStart = moment(props.timeConfig.ThirdBreakStart.Time, format)
        const thirdBreakEnd = moment(props.timeConfig.ThirdBreakEnd.Time, format)
        const workEndTime = moment(props.timeConfig.EndOfWork.Time, format)
        /*********************************************************************/
        /** Check First Work Time Active **/
        /*********************************************************************/        
        if(time.isBetween(workStartTime, firstBreakStart)){
            setFirstWorkIsActive(true)
        }else{
            setFirstWorkIsActive(false)
        }
        /*********************************************************************/
        /** Check First Break Time Active **/
        /*********************************************************************/        
        if(time.isBetween(firstBreakStart, firstBreakEnd)){
            setFirstBreakIsActive(true)
        }else{
            setFirstBreakIsActive(false)
        }
        /*********************************************************************/
        /** Check Second Work Time Active **/
        /*********************************************************************/        
        if(time.isBetween(firstBreakEnd, secondBreakStart)){
            setSecondWorkIsActive(true)
        }else{
            setSecondWorkIsActive(false)
        }
        /*********************************************************************/
        /** Check Second Break Time Active **/
        /*********************************************************************/        
        if(time.isBetween(secondBreakStart, secondBreakEnd)){
            setSecondBreakIsActive(true)
        }else{
            setSecondBreakIsActive(false)
        }
        /*********************************************************************/
        /** Check Lunch Work Time Active **/
        /*********************************************************************/        
        if(time.isBetween(secondBreakEnd, lunchBreakStart)){
            setBeforeLunchIsWorkActive(true)
        }else{
            setBeforeLunchIsWorkActive(false)
        }
        /*********************************************************************/
        /** Check Lunch Break Time Active **/
        /*********************************************************************/        
        if(time.isBetween(lunchBreakStart, lunchBreakEnd)){
            setLunchBreakIsActive(true)
        }else{
            setLunchBreakIsActive(false)
        }
        /*********************************************************************/
        /** Check Third Work Time Active **/
        /*********************************************************************/        
        if(time.isBetween(lunchBreakEnd, thirdBreakStart)){
            setThirdWorkIsActive(true)
        }else{
            setThirdWorkIsActive(false)
        }
        /*********************************************************************/
        /** Check Third Break Time Active **/
        /*********************************************************************/
        console.log("Third Break Start: " + thirdBreakStart)
        console.log("Third Break End: " + thirdBreakEnd)
        if(time.isBetween(thirdBreakStart, thirdBreakEnd)){
            setThirdBreakIsActive(true)
        }else{
            setThirdBreakIsActive(false)
        }
        /*********************************************************************/
        /** Check Last Work Time Active **/
        /*********************************************************************/        
        if(time.isBetween(thirdBreakEnd, workEndTime)){
            setLastWorkIsActive(true)
        }else{
            setLastWorkIsActive(false)
        }

    },[currentTime])
    

    return(  
        <React.Fragment>
            <div style={timeLineContainerStyle}>
                {/* {Object.keys(props.timeConfig).map((key) => (
                    <div key={key} style={timeLineEntryStyle}>
                        <div>{props.timeConfig[key].Time.slice(0,5)}</div>
                        <div>{props.timeConfig[key].Name}</div>
                    </div>
                ))} */}
                <div style={timeLineEntryStyle}>
                    <div>Start Work</div>
                    <div>{props.timeConfig.WorkStart.Time.slice(0,5)}</div>
                </div>
                <div style={ firstWorkIsActive ? activeWorkSlot : workTimeSlot}>
                    Work
                </div>
                <div style={timeLineEntryStyle}>
                    <div>First Break Starts</div>
                    <div> {props.timeConfig.FirstBreakStart.Time.slice(0,5)}</div>
                </div>
                <div style={ firstBreakIsActive ? activeBreakSlot : breakTimeSlot}>
                    Break
                </div>
                <div style={timeLineEntryStyle}>
                    <div>First Break Ends</div>
                    <div> {props.timeConfig.FirstBreakEnd.Time.slice(0,5)}</div>
                </div>
                <div style={ secondWorkIsActive ? activeWorkSlot : workTimeSlot}>
                    Work
                </div>
                <div style={timeLineEntryStyle}>
                    <div>Second Break Starts</div>
                    <div> {props.timeConfig.SecondBreakStart.Time.slice(0,5)}</div>
                </div>
                <div style={ secondBreakIsActive ? activeBreakSlot : breakTimeSlot}>
                    Break
                </div>
                <div style={timeLineEntryStyle}>
                    <div>Second Break Ends</div>
                    <div> {props.timeConfig.SecondBreakEnd.Time.slice(0,5)}</div>
                </div>
                <div style={ beforeLunchWorkIsActive ? activeWorkSlot : workTimeSlot}>
                    Work
                </div>
                <div style={timeLineEntryStyle}>
                    <div>Lunch Break Starts</div>
                    <div> {props.timeConfig.LunchBreakStart.Time.slice(0,5)}</div>
                </div>
                <div style={ lunchBreakIsActive ? activeBreakSlot : breakTimeSlot}>
                    Break
                </div>
                <div style={timeLineEntryStyle}>
                    <div>Lunch Break Ends</div>
                    <div> {props.timeConfig.LunchBreakEnd.Time.slice(0,5)}</div>
                </div>
                <div style={ thirdWorkIsActive ? activeWorkSlot : workTimeSlot}>
                    Work
                </div>
                <div style={timeLineEntryStyle}>
                    <div>Third Break Starts</div>
                    <div> {props.timeConfig.ThirdBreakStart.Time.slice(0,5)}</div>                    
                </div>
                <div style={ thirdBreakIsActive ? activeBreakSlot : breakTimeSlot}>                    
                    {thirdBreakIsActive ?
                    <div style={breakMessageStyle}>
                        <div>
                            Have a break have a kitkat!
                        </div>
                        <div>
                            {currentTime}
                        </div>
                    </div>
                    :
                    <div>
                        Break
                    </div>}
                </div>
                <div style={timeLineEntryStyle}>
                    <div>Third Break Ends</div>
                    <div> {props.timeConfig.ThirdBreakEnd.Time.slice(0,5)}</div>
                </div>
                <div style={ lastWorkIsActive ? activeWorkSlot : workTimeSlot}>
                    {lastWorkIsActive ?
                    <div style={workMessageStyle}>
                        <div>Last push till the end of the day</div>
                        <div>{currentTime}</div>
                    </div>                    
                    :
                    <div>
                        Work
                    </div>
                    }
                    
                </div>
                <div style={timeLineEntryStyle}>
                    <div>Work Day Ends</div>
                    <div> {props.timeConfig.EndOfWork.Time.slice(0,5)}</div>
                </div>
            </div>
        </React.Fragment>        
    )
}

export default Timeline

const timeLineEntryStyle = {
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px dashed #c7c7c7",
    borderBottom: "1px dashed #c7c7c7",
    margin: "10px",
    color: "#999"
}

const workTimeSlot = {
    margin: "10px",
    textAlign: "center",
    color: "#999"
}

const activeWorkSlot = {
    margin: "10px",
    padding: "5px 10px 5px 10px",
    textAlign: "center",    
    backgroundColor: "#48c148",
    color: "white",
    borderRadius: "10px"
}

const workMessageStyle = {
    display: "flex",
    justifyContent: "space-between",
}

const breakTimeSlot = {
    margin: "10px",
    textAlign: "center",
    color: "#999"
}

const activeBreakSlot = {
    margin: "10px",
    padding: "5px 10px 5px 10px",
    textAlign: "center",
    backgroundColor: "#0095ff",
    color: "white",
    borderRadius: "10px"
}

const breakMessageStyle = {
    display: "flex",
    justifyContent: "space-between",
}

const timeLineContainerStyle = {
    maxWidth: "500px",
    margin: "0 auto"
}

