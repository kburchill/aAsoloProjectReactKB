import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { createBooking } from '../../store/bookings';
import { getReviews, createReview, deleteReview } from '../../store/reviews';
import { checkDate } from '../../store/campsites';
import './CampsiteInfo.css';
function CampsiteInfo() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const campsiteReviews = useSelector(state => state.reviews[0]) || { Reviews: [{ content: "No reviews" }] };
  const [dateStart, setStartDate] = useState("")
  const [dateEnd, setEndDate] = useState("")
  const [errors, setErrors] = useState([])
  const [userReview, setReview] = useState("")
  const campsiteInfo = useParams()
  const campsiteId = campsiteInfo.campsiteId;
  const parkId = campsiteInfo.parkId;

  useEffect(() => {

    const errors = []
    if (!dateStart || !dateEnd) {
      errors.push("Please enter your desired dates")
    }
    if (dateStart > dateEnd) {
      errors.push("Please enter valid dates")
    }
    if (!sessionUser) {
      errors.push("Please login to book")
    }
    if (dateStart && dateEnd) {
      let jsonDateStart = JSON.stringify(dateStart);
      let jsonDateEnd = JSON.stringify(dateEnd);
      const dateSearch = { jsonDateStart, jsonDateEnd, parkId, campsiteId }
      let available = dispatch(checkDate(dateSearch));
      console.log(available, "here-------=======-----available---===========")
      if (!available) {
        errors.push("Dates not available")
      }
    }
    setErrors(errors);

  }, [dateStart, dateEnd])

  useEffect(() => {
    (dispatch(getReviews(campsiteInfo)));
  }, [dispatch])



  const onSubmit = e => {
    e.preventDefault();
    const userId = sessionUser.id;
    dispatch(createBooking({ userId, dateStart, dateEnd, campsiteId }
    ))

  };
  const submitReview = (content) => {
    const userId = sessionUser.id;
    dispatch(createReview({ userId, campsiteId, parkId, content }))
    window.location.reload()
  };

  const handleDelete = (reviewId) => {
    console.log(reviewId, "id here ====================")
    dispatch(deleteReview({campsiteId, parkId, reviewId}))
    window.location.reload()
  };
  return (
    <form onSubmit={onSubmit} className="booking-form">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Start Date
        <input
          type="date"
          name="date"
          value={dateStart}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date
        <input
          type="date"
          name="date"
          value={dateEnd}
          onChange={(e) => setEndDate(e.target.value)}
        />

      </label>
      <button type="submit" disabled={errors.length}>Book</button>
      <div className="pictures">
        <div className={`campPicture${campsiteId} picture campsiteInfoPicture`}></div>
      </div>
      <h2 className="reviewHeader">{`Reviews of`}</h2>
      <div classname="reviews">
        {campsiteReviews.Reviews.map(review =>
          <div>
            <p>{`User: ${review.userId} had this to say:`}</p>
            <p className="userReviews">{`${review.content}`}</p>
            <button className="deleteReview" hidden={sessionUser.id !== review.userId} onClick={() => handleDelete(review)}>Delete review</button>
          </div>
        )}
        <div className="userReviewButton">
          <p> Would you like to leave a review?</p>
          <textarea
            name="review"
            value={userReview}
            onChange={(e) => setReview(e.target.value)}
          />
          <button disabled={!userReview.length} onClick={() => submitReview(userReview)}>Submit Review</button>
        </div>
      </div>
    </form>
  )
}

export default CampsiteInfo;
