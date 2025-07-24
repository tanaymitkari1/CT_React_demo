// src/NotificationToken.js
import React from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

const NotificationToken = ({ shouldRequestToken }) => {
  React.useEffect(() => {
    if (shouldRequestToken) {
      const fetchToken = async () => {
        try {
          const currentToken = await getToken(messaging, {
            vapidKey: "BBxHHNGvNL9P2sWmXrJYj3soSejq_T4NZNGXuOWYTdyvfpeURFp9tfLkvu-U3qmYddXmxa6AW38k17cB_m_ZEmA"
          });

          if (currentToken) {
            console.log("Firebase Token:", currentToken);
            localStorage.setItem("fcm_token", currentToken);
          } else {
            console.warn("No registration token available. Request permission to generate one.");
          }
        } catch (err) {
          console.error("An error occurred while retrieving token. ", err);
        }
      };

      fetchToken();
    }
  }, [shouldRequestToken]);

  return null;
};

export default NotificationToken;