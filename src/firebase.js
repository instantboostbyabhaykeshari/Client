import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAKWow5LFGDI_t2mcksWnIiKUe2MwdKiu8",
  authDomain: "food-fun-fea7b.firebaseapp.com",
  projectId: "food-fun-fea7b",
  messagingSenderId: "132111345871",
  appId: "1:132111345871:web:8c0bb7eee9e0cefbcbafba",
  vapidKey: "BEAZtszl7rvIv_v-p388kCZXHorOFxJGsActlULDH-KH09KkwQNQVtOHaihMf4hBLOnZiAf_9vnAVy0nAzQaz1Q"
};


const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BEAZtszl7rvIv_v-p388kCZXHorOFxJGsActlULDH-KH09KkwQNQVtOHaihMf4hBLOnZiAf_9vnAVy0nAzQaz1Q",
      });
      console.log("FCM Token:", token);
      return token;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

onMessage(messaging, (payload) => {
  console.log("Notification received:", payload);
  alert(payload.notification.body);
});