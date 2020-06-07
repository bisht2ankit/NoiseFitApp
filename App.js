import React from "react";
import { SafeAreaView } from "react-native";
import { HomeScreen } from "./src/screens/HomeScreen";
import Routes from "./src/routes";

export default App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Routes />
    </SafeAreaView>
  );
};
