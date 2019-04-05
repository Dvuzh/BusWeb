export default function stationsState(state = {}, action) {
    if (action.type === 'ADD_STATIONS') {
        return action.stations;
    }
    return state;
}