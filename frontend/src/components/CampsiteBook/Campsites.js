
const Campsites = ({campsite}) => {


  return (
    <div>
      <p>Campsite: {campsite.name}</p>
      <p>Cost Per Day:{campsite.pricePerDay}</p>
      <p>Park: {campsite.parkId}</p>
    </div>
  )
}

export default Campsites;
