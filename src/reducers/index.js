import { combineReducers } from 'redux';
import StepsReducer from './StepsReducer';

export const reducers = combineReducers({
    stepsCount: StepsReducer
})