import React, { useEffect, useState } from "react"
import {inputStyles, errorTexyStyle} from "./styles"

const Email = (props) => {

    const [value, setValue] = useState("")
    const [valid, setValid] = useState(false)

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        console.log(value)
        if (value != "") {
            const regexTest = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)
            console.log(regexTest)
            if(regexTest){
                setValid(true)
            }else{
                setValid(false)
            }
        }
        props.updateParentObj({value:value, isValid: valid})
    },[value])

    return(
        <React.Fragment>            
                <input
                    placeholder="Email"
                    type="text"
                    value={value}
                    onChange={(e) => {handleChange(e)}}
                    autoComplete="email"
                    style={inputStyles}
                />
                {(!valid && value != "") && <div style={errorTexyStyle}>Enter Valid Email</div>}
        </React.Fragment>
    )            
}

export default Email