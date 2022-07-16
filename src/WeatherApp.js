
import './WeatherApp.css';
import { Search } from './components/Search';
import { WeatherTabs } from './components/WeatherTabs';
import { FavoriteCities } from './components/FavoriteCities';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchWeather } from './store/action';
function WeatherApp(){
  const currentCity = localStorage.getItem('current') || "London";
  const dispatch = useDispatch();
  dispatch(fetchWeather(currentCity));

  return (
    <div className="container">
      <div className="content">
        <Search />
        <WeatherTabs />
        <FavoriteCities />
      </div>
      <nav>
        <Link to={"/Help"} className={"helpLink"}>Help</Link>
      </nav>
    </div>
  );
}

export default WeatherApp;