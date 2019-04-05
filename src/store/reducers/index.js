import { combineReducers } from 'redux';

import transportState from './cars';
import stationState from './stations';
import routesState from './routes';

export default combineReducers({
    transport: transportState,
    stations: stationState,
    routes: routesState
});
