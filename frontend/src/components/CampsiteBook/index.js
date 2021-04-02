import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getParks, getCampsites } from '../../store/campsites';
import Campsites from './Campsites';
import './CampsiteBook.css';


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
  // let newCampsites = useSelector(state => state.search.campsites)

  const parks = Object.values(parksObjects)


  useEffect(() => {
    const errors = []
    if (!dateStart && !dateEnd) {
      errors.push("Please enter your desired dates")
    }
    if (dateStart > dateEnd) {
      errors.pop();
      errors.push("Please enter correct dates")
    }

    setErrors(errors);

  }, [dateStart, dateEnd])

  useEffect(() => {
    dispatch(getParks());
  }, [dispatch]);

  useEffect(async () => {
    if (errors.length === 0) {
      let jsonDateStart = JSON.stringify(dateStart);
      let jsonDateEnd = JSON.stringify(dateEnd);
      const dateSearch = { park, jsonDateStart, jsonDateEnd }
      let newCampsites = await dispatch(getCampsites(dateSearch));
      setCampsites(newCampsites.campsites);

    } else if (errors.length >= 1) {
      setCampsites(parksObjects[park].Campsites)
    }
  }, [park, dateStart, dateEnd]);

  return (
    <>
      <form className="booking-form">
        <div className="searchHeader">
          <h2>Get Outside With Your Pup</h2>
        </div>
        <div className="searchFields">
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
          {/* <button type="submit" className="searchButton"><i class="fas fa-search"></i></button> */}
        </div>
        <ul className="errors">
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        {campsites.map(campsite => <Campsites campsite={campsite} park={parksObjects[park].name} key={campsite.id} />)}


      </form>
    </>
  );
}

export default CampsiteBook;
