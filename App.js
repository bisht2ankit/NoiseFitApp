import React, { useEffect } from "react";
import Routes from "./src/routes";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "./src/constants/globalStyles";
import AsyncStorage from '@react-native-community/async-storage';
import { APP_INSTALLED_DATE } from "./src/constants/asyncKeys";

export default App = () => {

  useEffect(() => {
    setAppInstalledDate();
  }, [])

  const setAppInstalledDate = async () => {
    const date = await AsyncStorage.getItem(APP_INSTALLED_DATE);
    if(!date){
      AsyncStorage.setItem(APP_INSTALLED_DATE, JSON.stringify(new Date().toISOString()))
    }
  }

  return (
      <Provider store={store}>
        <SafeAreaView style={globalStyles.container}>
          <Routes />
        </SafeAreaView>
      </Provider>
  );
};
