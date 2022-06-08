import { useState } from 'react';
import { ForecastTab } from './ForecastTab';
import { NowTab } from './NowTab';
import { DetailsTab } from './DetailsTab';

export function LeftSide({dataCity, srcHeart, toggleHeart}){

    const [nowTab, setNowCity] = useState("tabBtn nowTab onClick");
    const [detailsTab, setDetailsCity] = useState("tabBtn detailsTab");
    const [forecastTab, setForecastCity] = useState("tabBtn forecastTab");
    const [nowStyle, setNowStyle] = useState("block");
    const [detailsStyle, setDetailsStyle] = useState("none");
    const [forecastStyle, setForecastStyle] = useState("none");
  
    function toggleTab(e){
      setNowCity("tabBtn nowTab");
      setDetailsCity("tabBtn detailsTab");
      setForecastCity("tabBtn forecastTab");
      setNowStyle("none");
      setDetailsStyle("none");
      setForecastStyle("none");
      toggle(e.target.value);
    }
    
    function toggle(value){
      if(value == 1) {
        setNowCity(nowTab + " onClick");
        setNowStyle("block");
      }
      if(value == 2) {
        setDetailsCity(detailsTab + " onClick");
        setDetailsStyle("block");
      }
      if(value == 3) {
        setForecastCity(forecastTab + " onClick");
        setForecastStyle("block");
      }
    }
  
    return (
      <div className="tabs">
        <NowTab dataCity={dataCity} style={nowStyle} srcHeart={srcHeart} toggleHeart={toggleHeart}/>
        <DetailsTab dataCity={dataCity} style={detailsStyle}/>
        <ForecastTab dataCity={dataCity}  style={forecastStyle}/>
        <button className={nowTab} onClick={toggleTab} value={1}>Now</button>
        <button className={detailsTab} onClick={toggleTab} value={2}>Details</button>
        <button className={forecastTab} onClick={toggleTab} value={3}>Forecast</button>
      </div>
    );
  }