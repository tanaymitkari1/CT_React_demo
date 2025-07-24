import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { initCleverTap } from './clevertapService';
import NotificationToken from "./NotificationToken";
import clevertap from 'clevertap-web-sdk';

function App() {
  const [clevertapInstance, setCleverTapInstance] = useState(null);
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const [shouldRequestToken, setShouldRequestToken] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      initCleverTap().then((clevertap) => {
        clevertap.spa = true;
        setCleverTapInstance(clevertap);
        console.log("CleverTap re-initialized after reload.");
      });
    }
  }, []);

  const showCleverTapPushPrompt = () => {
    if (typeof window !== "undefined" && window.clevertap) {
      clevertap.notifications.push({
        titleText: "Would you like to receive Push Notifications?",
        bodyText: "We promise to only send you relevant content and give you updates on your transactions",
        okButtonText: "Sign me up!",
        rejectButtonText: "No thanks",
        okButtonColor: "#F28046",
        askAgainTimeInSeconds: 5,
        serviceWorkerPath: "./firebase-messaging-sw.js"
      });
    }
  };

  const handleNotificationPermission = async () => {
    setShowCustomPopup(false);
    
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setShouldRequestToken(true); // This will trigger the token request in NotificationToken
        showCleverTapPushPrompt(); // Show CleverTap prompt after permission is granted
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const handleClick = async () => {
    try {
      //Perform the backend function and on 200 success run this function
      const clevertap = await initCleverTap();
      clevertap.onUserLogin.push({
        "Site": {
          "Name": "Jack Montana",
          "Identity": 612123476032,
          "MSG-sms": true,
          "MSG-whatsapp": true,
        }
      });
      localStorage.setItem('isLoggedIn', 'true');
      setCleverTapInstance(clevertap);
      
      // Check current permission state
      const permission = await Notification.permission;
      if (permission === 'default') {
        setShowCustomPopup(true);
      } else if (permission === 'granted') {
        setShouldRequestToken(true);
        showCleverTapPushPrompt();
      }
      
      console.log("CleverTap initialized and user logged in.");
    } catch (error) {
      console.error("CleverTap init failed:", error);
    }
  };

  const sendEvent = () => {

    //Perform the backend function and on 200 success run this function
    clevertap.event.push("Product viewed", {
    "Product name": "Casio Chronograph Watch",
    "Category": "Mens Accessories",
    "Price": 59.99,
    "Date": new Date()
});
    // if (clevertapInstance) {
    //   clevertapInstance.event.push("Product viewed");
    //   console.log("Event Sent");
    // } else {
    //   console.warn("CleverTap not initialized yet.");
    // }
  };

  const logout = () => {
    if (clevertapInstance) {
      localStorage.removeItem('isLoggedIn');
      window.location.reload();
    } else {
      console.warn("CleverTap not initialized yet.");
    }
  };

  return (
    <div className="App">
      <NotificationToken shouldRequestToken={shouldRequestToken} />
      <h1>React Firebase Push Demo</h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}>
          Login Button
        </button>
        <button onClick={sendEvent}>
          Send Event
        </button>
        <button onClick={logout}>
          Logout
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {showCustomPopup && (
        <div className="custom-popup-overlay">
          <div className="custom-popup">
            <h3>Enable Notifications</h3>
            <p>Would you like to receive notifications from us? We'll send you important updates.</p>
            <div className="popup-buttons">
              <button 
                className="allow-button" 
                onClick={handleNotificationPermission}
              >
                Allow Notifications
              </button>
              <button 
                className="cancel-button" 
                onClick={() => setShowCustomPopup(false)}
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;