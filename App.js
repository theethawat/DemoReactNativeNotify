import React, { useState, useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [fcmToken, setFcmToken] = useState("");
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("New FCM message is Arrive", remoteMessage);
    });
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification cause app wake from background state",
        remoteMessage.notification
      );
    });

    // Check Initial Notification is Avaliable
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification Cause app to open from quit state",
            remoteMessage.notification
          );
        }
      });
    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging()
      .getToken()
      .then((token) => {
        console.log("Token is Generated ", token);
        setFcmToken(token);
        return;
      });

    return messaging().onTokenRefresh((token) => {
      console.log("On Token Refresh is called");
      setFcmToken(token);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Token {fcmToken}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
