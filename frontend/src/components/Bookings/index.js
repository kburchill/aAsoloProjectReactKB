// frontend/src/components/Bookings/index.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

//Show current bookings

function Bookings({user, Bookings }) {
  const userId = user.id;
  const userBookings = Bookings.find(booking => user.id === userId)
  return (
    <div className="current-bookings">
      <h2>Current Bookings</h2>
      <h2>{sessionActions}</h2>
      <div>{userBookings.forEach(booking => (
        //need to fix booking.name
        <div>{booking.name} Start Date: {booking.dateStart} End Date: {booking.dateEnd}
        </div>
      ))}
      </div>
    </div>
  )
}

export default Bookings;
