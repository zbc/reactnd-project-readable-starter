import { FETCH_CATEGORIES } from "../actions";
import _ from 'lodash';

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_CATEGORIES:
            return _.mapKeys(action.payload.data.categories, 'name'); 
        default:
            return state;
    }
}