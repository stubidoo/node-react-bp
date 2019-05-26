import axios from 'axios';
import { GET_INVITE, GET_INVITES, INVITE_LOADING, GET_ERRORS } from './types';

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

// Get invites
export const getInvites = () => dispatch => {
  dispatch(setInviteLoading());
  axios.get('api/invitations')
    .then(res => 
      // console.log(res)
      dispatch({
        type: GET_INVITES,
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
export const createInvite = (inviteData, history) => async dispatch => {
  const primaryGuest = {
    name: inviteData.name,
    email: inviteData.email,
    primary_guest: true
  }
  inviteData.invitees.push(primaryGuest);
  const guests = await createGuests(inviteData.invitees);

  let users = [];
  for(let guest of guests) {
    users.push(guest.data._id);
  }

  console.log(guests);
  console.log(users);
  axios
    .post('/api/invitations', {users})
    .then(res => {
      console.log(res)
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

}

const createGuests = async (guestData) => {
  const guests = guestData.map( guest => createGuest(guest));
  const guestsResponse = await Promise.all(guests);
  return guestsResponse;
}

const createGuest = (guest) => {
  return axios.post('api/guests', guest)
}


export const setInviteLoading = () => {
  return {
    type: INVITE_LOADING
  }
}