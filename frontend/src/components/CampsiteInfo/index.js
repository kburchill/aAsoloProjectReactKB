import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { createBooking} from '../../store/bookings';
import { getReviews } from '../../store/reviews';
import './CampsiteInfo.css';
function CampsiteInfo() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [dateStart, setStartDate] = useState("")
  const [dateEnd, setEndDate] = useState("")
  const [errors, setErrors] = useState([])
  const [reviews, setReviews ] = useState([1,2,3])
  const campsiteInfo = useParams()
  const campsiteId = campsiteInfo.campsiteId;

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
    setErrors(errors);
  }, [dateStart, dateEnd])

  useEffect(() => {
    (dispatch(getReviews(campsiteInfo)));
  },[dispatch])

  const campsiteReviews = useSelector(state => state.reviews[0]) || [];

  const onSubmit = e =>{
    e.preventDefault();
      const userId = sessionUser.id;
      dispatch(createBooking({userId, dateStart, dateEnd, campsiteId}
        ))

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
    <div className={`campPicture${campsiteId} picture`}></div>
    </div>
    <h2 className="reviewHeader">{`Reviews of`}</h2>
  <div classname="reviews">
  {/* {campsiteReviews.Reviews.map(review => <div>{review.content}</div>)} */}
  </div>
  </form>
  )
}

export default CampsiteInfo;
