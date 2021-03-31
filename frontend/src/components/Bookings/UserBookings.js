//components/Bookings/UserBookings.js


const UserBookings = ({booking}) => {


  return (
    <div>
      <p>Reservation number: {booking.id}</p>
      <p>Campsite: {booking.Campsite.name}</p>
      <p>Start Date:{booking.dateStart}</p>
      <p>End Date : {booking.dateEnd}</p>
    </div>
  )
}

export default UserBookings;
