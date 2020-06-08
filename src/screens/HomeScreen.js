import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { globalStyles } from "../constants/globalStyles";
import { fetchFitnessApi } from "../utils";
import { connect } from "react-redux";
import { setStepsCount, setUserPoints } from "../actions";
import { styles } from "./styles";
import { CircularProgress } from "../components/CircularProgress";
import AsyncStorage from "@react-native-community/async-storage";
import { APP_INSTALLED_DATE } from "../constants/asyncKeys";
import arrowIcon from "../assets/downArrow.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const HomeScreen = (props) => {
  const { setStepsCount, steps, setUserPoints } = props;
  const { percent, count, distance } = steps;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchStepsCount();
    fetchUserPoints();
  }, []);

  const fetchStepsCount = async (date) => {
    let healthKitOptions = {};
    if (date) {
      healthKitOptions = {
        date: new Date(date).toISOString()
      };
    }
    const res = await fetchFitnessApi(healthKitOptions);
    if (res) {
      const stepCount = res.steps.value;
      const distanceCount = res.distance.value;
      const count = { stepCount, distanceCount };
      setStepsCount(count);
    }
  };

  const fetchUserPoints = async () => {
    const date = await AsyncStorage.getItem(APP_INSTALLED_DATE);
    if (date) {
      const healthKitOptions = {
        date: JSON.parse(date),
      };
      const res = await fetchFitnessApi(healthKitOptions);
      if (res) {
        const stepCount = res.steps.value;
        setUserPoints(stepCount);
      }
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    fetchStepsCount(date);
    const isTodayDate = moment(date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD');
    setFilterDate(isTodayDate ? "Today" : moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity style={[globalStyles.row, styles.dateView]} onPress={() => showDatePicker()}>
        <Text style={styles.bigTxt}>{filterDate || "Today"}</Text>
        <Image source={arrowIcon} style={styles.icon} />
      </TouchableOpacity>
      <CircularProgress done={percent} count={count}/>
      <Text style={[styles.regularTxt, { marginTop: 20 }]}>
        You have walked {distance} km
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    steps: state.stepsCount,
  };
};

export default connect(mapStateToProps, { setStepsCount, setUserPoints })(
  HomeScreen
);
