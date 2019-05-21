import axios from 'axios';
import { GET_INVITE, INVITE_LOADING, GET_ERRORS } from './types';

// Get invite
export const getInvite = () => dispatch => {
  dispatch(setInviteLoading());
  axios.get('api/invitations/5cd57d6fa5bb122b0652fe9f')
    .then(res => 
      dispatch({
        type: GET_INVITE,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err
      })  
    )
}
// Create Invite
export const createInvite = (inviteData, history) => dispatch => {
  axios
    .post('/api/invitations', inviteData)
    .then(res => history.push('/'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

}

export const setInviteLoading = () => {
  return {
    type: INVITE_LOADING
  }
}