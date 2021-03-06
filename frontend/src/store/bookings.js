
import { csrfFetch } from './csrf';

const LOAD = 'bookings/LOAD';
const ADD_ONE = 'bookings/ADD_ONE';
const REMOVE_BOOKING = 'bookings/removeBooking';

const load = list => ({
  type: LOAD,
  list,
})
const addBooking = newBooking => ({
  type: ADD_ONE,
  newBooking,
})
const removeBooking = () => {
  return {
    type: REMOVE_BOOKING,
  }
}

export const getBookings = (id) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
}



export const createBooking = (campsiteInfo) => async dispatch => {
  const { userId, dateStart, dateEnd, campsiteId} = campsiteInfo;
  const response = await csrfFetch(`/api/bookings/`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      dateStart,
      dateEnd,
      campsiteId
    }),
  });
  if (response.ok) {
    const newBooking = await response.json();
    dispatch(addBooking(newBooking));
    return newBooking;
  }
}
export const deleteBooking = (bookingInfo) => async dispatch => {
  const {bookingId, sessionUser} = bookingInfo;
  const response = await csrfFetch(`/api/bookings/delete/${bookingId}`, {
    method: 'DELETE',
    body: JSON.stringify({ bookingId, sessionUser}),
  })
  if (response.ok) {
    const newBookings = await response.json();
    dispatch(removeBooking(newBookings));
    return newBookings;

  }
}

const bookingsReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = action.list;
      return newState;

    case ADD_ONE:
      newState = [...state, ...action.newBooking ]
      return newState;
    case REMOVE_BOOKING:
      newState = [...state, ...action.removeBooking]
      return newState;
    default:
      return state;
  }
}

export default bookingsReducer;
