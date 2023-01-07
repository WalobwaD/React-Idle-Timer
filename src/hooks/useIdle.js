import {useState} from "react"
import { useIdleTimer } from "react-idle-timer"

function useIdle({onIdle, idleTime=1}){

    const [ isIdle, setIdle ] = useState()

    const handleIdle = ()=> {
        console.log("User is idle")
        console.log("Last Active", getLastActiveTime())
        setIdle(true)
        onIdle()
    }

    const {getLastActiveTime} = useIdleTimer({
        timeout: 1000 * idleTime ,
        onIdle: handleIdle,
        debounce: 500
    })

    return {
        isIdle,
        setIdle
    }


}

export default useIdle;