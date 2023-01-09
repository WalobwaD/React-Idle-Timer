# How to make an idle timer for your React app
One way to add another layer of security to your web application is to use an idle timer. An idle timer is used to check whether a user has been inactive for a specified duration and then sign them out. 

When building websites that share highly confidential user information, the platform’s security is a major concern. As a developer, you need to guard the end user against intruders. Implementing an idle session timeout to sign a user out of their current session is one way to enhance the platform’s security. 

With applications that constantly make API calls, for example, every 30 seconds, it is necessary to implement an idle timeout to improve the app's performance. This logs the user out when idle hence preventing unnecessary backend requests. 

In this article, we’ll learn how to implement an idle timeout in your React application. We’ll make use of the `react-idle-timer` package to detect and respond to the user’s activity. 
