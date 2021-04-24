import React, { useEffect } from 'react';
import Routes from './src/routes';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [ fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });
  // Observar notificações
  //useEffect(()=>{
    // const subscription = Notifications.addNotificationReceivedListener(
    //   async notification => {
    //     const data = notification.request.content.data.plant as PlantProps;
    //     console.log(data);
    //   });
    //   return () => subscription.remove();
      // Observar notificações agendadas
      //async function notication() {
        // const data = await Notifications.getAllScheduledNotificationsAsync();
        // console.log(data);

        // Cancelar todas notificações
        // await Notifications.cancelAllScheduledNotificationsAsync();
      //}
  //},[]);

  if(!fontsLoaded)
    return <AppLoading/>

  return (
    <Routes/>
  );
}