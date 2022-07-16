
import { roundTemp } from "./utils";
import { toggleLike } from "../store/action";
import { useDispatch, useSelector } from "react-redux";

export function NowTab({dataCity, style }) {
    const cityName = useSelector(state => state.weatherData.currentCity);
    const like = useSelector(state => state.weatherData[cityName].like)
    const dispatch = useDispatch();
    if (!dataCity) return (
        <div id="content-1"></div>
    );
    const handleLike = () => {
        dispatch(toggleLike(cityName));
    }
    return (
        <div id="content-1" style={{display: style}}>
            <WeatherTemperature dataCity={dataCity} />
            <WeatherImage dataCity={dataCity} />
            <div id='bottom-info'>
                <p className="city-name-1">{cityName}</p>
                <img src={(like ? "RedHeart.svg" : "EmptyHeart.svg")} className="city-like" onClick={handleLike} alt={""}/>
            </div>
        </div>
    );
}

function WeatherTemperature({ dataCity }) {
    const temperature = roundTemp(dataCity.list[0].main.temp)
    return (
        <p className="city-temperature">{temperature}</p>
    );
}

function WeatherImage({ dataCity }) {
    const src = `http://openweathermap.org/img/w/${dataCity.list[0].weather[0].icon}.png`;
    return (
        <img src={src} className="picture-temperature" alt={""}/>
    );
}