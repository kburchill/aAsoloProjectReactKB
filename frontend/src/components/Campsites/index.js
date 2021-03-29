import { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

const PARKS = [
  "Yosemite National Park",
  "Rocky Mountain National Park",
  "Everglades National Park",
  "Glacier National Park"
]
// Need to figure out how to use date range

function CampsiteBook({campsites}) {

  const [park, setPark] = useState(PARKS[0])
  const [date, setDate] = useState("")
  const [errors, setErrors] = useState([])
  const history = useHistory();

  useEffect(() => {

    const errors = []
    if (!date) {
     errors.push("Please enter your desired dates")
    }
    setErrors(errors);
  }, [date])

  const onSubmit = e => {
    e.preventDefault();
    console.log({
      park,
      date
    })
    history.push("/");
  };

  return (
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
        Dates
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button type="submit" disabled={!!errors.length}>Search availability</button>
    </form>
  );
}

export default CampsiteBook;
