import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { 
  recieveWeather,
  requestWeather,
  invalidateWeather,
  toggleLike,
} from "./action";
import { useStorage } from "../storage/storage";

const liked = JSON.parse(localStorage.getItem("liked")) || [];
const current = localStorage.getItem('current') || "London";
const weatherData = createReducer({currentCity : current, liked: liked}, (builder) => {
  const storage = useStorage();
    builder
    .addCase(requestWeather.type, (state, action) => {
        state[action.payload.city] = {
          isFetching : true,
          didInvalide : false,
        }
    })
    .addCase(recieveWeather.type, (state, action) => {
      const city = action.payload.city;
      const isCityLiked = state.liked.find(storageCity => storageCity === city)
      localStorage.setItem('current', city);
      state.currentCity = city;
      state[city] = {
          isFetching : false,
          didInvalide : false,
          data: action.payload.data, 
          like: false
      }
      if(isCityLiked) {
        state[city].like = true;
      }
    })
    .addCase(invalidateWeather.type, (state, action) => {
      state[action.payload.city] = {
        isFetching : false,
        didInvalide : true,
      }
    })
    .addCase(toggleLike.type, (state, action) => {
      const city = action.payload;
      state[city].like = !state[city].like;
      if(isCityLiked(state.liked, city)) {
        state.liked = state.liked.filter(dataCity => dataCity !== city)
        storage.setItem("liked", state.liked);
      }
      else {
        state.liked = [...state.liked, city];
        storage.setItem("liked", state.liked);
      }
    })
})

function isCityLiked (data, city) {
  return data.find(element => element === city);
}

export const rootReducer = combineReducers({weatherData});