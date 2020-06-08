import React from "react";
import Routes from "./src/routes";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "./src/constants/globalStyles";

export default App = () => {
  return (
      <Provider store={store}>
        <SafeAreaView style={globalStyles.container}>
          <Routes />
        </SafeAreaView>
      </Provider>
  );
};
