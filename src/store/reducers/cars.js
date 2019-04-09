// alex: есть короче крутой пакет https://redux-actions.js.org/ чтобы избежать кучу if, switch и тд

export default function transportState(state = {}, action) {
    if (action.type === 'ADD_TRANSPORT') {
        return action.transport;
    } else if (action.type === 'UPDATE_TRANSPORT') {
        return state;
    }
    return state;
}

// import { createAction, handleActions, combineActions } from 'redux-actions';
//
//
// const addTransport = createAction('ADD_TRANSPORT');
//
// const transportState = {
//     [addTransport]: (state, action) => action.transport
// };
//
//
// export default transportState;