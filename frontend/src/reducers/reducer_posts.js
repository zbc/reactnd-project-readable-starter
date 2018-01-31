import {
  FETCH_POSTS,
  DELETE_POST,
  FETCH_POST,
  FETCH_CATEGORY_POSTS
} from "../actions";
import _ from "lodash";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");
    case FETCH_POST:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_CATEGORY_POSTS:
      return _.mapKeys(action.payload.data, "id");
    default:
      return state;
  }
}
