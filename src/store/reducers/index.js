import { combineReducers } from 'redux';

import transportState from './cars';

export default combineReducers({
    transport: transportState
});
