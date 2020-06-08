import { POINTS_COUNT } from "../actions/types";

export default (state = 0, action) => {
  switch (action.type) {
    case POINTS_COUNT:
      return action.payload;
    default:
      return state;
  }
};
