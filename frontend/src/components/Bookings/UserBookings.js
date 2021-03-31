//components/Bookings/UserBookings.js


const UserBookings = ({booking}) => {


  return (
    <div>
      Campsite: {booking.Campsite.name}
      Start Date:{booking.dateStart}
    </div>
  )
}

export default UserBookings;
