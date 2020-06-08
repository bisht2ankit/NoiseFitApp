import { combineReducers } from 'redux';
import StepsReducer from './StepsReducer';
import PointsReducer from './PointsReducer';

export const reducers = combineReducers({
    stepsCount: StepsReducer,
    points: PointsReducer
})