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
<p>You can easily have activity detection in your application by installing the <a>react-idle-timer</a> package, but it is important to know some of the functionality the package uses under the hood to make it happen. Since react is a javascript library, we will write a simple functionality to detect the users activity on the web application that indicated whether the user is active or not. </p>

> Using vanilla javascript

<p>We can execute a script that console logs "The user is inactive" if a user does not perform any of the eventListeners on the application's window and console logs "The user is active" if thay the execute any of the eventListeners.</p>

**Read through the comments between the code to understand what each function does before we proceed.**

```jsx
  //variable that's supposed to store the time needed for the timeout functionality, initially set to undefined.
  let timeout;
 
 
  /**
  The setup function here is used to initialize the event listeners to be listened to inorder to determine whether a user is inactive or not
  The eventListeners execute the resetTimer functions that resets the timout set to zero every time an event is listened to
  The events are explained line by line above them
  */
function setup() {
    //mousemove, fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it.
    this.addEventListener("mousemove", resetTimer, false);
    
    //mousedown, when a user directs the mouser's pointer downwards
    this.addEventListener("mousedown", resetTimer, false);
    
    //keypress, when a user presses on any key 
    this.addEventListener("keypress", resetTimer, false);
    
    //wheel, event fires when the user rotates a wheel button on a pointing device (typically a mouse).
    this.addEventListener("wheel", resetTimer, false);
    
    //touchmove, fired when one or more touch points are moved along the touch surface.
    this.addEventListener("touchmove", resetTimer, false);
    
    startTimer();
}
//initalizes the setup function to be executed
setup();
 
function startTimer() {
    // wait 2 seconds before calling goInactive
    timeoutID = window.setTimeout(goInactive, 2000);
}
 
function resetTimer(e) {
    //the reset timer function clears the timer and initializes the goActive function
    window.clearTimeout(timeout);
 
    goActive();
}
 
function goInactive() {
    //This function is to be executed when a user is inactive, Open the window's console and see the printed statement
    console.log("The user is inactive")
}
 
function goActive() {
    //This function is to be executed when a user is active, Open the window's console and see the printed statement. 
    //Initializes the timer to start counting
    console.log("The user is active")
    startTimer();
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
