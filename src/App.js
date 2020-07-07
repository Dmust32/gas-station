import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, makeStyles } from '@material-ui/core';
import './App.css';

import GasCard from './components/GasCard';
import Alert from './components/Alert';
import stationData from './stationData';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: 0
  }
});

function App() {
  const classes = useStyles();
  const [gasStations, setGasStations] = useState([]);
  const [location, setLocation] = useState(null)
  const [alert, setAlert] = useState({ onClose: () => {}, alertText: null })

  // Gets called on mount. Checks for location from browser and defaults to Intuit building on fail.
  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setLocation({
        longitude: '32.959747',
        latitiude: '117.157770'
      })
    }

    const getLocationError = (error) => {
      setAlert({
        onClose: setAlert,
        alertText: 'Failed to fetch location, using default.'
      })
      setLocation({
        latitude: '32.959747',
        longitude: '-117.157770'
      })
    };

    navigator.geolocation.getCurrentPosition((res) => setLocation(res.coords), getLocationError)
  }, []);

  // Gets called when location changes. Makes call to fetch station data. If fails we use stationData file.
  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      const getGasStations = async () => {
        await fetch(
          `http://api.mygasfeed.com/stations/radius/${latitude}/${longitude}/5/reg/distance/bjbt75bubr.json`,
          {
            method: 'GET',
          }
        )
        .then(res => res.json())
        .then(data => setGasStations(data.stations))
        .catch(error => {
          setAlert({
            onClose: setAlert,
            alertText: 'Something went wrong when fetching your local stations. Using sample data.'
          })
          setGasStations(stationData);
        })
      }
    
      getGasStations();
    }
  }, [location]);

  // Maps and renders out GasCards for each station in our list.
  const getGasCards = () => {
    return gasStations.map((station, index) => {
      return (
        <GasCard
          key={index}
          {...station}
        />
      );
    });
  };

  return (
    <div className="App">
      <Alert {...alert} />
      <h2>GasPal</h2>
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {gasStations.length ? getGasCards() : <CircularProgress />}
      </Grid>
    </div>
  );
}

export default App;
