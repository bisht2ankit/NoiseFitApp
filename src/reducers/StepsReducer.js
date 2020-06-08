import { STEPS_COUNT } from "../actions/types";
import { TARGET_STEPS } from "../constants";
const initialState = {
  count: 0,
  percent: 0,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case STEPS_COUNT:
      const progressPercent = (action.payload / TARGET_STEPS) * 100;
      return { count: action.payload, percent: progressPercent };
    default:
      return state;
  }
};
