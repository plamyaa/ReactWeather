
import { useEffect, useState } from 'react';
import './WeatherApp.css';
import { Search } from './components/Search';
import { LeftSide } from './components/LeftSide';
import { RigthSide } from './components/RightSide';
import { serverUrl, apiKey} from './components/consts';


function WeatherApp(){
  const [citiesList, setCitiesList] = useState(new Set());
  const [nowData, setNowData] = useState();
  const [srcHeart, setSrcHeart] = useState("EmptyHeart.svg");

  useEffect(() => {
    for(let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      setCitiesList(cities => new Set(cities.add(key)))
    }
  }, []);
  
  async function requestCity (e){
    e.preventDefault();
    const data = await getData(e.target.firstChild.value);
    e.target.firstChild.value = "";
    if(data.cod === '200') {
      setNowData(data);
      checkLike(data.city.name);
    }
    else {
      alert("Wrong city")
    }
  }

  function getData(city) {
    return fetch(`${serverUrl}?q=${city}&appid=${apiKey}`)
      .then(response => response.json());
  }

  function toggleHeart(){
    if (srcHeart == "EmptyHeart.svg") {
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
  }

  function deleteCity(city) {
    setCitiesList(cities => new Set([...cities].filter(x => x !== city)))
    localStorage.removeItem("city");
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
    </div>
  );
}

export default WeatherApp;