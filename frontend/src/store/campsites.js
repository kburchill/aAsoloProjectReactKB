
import { csrfFetch } from './csrf';

const LOAD = 'campsites/LOAD';


const load = list => ({
  type: LOAD,
  list,
})

const setCamp = (campsiteId) => {
  return {
    type: SET_CAMP,
    payload: campsiteId,
  };
};

export const getCampsites = () => async dispatch => {
  const response = await csrfFetch(`/api/campsites/`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
}

export const bookCampsite = (campsiteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/campsite/${campsiteId}`, {
    method: "POST",
    body: JSON.stringify(campsiteId),
  });
  const data = await response.json();
  dispatch(setUser(data.campsiteId));
  return response;
};

const campsitesReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = action.list;
      return newState;
    default:
      return state;
  }
}

export default campsitesReducer;
