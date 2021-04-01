
const Campsites = ({campsite, park}) => {


  return (
    <a href={`/parks/${campsite.parkId}/campsites/${campsite.id}`}>
    <div className="eachCampsite">
      <p>Campsite: {campsite.name}</p>
      <p>Cost Per Day:{campsite.pricePerDay}</p>
      <p>Park: {park}</p>
      <div>{campsite.imgUrl}</div>
      <div className="pictures">
      <div className={`campPicture${campsite.id}`}></div>
      </div>
      {/* <img className="campPicture" src='/images/IMG_1354.jpeg' alt="whatever" /> */}
    </div>
    </a>
  )
}

export default Campsites;
