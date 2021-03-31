import { csrfFetch } from './csrf';

const LOAD = 'search/LOAD';

const load = parks => ({
  type: LOAD,
  parks,
})

export const getCampsites = (park) => async dispatch => {
  const response = await csrfFetch(`/api/search/${park}`)

  // , {
  //   method: "POST",
  //   body: JSON.stringify(park)
  // });
  if (response.ok){
  const parks = await response.json();
  dispatch(load(parks));
  return parks;
  }
}

const searchReducer = (state = [], action ) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = action.parks;
      return newState;
    default:
      return state;
  }
}

export default searchReducer;
