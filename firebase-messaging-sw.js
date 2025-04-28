importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// Initialize Firebase inside Service Worker
firebase.initializeApp({
  apiKey: "AIzaSyA4cMGv4xJMMhlZUu5_ikE-N6-dKbuJjLc",
  authDomain: "yahpush-b039e.firebaseapp.com",
  projectId: "yahpush-b039e",
  storageBucket: "yahpush-b039e.firebasestorage.app",
  messagingSenderId: "760681138683",
  appId: "1:760681138683:web:15d95c11b1e756d1d6235e"
});

const messaging = firebase.messaging();

// Handle background notification
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png' // optional
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
