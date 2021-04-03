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

  useEffect(() => {
    dispatch(getBookings(sessionUser.id));
  }, [dispatch])

  const handleTheClick = (e) => {
    console.log(e);
  };

  const bookings = useSelector(state => state.bookings) || [];
  return (
    <div className="current-bookings">
      <h2>Current Bookings</h2>
      {bookings.map(booking =>
      <UserBookings booking={booking} key={booking.id}/>
      )}
    </div>
  )
}

export default Bookings;
