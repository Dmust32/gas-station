import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [gasStations, setGasStations] = useState([]);

  useEffect(() => {
    const location = (() => {
      if (!navigator || !navigator.geolocation) return console.error('Geolocation unavailable')
      
      return navigator.geolocation.getCurrentPosition((res) => res)
    })();
    const getGasStations = async () => {
      console.log('location', location)
      const stationData = await fetch('http://localhost:5050/api/getGasStations', {
        method: 'POST',
        body: location
      }).then(res => res.json())
      .then(data => console.log(data))
      setGasStations(stationData)
    }
  
    getGasStations();
  }, [])
  return (
    <div className="App">
      {gasStations}
    </div>
  );



}

export default App;
