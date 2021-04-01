
const Campsites = ({campsite, park}) => {


  return (
    <div className="eachCampsite">
      <a href={`/parks/${campsite.parkId}/campsites/${campsite.id}`}>
      <p>Campsite: {campsite.name}</p>
      <p>Cost Per Day:{campsite.pricePerDay}</p>
      <p>Park: {park}</p>
      <div>{campsite.imgUrl}</div>
      <div className="pictures">
      <div className={`campPicture${campsite.id}`}></div>
      </div>
      {/* <img className="campPicture" src='/images/IMG_1354.jpeg' alt="whatever" /> */}
    </a>
    </div>
  )
}

export default Campsites;
