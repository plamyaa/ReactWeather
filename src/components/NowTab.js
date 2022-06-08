
import { roundTemp } from "./utils";

export function NowTab({ dataCity, style, srcHeart, toggleHeart}) {
    if (!dataCity) return (
        <div id="content-1"></div>
    );
    return (
        <div id="content-1" style={{ display: style }}>
            <WeatherTemperature dataCity={dataCity} />
            <WeatherImage dataCity={dataCity} />
            <div id='bottom-info'>
                <p className="city-name-1">{dataCity.city.name}</p>
                <img src={srcHeart} className="city-like" onClick={toggleHeart}/>
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
        <img src={src} className="picture-temperature" />
    );
}
