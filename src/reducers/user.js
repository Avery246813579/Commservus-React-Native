import {
    UPDATE_REDEEM,
} from "../actions/index";

let cloneObject = function (obj) {
    return JSON.parse(JSON.stringify(obj))
};

let newState = {
    redeemed: true
};

export default function (state = newState, action) {
    switch (action.type) {
        case UPDATE_REDEEM:
            newState = cloneObject(state);

            newState.redeemed = action.payload;
            return newState;
        default:
            return state
    }
}