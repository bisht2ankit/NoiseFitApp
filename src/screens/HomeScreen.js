import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { globalStyles } from "../constants/globalStyles";
import { fetchFitnessApi } from "../utils";
import { connect } from "react-redux";
import { setStepsCount, setUserPoints } from "../actions";
import { styles } from "./styles";
import { CircularProgress, InfoModal } from "../components";
import AsyncStorage from "@react-native-community/async-storage";
import { APP_INSTALLED_DATE } from "../constants/asyncKeys";
import arrowIcon from "../assets/downArrow.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import infoIcon from '../assets/info.png';

const HomeScreen = (props) => {
  const { setStepsCount, steps, setUserPoints, points } = props;
  const { percent, count, distance } = steps;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  useEffect(() => {
    fetchStepsCount();
    fetchUserPoints();
  }, []);

  const fetchStepsCount = async (date) => {
    let healthKitOptions = {};
    if (date) {
      healthKitOptions = {
        date: new Date(date).toISOString(),
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
    const isTodayDate =
      moment(date).format("YYYY-MM-DD") ===
      moment(new Date()).format("YYYY-MM-DD");
    setFilterDate(isTodayDate ? "Today" : moment(date).format("MMM Do YYYY"));
    hideDatePicker();
  };

  const margin = {
    marginTop: 20
  }

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity
        style={[globalStyles.row, styles.dateView]}
        onPress={() => showDatePicker()}
      >
        <Text style={styles.bigTxt}>{filterDate || "Today"}</Text>
        <Image source={arrowIcon} style={styles.icon} />
      </TouchableOpacity>
      <CircularProgress done={percent} count={count} />
      <Text style={[styles.regularTxt, margin]}>
        You have walked {distance} km
      </Text>
      <TouchableOpacity style={[globalStyles.row, margin, {alignSelf: 'center'}]} onPress={() => setIsInfoModalVisible(true)}>
      <Text style={styles.regularTxt}>
        NoiseFit earnings: Rs {points / 100}
      </Text>
      <Image source={infoIcon} style={[styles.icon,{marginTop: 0}]}/>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <InfoModal closeModal={() => setIsInfoModalVisible(false)} visible={isInfoModalVisible} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    steps: state.stepsCount,
    points: state.points,
  };
};

export default connect(mapStateToProps, { setStepsCount, setUserPoints })(
  HomeScreen
);
