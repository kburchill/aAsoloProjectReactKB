import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getParks, getCampsites } from '../../store/campsites';
import Campsites from './Campsites';
import format from 'date-fns/format';
import { addDays } from 'date-fns'
import './CampsiteBook.css';


// Need to figure out how to use date range

function CampsiteBook() {

  const [park, setPark] = useState(1)
  const initialDate = format(new Date(), "yyyy-MM-dd")
  const initialEndDate = format(addDays(new Date(), 14), "yyyy-MM-dd")
  const [dateStart, setStartDate] = useState(initialDate)
  const [dateEnd, setEndDate] = useState(initialEndDate)
  const [campsites, setCampsites] = useState([])
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();
  console.log(dateStart, typeof(dateEnd), "HERE ARETHE DATES")
  const parksObjects = useSelector(state => state.search.parks) || {};
  const campObjects = useSelector(state => state.search.campsites) || {};

  const parks = Object.values(parksObjects)
  const camps = Object.values(campObjects)

  useEffect(() => {
    const errors = []
    if (dateStart > dateEnd) {
      errors.pop();
      errors.push("Your start date is after your end date")
    }
    setErrors(errors);

  }, [dateStart, dateEnd])

  useEffect(() => {
    console.log("Get Parks effect is happening")
    dispatch(getParks());
  }, [dispatch]);

  useEffect(async () => {
    console.log("Search effect is happening")
    if (errors.length === 0) {
      let jsonDateStart = JSON.stringify(dateStart);
      let jsonDateEnd = JSON.stringify(dateEnd);
      const dateSearch = { park, jsonDateStart, jsonDateEnd }
      let newCampsites = await dispatch(getCampsites(dateSearch));
      setCampsites(newCampsites.campsites);

    } else if (errors.length >= 1) {
      setCampsites(camps);
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
