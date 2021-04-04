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

//localhost:234234/parks/1?startDate=something&endDate=somethingelse



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
    console.log(campsites, "campsites in frontend fetch===============")
    return dispatch(load(campsites));
  }
}

export const checkDate = (campsiteInfo) => async dispatch => {
  const { parkId, campsiteId } = campsiteInfo;
  const response = await csrfFetch(`/api/parks/${parkId}/campsites/${campsiteId}`)
  if (response.ok) {
    return true;
  } else {
    return false;
  }
}


export const getParks = () => async dispatch => {
  const response = await csrfFetch('/api/parks')

  if (response.ok) {
    const parks = await response.json();
    return dispatch(loadParks(parks));
  }
}

const searchReducer = (state = { parks: {}, campsites: {} }, action) => {
  // let newState = { parks: {}, campsites: {} };
  switch (action.type) {
    case LOAD_PARKS:
      const arr = action.parks.parks;
      arr.forEach(park => {
        state.parks[park.id] = park;
      })
      console.log(state, "Load_Parks hereAAAAAAAAAAAAAAA")
      return state;
    case LOAD:
      console.log(action, "Load here==================" )
      const camps = action.campsites;
      camps.forEach(campsite => {
        state.campsites[campsite.id] = campsite;
      })
      // newState = { ...state }
      // newState[action.campsites.id] = action.campsites
      // console.log("Load here==================", newState)
      return state;
    default:
      return state;
  }
}

export default searchReducer;
