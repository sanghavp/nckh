// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
<<<<<<< Updated upstream
import {NativeBaseProvider} from "native-base"
=======
>>>>>>> Stashed changes
SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
<<<<<<< Updated upstream
        <App hideSplashScreen={SplashScreen.hideAsync} />
=======
    <App hideSplashScreen={SplashScreen.hideAsync} />

>>>>>>> Stashed changes
  </GestureHandlerRootView>
  )
}

registerRootComponent(IgniteApp)
export default IgniteApp
