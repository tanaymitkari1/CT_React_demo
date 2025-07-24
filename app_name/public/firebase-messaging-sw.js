/* eslint-disable no-undef */
// public/firebase-messging-sw.js
importScripts('https://s3-eu-west-1.amazonaws.com/static.wizrocket.com/js/sw_webpush.js');// remove CleverTap server worker from your root folder
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDizRB3IPW2dZzm00zXcOlXPhq6WnbwGOA",
  authDomain: "webapp-5a8eb.firebaseapp.com",
  projectId: "webapp-5a8eb",
  storageBucket: "webapp-5a8eb.firebasestorage.app",
  messagingSenderId: "556598264182",
  appId: "1:556598264182:web:5400bab6625596bab9fa57"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message', payload);
  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: '/logo192.png'
  });
});