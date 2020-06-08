import { POINTS_COUNT } from "./types"

export const setUserPoints = (steps) => async dispatch => {
    dispatch({
        type: POINTS_COUNT,
        payload: steps
    })
}