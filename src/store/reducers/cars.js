// export default function carsState(state = {}, action) {
//     return state;
// };

// const initialState = [
//     'My home playlist',
//     'My work playlist'
// ];

export default function transportState(state = {}, action) {
    if (action.type === 'ADD_TRANSPORT') {
        return action.transport;
    } else if (action.type === 'UPDATE_TRANSPORT') {
        return state;
    }
    return state;
}