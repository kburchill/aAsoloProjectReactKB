import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getCampsites } from '../../store/campsites';
import Campsites from './Campsites';

const PARKS = [
  "Yosemite National Park",
  "Rocky Mountain National Park",
  "Everglades National Park",
  "Glacier National Park",
  "Yellowstone National Park"
]
// Need to figure out how to use date range

function CampsiteBook() {

  const [park, setPark] = useState(PARKS[0])
  const [dateStart, setStartDate] = useState("")
  const [dateEnd, setEndDate] = useState("")
  const [search, setSearch] = useState("")
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const campsites = useSelector(state => state.search) || [];

  useEffect(() => {
    const errors = []
    if (!dateStart || !dateEnd) {
     errors.push("Please enter your desired dates")
    }
    setErrors(errors);
  }, [dateStart, dateEnd])

  const onSubmit = e => {
    e.preventDefault();
    // dispatch(getCampsites({park, dateStart, dateEnd}))
    if (search.length === 0){
    dispatch(getCampsites(park))
    } else if (search.length >= 1) {
      dispatch(getCampsites(search))
    }
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
          {PARKS.map(park => (
            <option
              key={park}
            >
              {park}
            </option>
          ))}
        </select>
      </label>
      <label>
        Search
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
