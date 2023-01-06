import { useState } from "react";
import useIdle  from "./useIdle";
import Modal from "react-modal"
Modal.setAppElement("#root")

const App = ()=> {

  const modalOpen= ()=> {
    setModal(true)
    console.log("User is logged out")
  }


  const [openModal, setModal] = useState()
  const {isIdle, setIdle} = useIdle({onIdle:modalOpen, idleTime:5})

  const stay = ()=> {
    setModal(false)
    setIdle(!isIdle)
  }
  const logout = ()=> {
    setModal(false)
  }

  return (
    <div>
      {isIdle? <p>You were logged out</p> : <p>You are active rn</p>}
      <Modal
        style={{
          content: {
            backgroundColor : "gray",
            display : "flex",
            alignItems : "center",
            flexDirection : "column",
            justifyContent  :"space-between",
            width : "200px",
            height : "200px"

          }
        }} 
        isOpen={openModal}>
        <p>You will be logged out soon</p>
        <div>
          <button onClick={logout}>Logout</button>
          <button onClick={stay}>Stay</button>
        </div>


      </Modal>
    </div>
  )
}

export default App;








// import React, {useEffect, useState} from "react"
  
// const App = ()=> {
//   const [active, setActivity] = useState(true)
  
//   const checkForInactivity = ()=> {
  
//     const expireTime = localStorage.getItem("expireTime")
    
//     if (expireTime < Date.now()) {
//       console.log("User is inactive")
//       setActivity(false)
//     }
//   }
  
//   const updateExpireTime = ()=> {
    
//     const expireTime = Date.now() + 5000
    
//     localStorage.setItem("expireTime", expireTime.toString())

//   }
  
//   useEffect( ()=> {
  
//     const interval = setInterval( ()=> {
//       checkForInactivity()
//     }, 1000)
    
//     return ()=> clearInterval(interval)
//   }, [])
  
//   useEffect( ()=> {
  
//     updateExpireTime()
    
//     window.addEventListener("click", updateExpireTime)
//     window.addEventListener("keypress", updateExpireTime)
//     window.addEventListener("scroll", updateExpireTime)
//     window.addEventListener("mousemove", updateExpireTime)
    
//     return ()=> {
//       window.removeEventListener("click", updateExpireTime)
//       window.removeEventListener("keypress", updateExpireTime)
//       window.removeEventListener("scroll", updateExpireTime)
//       window.removeEventListener("mousemove", updateExpireTime)        
//     }

//   }, [])
  
//   return (
//     <div>Active : {active.toString()}</div>
//   )
// }

// export default App;



 