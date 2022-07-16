
import { roundTemp, editTime } from "./utils";

export function DetailsTab({dataCity, style}) {
    if(!dataCity) return(
      <div id="content-2"></div>
    );
    return (
      <div id="content-2" style={{display: style}}>
        <p className="city-name-2">{dataCity.city.name}</p>
        <ul className="city-list">
          <li className="item" id="temp" >{"Temperature: " + roundTemp(dataCity.list[0].main.temp)}</li>
          <li className="item" id="temp-2">{"Feels like: " + roundTemp(dataCity.list[0].main.feels_like)}</li>
          <li className="item" id="weather">{"Weather: " + dataCity.list[0].weather[0].main}</li>
          <li className="item" id="sunrise">{"Sunrise: " + editTime(dataCity.city.sunrise)}</li>
          <li className="item" id="sunset">{"Sunset: " + editTime(dataCity.city.sunset)}</li>
        </ul>
      </div>
    );
  }
  
  