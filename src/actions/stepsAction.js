import { STEPS_COUNT } from "./types"

export const setStepsCount = (steps) => async dispatch => {
    dispatch({
        type: STEPS_COUNT,
        payload: steps
    })
}