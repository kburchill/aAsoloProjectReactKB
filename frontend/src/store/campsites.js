import { csrfFetch } from './csrf';

const LOAD = 'search/LOAD';
const LOAD_PARKS = 'search/LOAD_PARKS';

const load = campsites => ({
  type: LOAD,
  campsites,
})
const loadParks = parks => ({
  type: LOAD_PARKS,
  parks,
})

export const getCampsites = (dateSearch) => async dispatch => {
  const { park, jsonDateStart, jsonDateEnd } = dateSearch;
  const response = await csrfFetch(`/api/parks/${park}`, {
    method: 'POST',
    body: JSON.stringify({
      jsonDateStart,
      jsonDateEnd,
    })
  })
  if (response.ok) {
    const campsites = await response.json();
    dispatch(load(campsites));
    return campsites;
  }
}


export const getParks = () => async dispatch => {
  const response = await csrfFetch('/api/parks')

  if (response.ok) {
    const parks = await response.json();
    dispatch(loadParks(parks));
  }
}

const searchReducer = (state = {parks: {}}, action) => {
  let newState = {parks: {}};
  switch (action.type) {
    case LOAD_PARKS:
      const arr = action.parks.parks;
      arr.forEach(park => {
        newState.parks[park.id] = park;
      })
      return newState;
    case LOAD:
      newState =  action.campsites;
      return newState;
    default:
      return state;
  }
}

export default searchReducer;
