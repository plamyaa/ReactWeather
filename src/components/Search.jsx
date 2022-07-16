import { fetchWeather } from "../store/action";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function Search() {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();
    const handleOnSubmit = (event) => {
        event.preventDefault();
        const formatedCity = formatRequest(city);
        dispatch(fetchWeather(formatedCity));
        setCity('');
    }
    const handleOnChange = (event) => {
        setCity(event.target.value)
    }
    return (
        <form className="search-menu" onSubmit={handleOnSubmit}>
            <input type="text" placeholder="Enter city" className="city-search" value={city} onChange={handleOnChange}/>
            <button className="search-btn"></button>
        </form>
    );
}

function formatRequest (city) {
    const firstLetter = city[0].toUpperCase()
    return firstLetter + city.slice(1).toLowerCase();
}