//components/Bookings/UserBookings.js
import React from "react";
import { getBookings, deleteBooking } from '../../store/bookings';
import { useDispatch, useSelector} from "react-redux";
const UserBookings = ({booking}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const deleteABooking = (bookingId) => {
    dispatch(deleteBooking(bookingId))
    window.location.reload();
  };

  return (
    <div className="eachCampsite">
      <div className="campResults">
      <p>Reservation number: {booking.id}</p>
      <p>Campsite: {booking.Campsite.name}</p>
      <p>Start Date: {(booking.dateStart).toString().slice(0,10)}</p>
      <p>End Date: {(booking.dateEnd).toString().slice(0,10)}</p>
      <button className="deleteBooking" onClick={() => deleteABooking(booking.id)}>{`Cancel reservation ${booking.id}`}</button>
      <div className="pictures">
      <div className={`campPicture${booking.campsiteId} picture`}></div>
      </div>
      </div>
    </div>
  )
}

export default UserBookings;
