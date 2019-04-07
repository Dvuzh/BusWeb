// alex: есть короче крутой пакет https://redux-actions.js.org/ чтобы избежать кучу if, switch и тд

export default function transportState(state = {}, action) {
    if (action.type === 'ADD_TRANSPORT') {
        return action.transport;
    } else if (action.type === 'UPDATE_TRANSPORT') {
        return state;
    }
    return state;
}
