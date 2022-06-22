

export function RigthSide({citiesList, showCity}) {
    return (
      <div className="right-side">
        <div className="added-locations">
          <p className="add-loc">Added Locations:</p>
        </div>
        <ul className="cities-list">
          <Cities citiesList={citiesList} showCity={showCity}/>
        </ul>
      </div>
    );
  }
  
  function Cities({citiesList, showCity}){
    if(citiesList.size === 0) return;
    const list = Array.from(citiesList).map((city) =>
      <li key={city} className='item-city'><div className='item-city__div' onClick={() =>showCity(city)}>{city}</div></li>
    );
    return(
      <ul className="cities-list">{list}</ul>
    );  
  }
  