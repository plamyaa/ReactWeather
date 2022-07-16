import { serverUrl, apiKey } from "../components/consts";
import { createAction } from "@reduxjs/toolkit";
import fetch from 'cross-fetch'

export const requestWeather = createAction("REQUEST_WEATHER");

export const invalidateWeather = createAction("INVALIDATE_WEATHER");

export const recieveWeather = createAction("RECEIVE_WEATHER");

export const toggleLike = createAction("TOGGLE_LIKE");


export function fetchWeather(city) {
    return async (dispatch) => {
        dispatch(requestWeather({city}))
        const URL = `${serverUrl}?q=${city}&appid=${apiKey}`;
        try {
            const response = await fetch(URL);
            const data = await response.json();
            if (data.cod === '404') {
                dispatch(invalidateWeather({city}));
            } else {
                dispatch(recieveWeather({city, data}));
            }
        }
        catch (error) {
            dispatch(invalidateWeather({city}))
        }
    }
}

export const TOGGLE_CURRENT_CITY = 'TOGGLE_CURRENT_CITY';
export function toggleCurrentCity(city) {
    return {type: TOGGLE_CURRENT_CITY, city}
}