//components/Bookings/UserBookings.js


const UserBookings = ({booking}) => {


  return (
    <div>
      <p>Campsite: {booking.Campsite.name}</p>
      <p>Start Date:{booking.dateStart}</p>
    </div>
  )
}

export default UserBookings;
