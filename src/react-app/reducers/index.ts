import { ErrorAction, IncrementCounter, GetActiveEditor } from "../../shared/actions";
import { GlobalState } from "../../shared/store";

type Actions = IncrementCounter | GetActiveEditor | ErrorAction;
export const rootReducer = (state: GlobalState, action: Actions): GlobalState => {
    console.log('action received', action);
    if (typeof state === 'undefined') {
        return {
            counter: 1,
            activeEditor: ''
        };
    }

    switch (action.type) {
        case 'Increment':
            return {...state, counter: state.counter ? state.counter + 1 : 1};
        case 'GetActiveEditor':
            return {...state, activeEditor: action.name};
        case 'Error':
            return { ...state, ...{ error: action.msg } };
        }

    // For now, don't handle any actions
    // and just return the state given to us.
    return state;
}