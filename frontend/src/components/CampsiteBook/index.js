import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getCampsites, getParks } from '../../store/campsites';
import Campsites from './Campsites';


// Need to figure out how to use date range

function CampsiteBook() {

  const [park, setPark] = useState(1)
  const [dateStart, setStartDate] = useState("")
  const [dateEnd, setEndDate] = useState("")
  const [campsites, setCampsites] = useState([])
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const parksObjects = useSelector(state => state.search.parks) || {};

  const parks = Object.values(parksObjects)
  console.log(campsites);
  useEffect(() => {
    const errors = []
    if (!dateStart || !dateEnd) {
      errors.push("Please enter your desired dates")
    }
    setErrors(errors);
  }, [dateStart, dateEnd])

  useEffect(() => {
    dispatch(getParks());
  }, [dispatch]);

  const onSubmit = e => {
    e.preventDefault();
    setCampsites(parksObjects[park].Campsites)
  };

  return (
    <>
      <form className="booking-form" onSubmit={onSubmit}>
        <h2>Book a campsite</h2>
        <ul className="errors">
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <label>
          Select a Park
        <select value={park} onChange={(e) => setPark(e.target.value)}>
            {parks.map(park => (
              <option
                value={park.id}
                key={park.id}
              >
                {park.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Start Date
        <input
            type="date"
            name="date"
            value={dateStart}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date
        <input
            type="date"
            name="date"
            value={dateEnd}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button type="submit" disabled={!!errors.length}>Search availability</button>
      </form>
      {campsites.map(campsite => <Campsites campsite={campsite} key={campsite.id} />)}
    </>
  );
}

export default CampsiteBook;
