import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import inviteReducer from './inviteReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
