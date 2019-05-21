import { GET_INVITE, INVITE_LOADING } from '../actions/types';

const initialState = {
  invite: null,
  invites: null,
  loading: false
}

export default function(state = initialState, action) {
  switch(action) {
    case INVITE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_INVITE:
      return {
        ...state,
        invite: action.payload,
        loading: false
      }
    default:
      return state;
  }
}