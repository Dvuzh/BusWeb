import { combineReducers } from 'redux';

import transportState from './cars';
import stationState from './stations';
import routesState from './routes';

// alex: логичнее назвать эту штуку rootReducer, ну то есть файл переименовать с index на что-то более вменяемое
export default combineReducers({
    transport: transportState,
    stations: stationState,
    routes: routesState
});
