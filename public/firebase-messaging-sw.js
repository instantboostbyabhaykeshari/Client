importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyAKWow5LFGDI_t2mcksWnIiKUe2MwdKiu8",
    authDomain: "food-fun-fea7b.firebaseapp.com",
    projectId: "food-fun-fea7b",
    messagingSenderId: "132111345871",
    appId: "1:132111345871:web:8c0bb7eee9e0cefbcbafba",
    vapidKey: "BEAZtszl7rvIv_v-p388kCZXHorOFxJGsActlULDH-KH09KkwQNQVtOHaihMf4hBLOnZiAf_9vnAVy0nAzQaz1Q"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message:", payload);
});
