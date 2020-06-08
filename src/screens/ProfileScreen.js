import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../constants/globalStyles";
import { connect } from "react-redux";
import { styles } from "./styles";

const ProfileScreen = (props) => {
  const { points } = props;

  return (
    <View style={globalStyles.container}>
      <Text style={styles.txt}>
        NoiseFit Cash: Rs. {points/100}
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    points: state.points,
  };
};

export default connect(mapStateToProps, { })(ProfileScreen);
