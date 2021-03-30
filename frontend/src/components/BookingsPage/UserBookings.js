//components/Bookings/UserBookings.js


const UserBookings = ({booking}) => {


  return (
    <div>
      Campsite: {booking.campsiteId}
      Start Date:{booking.dateStart}
    </div>
  )
}

export default UserBookings;
