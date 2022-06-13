import { useState } from 'react';
import { ForecastTab } from './ForecastTab';
import { NowTab } from './NowTab';
import { DetailsTab } from './DetailsTab';

export function LeftSide({dataCity, srcHeart, toggleHeart}){
    const [value, setValue] = useState(1);
  
    function handleValue(e){
      setValue(e.target.value);
    }

    return (
      <div className="tabs">
        <NowTab dataCity={dataCity} style={value === "1" ? "block" : "none"} srcHeart={srcHeart} toggleHeart={toggleHeart}/>
        <DetailsTab dataCity={dataCity} style={value === "2" ? "block" : "none"}/>
        <ForecastTab dataCity={dataCity}  style={value === "3" ? "block" : "none"}/>
        <button className={value === "1" ? "tabBtn nowTab onClick" : "tabBtn nowTab"} onClick={handleValue} value={1}>Now</button>
        <button className={value === "2" ? "tabBtn detailsTab onClick" : "tabBtn detailsTab"} onClick={handleValue} value={2}>Details</button>
        <button className={value === "3" ? "tabBtn forecastTab onClick" : "tabBtn forecastTab"} onClick={handleValue} value={3}>Forecast</button>
      </div>
    );
  }