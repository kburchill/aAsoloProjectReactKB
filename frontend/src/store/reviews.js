import { csrfFetch } from './csrf';

const LOAD = 'reviews/LOAD';
const ADD_ONE = 'review/ADD_ONE';
const REMOVE_REVIEW = 'review/removeReview';

const load = list => ({
  type: LOAD,
  list,
})
const addReview = newReview => ({
  type: ADD_ONE,
  newReview,
})
const removeReview = () => {
  return {
    type: REMOVE_REVIEW,
  }
}

export const getReviews = (campsiteInfo) => async dispatch => {
  const {parkId, campsiteId } = campsiteInfo;
  const response = await csrfFetch(`/api/parks/${parkId}/campsites/${campsiteId}`)
  if (response.ok) {
    const reviews = await response.json();
    dispatch(load(reviews));
    return reviews;
  }
}

export const createReview = (campsiteInfo) => async dispatch => {
  const { userId, parkId, campsiteId, content} = campsiteInfo;
  const response = await csrfFetch(`/api/parks/${parkId}/campsites/${campsiteId}/review`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      content
    }),
  });
  if (response.ok) {
    const newReview = await response.json();
    dispatch(addReview(newReview));
    return newReview;
  }
}

export const deleteReview = (campsiteInfo) => async dispatch => {
  const {parkId, campsiteId, reviewId } = campsiteInfo;
  const response = await csrfFetch(`/api/parks/${parkId}/campsites/${campsiteId}/reviews/delete`, {
    method: 'DELETE',
    body: JSON.stringify({ reviewId }),
  })
  dispatch(removeReview());
  return response;
}


const reviewsReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = action.list;
      return newState;
    case ADD_ONE:
      newState = [...state, ...action.newReview ]
      return newState;
    case REMOVE_REVIEW:
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer;
