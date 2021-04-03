//components/Bookings/UserBookings.js
const UserBookings = ({booking}) => {

  return (
    <div className="eachCampsite">
      <div className="campResults">
      <p>Reservation number: {booking.id}</p>
      <p>Campsite: {booking.Campsite.name}</p>
      <p>Start Date: {(booking.dateStart).toString().slice(0,10)}</p>
      <p>End Date: {(booking.dateEnd).toString().slice(0,10)}</p>
      <button>{`Delete Reservation ${booking.id}`}</button>
      <div className="pictures">
      <div className={`campPicture${booking.campsiteId} picture`}></div>
      </div>
      </div>
    </div>
  )
}

export default UserBookings;
