import { GET_INVITE, GET_INVITES, INVITE_LOADING } from '../actions/types';

const initialState = {
  invite: null,
  invitations: null,
  loading: false
}

export default function(state = initialState, action) {
  
  switch(action.type) {
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
    case GET_INVITES:
      return {
        ...state,
        invitations: action.payload,
        loading: false
      }
    default:
      return state;
  }
}