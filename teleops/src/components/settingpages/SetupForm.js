import React, { useState, useEffect } from "react"
import {SaveConfig} from "../../endpoints"
import moment from "moment"

const SetupForm = (props) => {

    console.log(props.timeConfig)

    const [configID, setConfigID] = useState(sessionStorage.getItem("ConfigID"))
    const [timeOptionsArray, setTimeOptionsArray] = useState(getSelectTimeArray())

    const [workStartTime, setWorkStartTime] = useState(props.timeConfig.WorkStart.Time.slice(0, 5))
    const [firstBreakStartTime, setFirstBreakStartTime] = useState(props.timeConfig.FirstBreakStart.Time.slice(0, 5))
    const [firstBreakEndTime, setFirstBreakEndTime] = useState(props.timeConfig.FirstBreakEnd.Time.slice(0, 5))
    const [secondBreakStartTime, setSecondBreakStartTime] = useState(props.timeConfig.SecondBreakStart.Time.slice(0, 5))
    const [secondBreakEndTime, setSecondBreakEndTime] = useState(props.timeConfig.SecondBreakEnd.Time.slice(0, 5))
    const [lunchStartTime, setLunchStartTime] = useState(props.timeConfig.LunchBreakStart.Time.slice(0, 5))
    const [lunchEndTime, setLunchEndTime] = useState(props.timeConfig.LunchBreakEnd.Time.slice(0, 5))
    const [thirdBreakStartTime, setThirdBreakStartTime] = useState(props.timeConfig.ThirdBreakStart.Time.slice(0, 5))
    const [thirdBreakEndTime, setThirdBreakEndTime] = useState(props.timeConfig.ThirdBreakEnd.Time.slice(0, 5))
    const [workEndTime, setWorkEndTime] = useState(props.timeConfig.EndOfWork.Time.slice(0, 5))

    const workStartIndex = () => { return timeOptionsArray.findIndex(options => options === workStartTime) }
    const firstBreakStartIndex = () => { return timeOptionsArray.findIndex(options => options === firstBreakStartTime) }
    const firstBreakEndIndex = () => { return timeOptionsArray.findIndex(options => options === firstBreakEndTime) }
    const secondBreakStartIndex = () => { return timeOptionsArray.findIndex(options => options === secondBreakStartTime) }
    const secondBreakEndIndex = () => { return timeOptionsArray.findIndex(options => options === secondBreakEndTime) }
    const lunchBreakStartIndex = () => { return timeOptionsArray.findIndex(options => options === lunchStartTime) }
    const lunchBreakEndIndex = () => { return timeOptionsArray.findIndex(options => options === lunchEndTime) }
    const thirdBreakStartIndex = () => { return timeOptionsArray.findIndex(options => options === thirdBreakStartTime) }
    const thirdBreakEndIndex = () => { return timeOptionsArray.findIndex(options => options === thirdBreakEndTime) }
    const workEndIndex = () => { return timeOptionsArray.findIndex(options => options === workEndTime) }

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

    const [firstBreakDuration, setFirstBreakDuration] = useState(timeDifference(firstBreakStartTime, firstBreakEndTime))
    const [secondBreakDuration, setSecondBreakDuration] = useState(timeDifference(secondBreakStartTime, secondBreakEndTime))
    const [lunchBreakDuration, setLunchBreakDuration] = useState(timeDifference(lunchStartTime, lunchEndTime))
    const [thirdBreakDuration, setThirdBreakDuration] = useState(timeDifference(thirdBreakStartTime, thirdBreakEndTime))
    const [workDayDuration, setWorkDayDuration] = useState(timeDifference(workStartTime, workEndTime))



    useEffect(() => {
        console.log(workStartTime)
    }, [])

    useEffect(() => {
        console.log("Triggered")
        updateAllSelectOptions()
        updateAllDurations()
        saveChanges()
    }, [workStartTime, firstBreakStartTime, firstBreakEndTime, secondBreakStartTime, secondBreakEndTime, lunchStartTime, lunchEndTime, thirdBreakStartTime, thirdBreakEndTime, workEndTime])

    const updateAllSelectOptions = () => {
        setWorkStartOptions(timeOptionsArray.slice(0, firstBreakStartIndex()))
        setFirstBreakStartOptions(timeOptionsArray.slice(workStartIndex() + 1, firstBreakEndIndex()))
        setFirstBreakEndOptions(timeOptionsArray.slice(firstBreakStartIndex() + 1, secondBreakStartIndex()))
        setSecondBreakStartOptions(timeOptionsArray.slice(firstBreakEndIndex() + 1, secondBreakEndIndex()))
        setSecondBreakEndOptions(timeOptionsArray.slice(secondBreakStartIndex() + 1, lunchBreakStartIndex()))
        setLunchStartOptions(timeOptionsArray.slice(secondBreakEndIndex() + 1, lunchBreakEndIndex()))
        setLunchEndOptions(timeOptionsArray.slice(lunchBreakStartIndex() + 1, thirdBreakStartIndex()))
        setThirdBreakStartOptions(timeOptionsArray.slice(lunchBreakEndIndex() + 1, thirdBreakEndIndex()))
        setThirdBreakEndOptions(timeOptionsArray.slice(thirdBreakStartIndex() + 1, workEndIndex()))
        setWorkEndOptions(timeOptionsArray.slice(thirdBreakEndIndex() + 1, timeOptionsArray.length))
    }

    const updateAllDurations = () => {
        setFirstBreakDuration(timeDifference(firstBreakStartTime, firstBreakEndTime))
        setSecondBreakDuration(timeDifference(secondBreakStartTime, secondBreakEndTime))
        setLunchBreakDuration(timeDifference(lunchStartTime, lunchEndTime))
        setThirdBreakDuration(timeDifference(thirdBreakStartTime, thirdBreakEndTime))
        setWorkDayDuration(timeDifference(workStartTime, workEndTime))
    }

    const saveChanges = () => {
        SaveConfig(
            configID, 
            workStartTime, 
            firstBreakStartTime, 
            firstBreakEndTime, 
            secondBreakStartTime, 
            secondBreakEndTime, 
            lunchStartTime, 
            lunchEndTime, 
            thirdBreakStartTime, 
            thirdBreakEndTime, 
            workEndTime
        )
    }

    let totalBreaksInMins = 0
    const calcTotalBreakTime = () => {
        const firstBreak = firstBreakDuration && ((firstBreakDuration.label == "hour" || lunchBreakDuration.label == "hours") ? (60 * firstBreakDuration.value) : firstBreakDuration.value)
        console.log(firstBreak)
        const secondBreak = secondBreakDuration && ((secondBreakDuration.label == "hour" || lunchBreakDuration.label == "hours" ) ? (60 * secondBreakDuration.value) : secondBreakDuration.value)
        console.log(secondBreak)
        const lunchBreak = lunchBreakDuration && ((lunchBreakDuration.label == "hour" || lunchBreakDuration.label == "hours") ? (60 * lunchBreakDuration.value) : lunchBreakDuration.value)
        console.log(lunchBreak)
        const thirdBreak = thirdBreakDuration && ((thirdBreakDuration.label == "hour" || lunchBreakDuration.label == "hours") ? (60 * thirdBreakDuration.value) : thirdBreakDuration.value)
        console.log(thirdBreak)
        const total = ((firstBreak + secondBreak + lunchBreak + thirdBreak))

        totalBreaksInMins = total;
        console.log("Total Break Time Mins:" + total)

        let hours = 0;
        let mins = 0;
        let counter = 1;
        for (let i = 0; i < total; i++) {
            if (counter == 60) {
                hours++
                counter = 1;
            }
            counter++
        }
        if (hours > 0) {
            mins = total - (60 * hours)
        }

        const durationObj = {
            hours,
            mins,
            totalMins: total
        }

        return durationObj
    }

    const combinedBreaksDuration = calcTotalBreakTime()

    const calcTotalWorkTime = () => {
        const workDuration = workDayDuration && ((workDayDuration.label == "hours") ? (60 * workDayDuration.value) : workDayDuration.value)

        const total = (workDuration - totalBreaksInMins)

        // console.log(total)

        let hours = 0;
        let mins = 0;
        let counter = 1;
        for (let i = 0; i < total; i++) {
            if (counter == 60) {
                hours++
                counter = 1;
            }
            counter++
        }
        if (hours > 0) {
            mins = total - (60 * hours)
        }

        const durationObj = {
            hours,
            mins,
            totalMins: total
        }

        return durationObj
    }

    const calcTotalWorkTimeWithBreaks = () => {
        const workDuration = workDayDuration && ((workDayDuration.label == "hours") ? (60 * workDayDuration.value) : workDayDuration.value)

        const total = (workDuration)

        console.log(total)

        let hours = 0;
        let mins = 0;
        let counter = 1;

        for (let i = 0; i < total; i++) {
            if (counter == 60) {
                hours++
                counter = 1;
            }
            counter++
        }

        if (hours > 0) {
            mins = total - (60 * hours)
        }

        const durationObj = {
            hours,
            mins,
            totalMins: total
        }

        return durationObj
    }

    const combinedWorkWithBreaksIncluded = calcTotalWorkTimeWithBreaks()
    const combinedWorkDuration = calcTotalWorkTime()

    return (
        <React.Fragment>
            <div style={setupContainerStyles}>
                <div style={statsColumn} >
                    <div style={statsContainerStyles}>
                        <h3>
                            Combined Break Time is
                            {(combinedBreaksDuration.hours > 0) && (` ${combinedBreaksDuration.hours} hours`)}
                            {((combinedBreaksDuration.hours > 0) && (combinedBreaksDuration.mins > 0)) && <span>{" and "}</span>}
                            {(combinedBreaksDuration.mins > 0) && (`${combinedBreaksDuration.mins} mins`)}
                        </h3>
                        <h3>
                            Combined Work Time Is:
                            {(combinedWorkDuration.hours > 0) && (` ${combinedWorkDuration.hours} hours`)}
                            {((combinedWorkDuration.hours > 0) && (combinedWorkDuration.mins > 0)) && <span>{" and "}</span>}
                            {(combinedWorkDuration.mins > 0) && (`${combinedWorkDuration.mins} mins`)}
                        </h3>
                        <h3>
                            Your Work Day Is:
                            {(combinedWorkWithBreaksIncluded.hours > 0) && (` ${combinedWorkWithBreaksIncluded.hours} hours`)}
                            {((combinedWorkWithBreaksIncluded.hours > 0 && combinedWorkWithBreaksIncluded.mins > 0) && <span>{" and "}</span>)}
                            {(combinedWorkWithBreaksIncluded.mins > 0) && (`${combinedWorkWithBreaksIncluded.mins} mins`)}
                        </h3>
                    </div>
                </div>
                <div style={timeSelectColumn}>
                    <div style={timeSelectionContainer}>
                        <div style={timeSelectItem}>
                            <label>Work day start time</label>
                            <select
                                style={selectStyle}
                                value={workStartTime}
                                onChange={(e) => { setWorkStartTime(e.target.value) }}
                            >
                                {workStartOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/*************************************************/}
                        <hr />
                        <div style={timeSelectItem}>
                            <label>First break start time</label>
                            <select
                                style={selectStyle}
                                value={firstBreakStartTime}
                                onChange={(e) => { setFirstBreakStartTime(e.target.value) }}
                            >
                                {firstBreakStartOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={timeSelectItem}>
                            <label>First break end time</label>
                            <select
                                style={selectStyle}
                                value={firstBreakEndTime}
                                onChange={(e) => { setFirstBreakEndTime(e.target.value) }}
                            >
                                {firstBreakEndOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {firstBreakDuration &&
                            <div style={timeSelectItem}>
                                <p>Break duration: {`${firstBreakDuration.value} - ${firstBreakDuration.label}`}</p>
                            </div>}
                        <hr />
                        {/*************************************************/}
                        <div style={timeSelectItem}>
                            <label>Second break start time</label>
                            <select
                                style={selectStyle}
                                value={secondBreakStartTime}
                                onChange={(e) => { setSecondBreakStartTime(e.target.value) }}
                            >
                                {secondBreakStartOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={timeSelectItem}>
                            <label>Second break end time</label>
                            <select
                                style={selectStyle}
                                value={secondBreakEndTime}
                                onChange={(e) => { setSecondBreakEndTime(e.target.value) }}
                            >
                                {secondBreakEndOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {secondBreakDuration &&
                            <div style={timeSelectItem}>
                                <p>Break duration: {`${secondBreakDuration.value} - ${secondBreakDuration.label}`}</p>
                            </div>}
                        <hr />
                        {/*************************************************/}
                        <div style={timeSelectItem}>
                            <label>Lunch break start time</label>
                            <select
                                style={selectStyle}
                                value={lunchStartTime}
                                onChange={(e) => { setLunchStartTime(e.target.value) }}
                            >
                                {lunchStartOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={timeSelectItem}>
                            <label>Lunch break end time</label>
                            <select
                                style={selectStyle}
                                value={lunchEndTime}
                                onChange={(e) => { setLunchEndTime(e.target.value) }}
                            >
                                {lunchEndOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {lunchBreakDuration &&
                            <div style={timeSelectItem}>
                                <p>Break duration: {`${lunchBreakDuration.value} - ${lunchBreakDuration.label}`}</p>
                            </div>}
                        <hr />
                        {/*************************************************/}
                        <div style={timeSelectItem}>
                            <label>Third break start time</label>
                            <select
                                style={selectStyle}
                                value={thirdBreakStartTime}
                                onChange={(e) => { setThirdBreakStartTime(e.target.value) }}
                            >
                                {thirdBreakStartOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={timeSelectItem}>
                            <label>Third break end time</label>
                            <select
                                style={selectStyle}
                                value={thirdBreakEndTime}
                                onChange={(e) => { setThirdBreakEndTime(e.target.value) }}
                            >
                                {thirdBreakEndOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {thirdBreakDuration &&
                            <div style={timeSelectItem}>
                                <p>Break duration: {`${thirdBreakDuration.value} - ${thirdBreakDuration.label}`}</p>
                            </div>}
                        <hr />
                        {/*************************************************/}
                        <div style={timeSelectItem}>
                            <label>Work end time</label>
                            <select
                                style={selectStyle}
                                value={workEndTime}
                                onChange={(e) => { setWorkEndTime(e.target.value) }}
                            >
                                {workEndOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default SetupForm

const selectStyle = {
    width: "100px",
    padding: "10px"
}

const timeSelectionContainer = {
    // width: "400px",
    // margin: "0 auto"
    padding: "20px",
    borderLeft: "3px solid grey"
}

const timeSelectItem = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px"
}

const setupContainerStyles = {
    display: "grid",
    // gridTemplateColumns: "1fr 1fr",
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    marginTop: "10px"
}

const statsColumn = {
    // backgroundColor: "blue"
    borderLeft: "3px solid grey"
}

const timeSelectColumn = {

}

const statsContainerStyles = {
    padding: "20px"
}


const timeDifference = (from, to) => {
    // console.log("from: " + from + " - to: " + to)

    let startTime = moment(`${from}:00`, "HH:mm:ss")
    let endTime = moment(`${to}:00`, "HH:mm:ss")

    let duration = moment.duration(endTime.diff(startTime))

    const hours = parseInt(duration.asHours())
    // console.log("Duration in hours: " + hours)
    const mins = parseInt(duration.asMinutes())
    // console.log("Duration in mins: " + mins)

    let timeDisplayObj = {}

    if (mins == 60) {
        timeDisplayObj = {
            label: (hours > 1) ? "hours" : "hour",
            value: hours
        }
    } else {
        timeDisplayObj = {
            label: "mins",
            value: mins
        }
    }

    console.log(timeDisplayObj)
    return timeDisplayObj
}

const getSelectTimeArray = () => {
    //There needs to be 96 time intervals in total
    const intervalCount = 24
    let optionsArray = []
    let hourCounter = 0
    for (let i = 0; i < intervalCount; i++) {
        const quarterCount = 4
        //set the hours
        let hour = ""
        if (hourCounter < 10) {
            hour = "0" + hourCounter + ":"
        } else if (hourCounter >= 10) {
            hour = hourCounter + ":"
        }

        for (let q = 0; q < quarterCount; q++) {
            switch (q) {
                case 0:
                    optionsArray.push(hour + "00")
                    break;
                case 1:
                    optionsArray.push(hour + "15")
                    break;
                case 2:
                    optionsArray.push(hour + "30")
                    break;
                case 3:
                    optionsArray.push(hour + "45")
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