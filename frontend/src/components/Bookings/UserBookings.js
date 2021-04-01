//components/Bookings/UserBookings.js


const UserBookings = ({booking}) => {

  return (
    <div className="eachCampsite">
      {/* <a href={`/parks/${booking.Campsite.parkId}/campsites/${booking.campsiteId}`}> */}
      <div className="campResults">
      <p>Reservation number: {booking.id}</p>
      <p>Campsite: {booking.Campsite.name}</p>
      <p>Start Date:{booking.dateStart}</p>
      <p>End Date : {booking.dateEnd}</p>
      <div className={`campPicture${booking.campsiteId}`}></div>
      </div>
      {/* </a> */}
    </div>
  )
}

export default UserBookings;
