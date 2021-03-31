
const Campsites = ({campsite}) => {


  return (
    <div>
      <p>Campsite: {campsite.name}</p>
      <p>Cost Per Day:{campsite.pricePerDay}</p>
      <p>Park: {campsite.park}</p>
    </div>
  )
}

export default Campsites;
