import { FETCH_COMMENTS, DELETE_COMMENT } from "../actions";
import _ from 'lodash';

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case DELETE_COMMENT:
            return _.omit(state, action.payload);
        case FETCH_COMMENTS:
            return _.mapKeys(action.payload.data, 'id'); 
        default:
            return state;
    }
}