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
-   `MSPointerMove` - ired when a pointer changes coordinates.

The `react-idle-timer` package binds all these events to a DOM element by adding an event listener for each. User idleness is then toggled based on the last time the bound events were triggered. 
