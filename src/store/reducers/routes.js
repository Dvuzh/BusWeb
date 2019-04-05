export default function routesState(state = {}, action) {
    if (action.type === 'ADD_ROUTES') {
        return action.routes;
    }
    return state;
}