
import { csrfFetch } from './csrf';

const LOAD = 'bookings/LOAD';


const load = list => ({
  type: LOAD,
  list,
})

export const getBookings = (id) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
}

const bookingsReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = action.list;
      return newState;
    default:
      return state;
  }
}

export default bookingsReducer;
