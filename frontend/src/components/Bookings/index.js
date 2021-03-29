// frontend/src/components/Bookings/index.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';


//Show current bookings

function showBookings({users}) {
  const {userId} = useParams()
  const user = users.find(user => user.id === userId)
  const userBookings = user.bookings;
  return (
    <div className="current-bookings">
      <h2>Current Bookings</h2>
      <div>{userBookings.forEach(booking => (
        <div>{booking.name} Dates: {booking.dates}
        </div>
      ))}
      </div>
    </div>
  )
}
