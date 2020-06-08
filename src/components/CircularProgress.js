import React, { memo, useEffect } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Platform,
  Text,
} from "react-native";
import PropTypes from "prop-types";
import { colors } from "../constants/colors";
import { fontSize } from "../constants/fontSize";

export const CircularProgress = memo(({ done, count }) => {
  const activeColor = colors.GREEN;
  const passiveColor = colors.APP_BLACK_THEME;
  const width = 30;
  const radius = 100;
  const duration = 2000;

  const initialValueHalfCircle = done >= 50 ? 0 : 180;
  const initialValueInnerCircle = 0;
  const animatedValue1 = new Animated.Value(initialValueHalfCircle);
  const animatedValue2 = new Animated.Value(initialValueHalfCircle);
  const animatedValue3 = new Animated.Value(initialValueInnerCircle);
  const timePerDegree = duration / 360;
  const color1 = activeColor;
  const color2 = done >= 50 ? activeColor : passiveColor;

  const firstAnimation = () => {
    animatedValue1.setValue(initialValueHalfCircle);
    animatedValue2.setValue(initialValueHalfCircle);
    animatedValue3.setValue(initialValueInnerCircle);

    Animated.parallel([
      Animated.timing(animatedValue1, {
        toValue: 180,
        duration: 180 * timePerDegree,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(animatedValue2, {
        toValue: 180 + (done - 50) * 3.6,
        duration: (180 + (done - 50) * 3.6) * timePerDegree,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(animatedValue3, {
        toValue: (done - 50) * 3.6,
        delay: 180 * timePerDegree,
        duration: timePerDegree * ((done - 50) * 3.6),
        useNativeDriver: Platform.OS == "android" ? true : false,
        easing: Easing.linear,
      }),
    ]).start();
  };

  const secondAnimation = () => {
    animatedValue1.setValue(initialValueHalfCircle);
    animatedValue2.setValue(initialValueHalfCircle);
    animatedValue3.setValue(initialValueInnerCircle);
    Animated.timing(animatedValue2, {
      toValue: 180 + done * 3.6,
      duration: done * 3.6 * timePerDegree,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  useEffect(() => {
    if (done >= 50) {
      firstAnimation();
    } else {
      secondAnimation();
    }
  }, [done]);

  const renderHalf = (color, transforms = [], otherStyles = {}) => (
    <Animated.View
      style={[
        styles.half,
        { backgroundColor: color, borderColor: color },
        { width: radius, height: radius * 2, borderRadius: radius },
        {
          transform: [
            { translateX: radius / 2 },
            ...transforms,
            { translateX: -radius / 2 },
            { scale: 1.004 },
          ],
        },
        otherStyles,
      ]}
    ></Animated.View>
  );

  const rotate1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1deg"],
  });
  const rotate2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1deg"],
  });

  const rotate3 = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1deg"],
  });

  const elevation3 = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1],
  });

  return (
    <View style={styles.container} key={done}>
      <View
        style={[
          styles.outer,
          { backgroundColor: passiveColor },

          { borderRadius: radius, height: radius * 2, width: radius * 2 },
        ]}
      >
        {renderHalf(color1, [{ rotate: rotate1 }])}
        {renderHalf(color2, [{ rotate: rotate2 }])}
        {renderHalf(passiveColor, [{ rotate: rotate3 }], {
          elevation: elevation3,
          zIndex: elevation3,
        })}
        <View
          style={[
            {
              backgroundColor: colors.APP_BLACK_THEME,
              width: 2 * radius - width,
              height: 2 * radius - width,
              borderRadius: radius,
              elevation: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.bigTxt}>{count}</Text>
          <Text style={styles.regularTxt}>Steps</Text>
        </View>
      </View>
    </View>
  );
});

CircularProgress.propTypes = {
  activeColor: PropTypes.string,
  passiveColor: PropTypes.string,
  width: PropTypes.number,
  radius: PropTypes.number,
  done: PropTypes.number,
  duration: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginTop: 10,
  },
  outer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderColor: "white",
    borderWidth: 1,
  },
  half: {
    position: "absolute",
    left: 0,
    top: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  bigTxt: {
    fontSize: fontSize.bigTitle,
    color: "white",
    textAlign: "center",
  },
  regularTxt: {
    fontSize: fontSize.title,
    color: "white",
    textAlign: "center",
  },
});
