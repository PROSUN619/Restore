
//CREATE ACTION
export const INCREMENT_COUNTER = "INCREMENT_COUNTER"
export const DECREMENT_COUNTER = "DECREMENT_COUNTER"

// end CREATE ACTION

//create  intitial state
export interface CounterState {
    data: number,
    title: string
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (yet aother react counter)'
}

//create initial state

export function increment(amount = 1){
    return {
        type: INCREMENT_COUNTER,
        payload: amount    
    }
}

export function decrement(amount = 1){
    return {
        type: DECREMENT_COUNTER,
        payload: amount    
    }
}

// end create initial state

//reducer/slice function
export default function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + action.payload
                // using ... spread operator to create a new state 
                //redux recommend that to update the state do not mutate state create a new state and return
            }
            break;
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
                // using ... spread operator to create a new state 
                //redux recommend that to update the state do not mutate state create a new state and return
            }
            break;
        default:
            return state;
    }
}



