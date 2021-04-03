
const Campsites = ({campsite, park}) => {


  return (
    <div className="eachCampsite">
      <a href={`/parks/${campsite.parkId}/campsites/${campsite.id}`}>
      <div className="campResults">
      <p>Campsite: {campsite.name}</p>
      <p>Cost Per Day:{campsite.pricePerDay}</p>
      <p>Park: {park}</p>
      <div>{campsite.imgUrl}</div>
      <div className="pictures">
      <div className={`campPicture${campsite.id} picture`}></div>
      </div>
      </div>
    </a>
    </div>
  )
}

export default Campsites;
