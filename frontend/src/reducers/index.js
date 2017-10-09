import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import CategoriesReducer from './reducer_categories';
import CommentReducer from './reducer_comments';

const rootReducer = combineReducers({
  posts: PostsReducer,
  categories: CategoriesReducer,
  comments: CommentReducer,
  form: formReducer
});

export default rootReducer;