// frontend/src/components/BookingsPage/index.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings, deleteBooking } from '../../store/bookings';
import UserBookings from './UserBookings';
import './Bookings.css';
//Show current bookings

function Bookings() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const bookings = useSelector(state => state.bookings) || [];
  const [length, setLength ] = useState(bookings.length)
  console.log(bookings.length)

  useEffect(() => {
    dispatch(getBookings(sessionUser.id));
  }, [ dispatch] )



  return (
    <div className="current-bookings">
      <h2>Current Bookings</h2>
      {bookings.map(booking =>
      <div>
      <UserBookings booking={booking} key={booking.id}/>
      </div>
      )}
    </div>
  )
}

export default Bookings;
