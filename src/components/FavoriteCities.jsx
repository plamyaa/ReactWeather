import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/action";


export function FavoriteCities() {
  const citiesList = useSelector(state => state.weatherData.liked)
  return (
    <div className="right-side">
      <div className="added-locations">
        <p className="add-loc">Added Locations:</p>
      </div>
      <Cities citiesList={citiesList} />
    </div>
  );
}

function Cities({ citiesList }) {
  const dispatch = useDispatch();
  if (citiesList.size === 0) return;
  const getCity = (event) => {
    const cityOnClick = event.target.id;
    if (cityOnClick) {
      dispatch(fetchWeather(cityOnClick));
    }
  }
  const list = citiesList.map((city) =>
    <li key={city} className='item-city'>
      <div className='item-city__div' id={city}>{city}</div>
    </li>
  );
  return (
    <ul className="cities-list" onClick={getCity}>{list}</ul>
  );
}
