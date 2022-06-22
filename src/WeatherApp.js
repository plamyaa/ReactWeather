
import { useEffect, useState } from 'react';
import './WeatherApp.css';
import { Search } from './components/Search';
import { LeftSide } from './components/LeftSide';
import { RigthSide } from './components/RightSide';
import { serverUrl, apiKey} from './components/consts';
import { useSelector } from 'react-redux';
import { createStore } from 'redux';
import { Link } from "react-router-dom";

const store = createStore(cities);
//console.log(store.getState());

const unsubscibe = store.subscribe(() => console.log(store.getState()));


function WeatherApp(){
  const [citiesList, setCitiesList] = useState(new Set());
  const [nowData, setNowData] = useState();
  const [srcHeart, setSrcHeart] = useState("EmptyHeart.svg");

  useEffect(() => {
    for(let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      setCitiesList(cities => new Set(cities.add(key)))
    }
    const dataForCities = () => {
      citiesList.forEach(async (city) => {
        const data = await getData(city);
        store.dispatch(addCityToStore(city, data));
        //console.log(store.getState());
      });
    }
    dataForCities()
  }, []);
  
  async function requestCity (e){
    e.preventDefault();
    const data = await getData(e.target.firstChild.value);
    e.target.firstChild.value = "";
    if(data.cod === '200') {
      setNowData(data);
      checkLike(data.city.name);
      store.dispatch(addCityToStore(data.city.name, data));
      store.dispatch(showCityToStore(data.city.name));
      //console.log(store.getState());
    }
    else {
      alert("Wrong city")
    }
  }

  async function getData(city) {
    return fetch(`${serverUrl}?q=${city}&appid=${apiKey}`)
      .then(response => response.json());
  }

  function toggleHeart(){
    if (srcHeart === "EmptyHeart.svg") {
        setSrcHeart("RedHeart.svg");
        addCity(nowData.city.name);
      }
      else {
        setSrcHeart("EmptyHeart.svg");
        deleteCity(nowData.city.name)
      }
    } 
    
    function addCity(city){
      setCitiesList(cities => new Set(cities.add(city)))
      localStorage.setItem(city, city);
      store.dispatch(likeCityToStore(city));
      //console.log(store.getState());

  }

  function deleteCity(city) {
    setCitiesList(cities => new Set([...cities].filter(x => x !== city)))
    localStorage.removeItem("city");
    store.dispatch(unlikeCityFromStore(city));
    //console.log(store.getState());
  }

  function hasLike(city) {
    return citiesList.has(city);
  }

  function checkLike(city) {
    if(!hasLike(city)){
      setSrcHeart("EmptyHeart.svg")
    }
    else {
      setSrcHeart("RedHeart.svg");
    }
  }

  async function showCity(city){
    const data = await getData(city);
    setNowData(data);
    checkLike(city);
    store.dispatch(showCityToStore(city));
    //console.log(store.getState());
  }

  return (
    <div className="container">
      <div className="content">
        <Search onSubmit={requestCity}/>
        <LeftSide 
        dataCity={nowData} 
        srcHeart={srcHeart}
        toggleHeart={toggleHeart}
        />
        <RigthSide 
        showCity={showCity}
        citiesList={citiesList} 
        deleteCity={deleteCity}
        />
      </div>
      <nav>
        <Link to={"/Help"} className={"helpLink"}>Help</Link>
      </nav>
    </div>
  );
}

export default WeatherApp;


const ADD_CITY = "ADD_CITY";
const SHOW_CITY = "SHOW_CITY";
const DELETE_CITY = "DELETE_CITY";
const LIKE_CITY = "LIKE_CITY";
const UNLIKE_CITY = "UNLIKE_CITY";

function addCityToStore(city, data = {}) {
    return {
        type: ADD_CITY,
        city,
        data
    }
}
function likeCityToStore(city) {
  return {
    type: LIKE_CITY,
    city
  }
}
function unlikeCityFromStore(city) {
  return {
      type: UNLIKE_CITY,
      city
  }
}

function showCityToStore(city) {
    return {
        type: SHOW_CITY,
        city
    }
}

function deleteCityFromStore(city) {
    return {
        type: DELETE_CITY,
        city
    }
}

function cities(state = [], action) {
  switch (action.type) {
    case 'ADD_CITY':
      return [
        ...state,
        {
          city: action.city,
          showed: false,
          liked: true,
          data : action.data
        }
      ]
    case 'SHOW_CITY':
      return state.map((cityData) => {
        if (cityData.city === action.city) {
          return Object.assign({}, cityData, {
            showed: true,
          })
        }
        return Object.assign({}, cityData, {
          showed: false
        });
      })
    case 'LIKE_CITY':
      return state.map((cityData) => {
        if (cityData.city === action.city) {
          return Object.assign({}, cityData, {
            liked: true
          })
        }
        return cityData;
      }) 
    case 'UNLIKE_CITY':
      return state.map((cityData) => {
        if (cityData.city === action.city) {
          return Object.assign({}, cityData, {
            liked: false
          })
        }
        return cityData;
      })
    case 'DELETE_CITY':
      return state.slice(0, action.index).concat(state.slice(action.index + 1));
    default:
      return state;
  }
}

unsubscibe();