import { STEPS_COUNT } from "../actions/types";
import { TARGET_STEPS } from "../constants";
const initialState = {
  count: 0,
  percent: 0,
  distance: 0
};


export default (state = initialState, action) => {
  switch (action.type) {
    case STEPS_COUNT:
      const progressPercent = (action.payload.stepCount / TARGET_STEPS) * 100;
      return { count: action.payload.stepCount, percent: progressPercent, distance: (action.payload.distanceCount/1000).toFixed(2) };
    default:
      return state;
  }
};
