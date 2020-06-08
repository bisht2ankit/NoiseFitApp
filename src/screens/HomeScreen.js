import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../constants/globalStyles";
import { getStepCounts } from "../utils";
import { connect } from "react-redux";
import { setStepsCount } from "../actions";
import { styles } from "./styles";
import {CircularProgress} from "../components/CircularProgress";

const HomeScreen = (props) => {
  const { setStepsCount, steps} = props;
  const {percent, count} = steps;

  useEffect(() => {
    fetchStepsCount();
  }, []);

  const fetchStepsCount = async () => {
    const res = await getStepCounts();
    if(res){
      const {value} = res;
      setStepsCount(value);
    }
  };
  
  return (
    <View style={globalStyles.container}>
      <CircularProgress
        done={percent}
      >
        <Text style={styles.bigTxt}>{count}</Text>
        <Text style={styles.regularTxt}>Steps</Text>
      </CircularProgress>
    </View>
  )
};

const mapStateToProps = (state) => {
  return{
    steps: state.stepsCount
  }
}

export default connect(mapStateToProps, { setStepsCount })(HomeScreen);
