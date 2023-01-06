<h1 align="center">How to make an idle timer for your REACT app.</h1>
<em><b>Jump ahead:</b></em>
<br></br>

> <b>Idle Timeout</b>
- <a href="#1">What is an idle Timeout?</a>
- <a href="#2">Why do we need an idle timeout?</a>

> <b>Idle Detection</b>

- <a href="#3">Detecting whether a user is idle.</a>

<h3 id="1">Definition</h3>
<p>An idle timout is a feature implemented in most web applications for user activity detection. 
  In simple terms, it is used to check whether a user has been inactive(away from the app or computer) for a specified amount of time. 
  Often, an action gets executed after the time of inactivity set is exceeded.</p>
<h3 id="2">Why we need an idle Timeout.</h3>
<p>An idle timout can be used for various purposes like logging a user out of the site if the user is inactive, this is crucial for high risk web apps to enhance security of the application. Logging out a user is also important to improve perfomance of the application by avoiding unnecesarry API calls on the site since the user is inactive. Setting an idle timeout is also a great user experience practice because many at times a user might forget the reason for accessing the site, logging the user can help in refreshing the user's memory. Many times instead of directly logging a user out of your application you may want to prompt the user on the next action to be taken, whether to log out of continue useing the site.</p>
<p>An example use case is when you're watching a long series on Netflix, Netflix might ask you if you are still there and you are given an option of cancelling or continuing the series. In this article we're going to learn how to implement an idle timeout in your React applications by checking </p>

<h3 id="3">How to detect if a user is idle in your application</h3>
<p>You can easily have activity detection in your application by installing the <a>react-idle-timer</a> package, but it is important to know some of the functionality the package uses under the hood to make it happen. We will first write the functionality using state that detects the user inactivy using some inbuilt DOM events. </p>

> Using state

<p>We can execute a script that console logs "The user is inactive" if a user does not perform any of the eventListeners on the application's window and console logs "The user is active" if thay the execute any of the eventListeners.</p>

**Read through the comments between the code to understand what each function does before we proceed.**

```jsx
  import React, {useEffect, useState} from "react"
  
  const App = ()=> {
    const [active, setActivity] = useState(true)
    
    const checkForInactivity = ()=> {
    
      const expireTime = localStorage.getItem("expireTime")
      
      if (expireTime < Date.now()) {
        console.log("User is inactive")
        setActivity(false)
      }
    }
    
    const updateExpireTime = ()=> {
      
      const expireTime = Date.now() + 5000
      
      localStorage.setItem("expireTime", expireTime)
    }
    
    useEffect( ()=> {
    
      const interval = setInterval( ()=> {
        checkForInactivity()
      }, 2000)
      
      return ()=> {
        clearInterval(interval)
      }
    }, [])
    
    useEffect( ()=> {
    
      updateExpireTime()
      
      window.addEventListener("click", updateExpireTime)
      window.addEventListener("keypress", updateExpireTime)
      window.addEventListener("scroll", updateExpireTime)
      window.addEventListener("mousemove", updateExpireTime)
      
      return ()=> {
        window.removeEventListener("click", updateExpireTime)
        window.removeEventListener("keypress", updateExpireTime)
        window.removeEventListener("scroll", updateExpireTime)
        window.removeEventListener("mousemove", updateExpireTime)        
      }

    }, [])
    
    return (
      <div>Active : {active.toString()}</div>
    )
  }
```

> Using react-idle-timer package
<p>Using the above method in your React app is not ideal, in replacement of all the hardcoded lines of codes, we can utilize the <a href="https://www.npmjs.com/package/react-idle-timer"><code>react-idle-timer</code></a> package, it only requires a few lines of code and we'll be good to go.</p>
<p></p>

```jsx
  //Install the package in your React app(use npm or yarn)
  $npm install react-idle-timer
              or 
  $yarn add react-idle-timer
  
  
  
  import React, {useRef} from "react"
  //Import the package to your root file
  import IdleTimer from "react-idle-timer"
  
  const IdleTimerComponent = ()=> {
    const IdleTimerRef = useRef(null)
    const onIdle = ()=> {
      console.log("The user is inactive")
    }
    return (
      <div>
        <IdleTimer>
          ref={IdleTimerRef} 
          timeout={2 * 1000} 
          onIdle={onIdle}>
        </IdleTimer>
      </div>
    )
  }
  
  //use the idleTimerComponent in your App component
  const App = ()=> {
    return (
      <div>
        <IdleTimerComponent></IdleTimerComponent>
      </div>
    )
  }
  
```

<p>And that's it, you have an idle timout feature that tells you when a user is inactive on your React web application. The <code>IdleTimer</code> API takes in several props, you can check them out from the package's <a href="https://idletimer.dev/docs/features/idle-detection">documentation</a></p>
