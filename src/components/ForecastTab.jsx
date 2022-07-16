
import { roundTemp } from "./utils";

export function ForecastTab({ dataCity, style }) {
    if (!dataCity) return (
        <div id="content-3"></div>
    );
    return (
        <div id="content-3" style={{ display: style }}>
            <p className="city-name-3">{dataCity.city.name}</p>
            <ul className="time-list">
                <ForecastList dataCity={dataCity} />
            </ul>
        </div>
    );
}

function ForecastList({ dataCity }) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const list = numbers.map((i) =>
        <div className='time-block' key={i}>
            <p className="data">{dataCity.list[i].dt_txt.slice(8, 10) + '.' + dataCity.list[i].dt_txt.slice(5, 7)}</p>
            <p className="time">{dataCity.list[i].dt_txt.slice(11, -3)}</p>
            <div className="info-temperature">
                <p className="info-item-1">{"Temperature:" + roundTemp(dataCity.list[i].main.temp)}</p>
                <p className="info-item-2">{"Feels like:" + roundTemp(dataCity.list[i].main.feels_like)}</p>
            </div>
            <div className="img-temperature">
                <p className="img-item">{dataCity.list[i].weather[0].main}</p>
                <img className="img-icon" src={`http://openweathermap.org/img/w/${dataCity.list[i].weather[0].icon}.png`} alt={""}/>
            </div>
        </div>
    );
    return (
        list
    );
}