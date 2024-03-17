import PropTypes from 'prop-types'
import React, { useEffect,useState } from 'react'
// import { Prompt } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


const LeavePageBlocker = (message="are you sure") => {
 const [leavePage,setLeavePage]=useState(false)

    useEffect(() => {
        window.onbeforeunload = leavePage&&(()=>message)

        return()=>{
            window.onbeforeunload =null
        }
    }, [leavePage])

    // const routerPrompt =  <Prompt when={leavePage} message={message}/>
    
    // return [routerPrompt, () => setLeavePage(true), () => setLeavePage(false)]


}



export default LeavePageBlocker