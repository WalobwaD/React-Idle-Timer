# How to make an idle timer for your React app
One way to add another layer of security to your web application is to use an idle timer. An idle timer is used to check whether a user has been inactive for a specified duration and then sign them out. 

When building websites that share highly confidential user information, the platform’s security is a major concern. As a developer, you need to guard the end user against intruders. Implementing an idle session timeout to sign a user out of their current session is one way to enhance the platform’s security. 

With applications that constantly make API calls, for example, every 30 seconds, it is necessary to implement an idle timeout to improve the app's performance. This logs the user out when idle hence preventing unnecessary backend requests. 

In this article, we’ll learn how to implement an idle timeout in your React application. We’ll use the [`react-idle-timer`](https://www.npmjs.com/package/react-idle-timer) package to detect and respond to the user’s idleness. 


## Idle Detection

The DOM API provides mouse and keyboard events that can be used for idle detection. The `react-idle-timer` package makes use of the following events to detect user activity: 

-  `mousemove` - fired when a pointing device is moved.
-   `keydown` - fired when a key is pressed.
-   `wheel` - fired when the wheel of a pointing device is rotated
-   `mousedown` - fired at an element when a pointing device button is pressed.
-   `touchstart` - fired when one or more touch points are placed on the touch surface
-   `touchmove` - fired when one or more touch points are moved along the touch surface.
-   `visibilitychange` - fired at the document when the contents of its tab have become visible or have been hidden.
-   `MSPointerDown` - fired when a pointer becomes active.
-   `MSPointerMove` - fired when a pointer changes coordinates.
-   `DOMMouseScroll` - a deprecated event
-   `mousewheel` - a deprecated event

The `react-idle-timer` package binds all these events to a DOM element by adding an event listener for each. User idleness is then toggled based on the last time the bound events were triggered. 


## Getting started

In your terminal, create a new react application and start the development server using the commands below:

    npx create-react-app idle-timer-react
    cd idle-timer-react
    yarn start

Then open the react application in your favorite code editor. 

You will create a simple web application with  `HomePage` and `Login` pages as shown below. 

![Login page](https://paper-attachments.dropboxusercontent.com/s_326D89A5993CA77873F7C62891588C8C7E6BA8D2B79CDBC62F5AF51FCF6BC992_1673266742721_Screenshot+2023-01-09+at+15.18.32+2.png)

![Home Page](https://paper-attachments.dropboxusercontent.com/s_326D89A5993CA77873F7C62891588C8C7E6BA8D2B79CDBC62F5AF51FCF6BC992_1673254112553_Screenshot+2023-01-09+at+11.47.54+2.png)


The `App.js` file displays the home page and log-in page based on the authentication status. 


    
    import Login from "./components/Login";
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { useState } from "react"
    import AuthContext from "./context/AuthContext"
    import NavigationBar from './components/NavigationBar'
    import HomePage from './components/Homepage'
    
    const App = () => {
      const [authstatus, setauthstatus] = useState(false);
      const login = () => {
        setauthstatus(true);
      };
      const logout = () => {
        setauthstatus(false);
      };
      return (
        <AuthContext.Provider value={{ status: authstatus, login: login, logout: logout }}>
          {authstatus ? <>
            <NavigationBar />
            <HomePage />
          </> : <Login />}
        </AuthContext.Provider>
      )
    }
    export default App;

The `HomePage` contains a displayed text and a modal that will be displayed when the user is idle. 


    const HomePage = () => {
        const [openModal, setOpenModal] = useState(false)
        const { logout } = useContext(AuthContext);
        const handleIdle = () => {
            setOpenModal(true);
        }
        const stay = () => {
            setOpenModal(false)
        }
        const handleLogout = () => {
            logout()
            setOpenModal(false)
        }
        return <Container className="mt-4">
            <Row>
                <Col></Col>
                <Col>You are now logged in </Col>
                <Col></Col>
            </Row>
            <Modal show={openModal} onHide={stay}>
                <Modal.Header closeButton>
                    <Modal.Title>Your session is about to expire</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Your session is about to expire. You'll be automatically signed out.
                    </p>
                    <p>
                        Do you want to stay signed in?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleLogout}>
                        Sign out now
                    </Button>
                    <Button variant="primary" onClick={stay}>
                        Stay signed in
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    }
    export default HomePage;

The `Login` signs the user into the application when the login form is submitted. 


    const Login = () => {
        const { login } = useContext(AuthContext);
        const handleLogin = async e => {
            e.preventDefault()
            login();
        };
        return <Container className="mt-5">
            <h1> Please Login</h1>
            <form onSubmit={handleLogin}>
                <p>Password</p>
                <input type="password" />
                <div>
                    <button type="submit">
                        Login
                    </button>
                </div>
            </form>
        </Container>
    }


## Create a custom idle detection hook 

We can create a custom hook in our application that implements the `react-idle-timer` package to detect user inactivity. First, install the package using the command `yarn add react-idle-timer`. 

Then create a `useIdleTimeout.js`  file containing the custom hook for idle detection. You can learn more about [creating custom hooks in this article](https://blog.logrocket.com/create-your-own-custom-react-hooks/). Add the code snippet below to the new file:


    import { useContext, useState } from "react"
    import { useIdleTimer } from "react-idle-timer"
    import AuthContext from "../context/AuthContext";
    /**
     * @param onIdle - function to notify user when idle timeout is close
     * @param idleTime - number of seconds to wait before user is logged out
     */
    const useIdleTimeout = ({ onIdle, idleTime = 1 }) => {
        const idleTimeout = 1000 * idleTime;
        const [isIdle, setIdle] = useState(false)
        const { logout } = useContext(AuthContext);
        const handleIdle = () => {
            setIdle(true)
            logout()
        }
        const idleTimer = useIdleTimer({
            timeout: idleTimeout,
            promptTimeout: idleTimeout / 2,
            onPrompt: onIdle,
            onIdle: handleIdle,
            debounce: 500
        })
        return {
            isIdle,
            setIdle,
            idleTimer
        }
    }
    export default useIdleTimeout;

This code contains an implementation of the `useIdleTimer` function from the `react-idle-timer` package. 

The `**useIdleTimeout**` hook expects an `onIdle` function to call when a user is idle and the number of seconds to wait before a user is marked as idle, `idleTime`. 

We store the idle state of a user in the `isIdle` state variable. The `**useIdleTimer**` hook from the package is called with the following properties: 

-  `timeout` - set the activity timeout in milliseconds
- `promptTimeout` - set the timeout for `onPrompt`  to be called. 
- `onPrompt` - display a confirm prompt before calling `onIdle`. 
- `onIdle` - called when user is idle
- `debounce`  

Then we export the `isIdle` state variable, the `setIdle` state action, and the `idleTimer` object. 


## Make use of the idle detection custom hook

We can now use the custom idle timer hook in our application. Update the `**HomePage**` file as shown. 


    const HomePage = () => {
        const [openModal, setOpenModal] = useState(false)
        const { logout } = useContext(AuthContext);
        const handleIdle = () => {
            setOpenModal(true);
        }
        const {idleTimer} = useIdle({ onIdle: handleIdle, idleTime: 5 })
        const stay = () => {
            setOpenModal(false)
            idleTimer.reset()
        }
        const handleLogout = () => {
            logout()
            setOpenModal(false)
        }
        return ...
    }
    

In this code, we create an instance of the `**useIdle**` hook which in turn starts the idle timer automatically for us. 

We reset the idle timer when the `Stay signed in` button is clicked. 

When a user stays idle for half the specified time, a prompt will be displayed. If the user does not interact with the prompt, then they’ll be logged out automatically. However, when they interact with the modal, their interactions are actioned as follows: 

- The user clicks on the close button - the idle timer is reset and the user stays logged in.
- The user clicks on `Stay signed in` - the idle timer is reset and the user stays logged in.
- The user clicks on `Sign out now` - logs the user out and the idle timer is destroyed.

The video below demonstrates app behavior with an idle timer implemented.


https://www.dropbox.com/s/dbv4kgg876vk5lr/React%20App%20-%209%20January%202023.mp4?dl=0

## Conclusion

Implementing an idle timer can improve the security of your web application. When adding an idle timer, it is important to carefully consider the duration of the timeout based on the level of risk the user information has. It is equally important to provide appropriate notifications to the user to avoid disrupting their workflow.

In this tutorial, we implemented an idle timer using the [`react-idle-timer`](https://www.npmjs.com/package/react-idle-timer) package which handles the binding and unbinding of keyboard and mouse events for us.  We made use of the exposed properties and methods to add an idle timer to our React application. 

All the code in this article is available on [GitHub](https://github.com/Ivy-Walobwa/react-idle-timer). I hope you enjoyed this tutorial!


