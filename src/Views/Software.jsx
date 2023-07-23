import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faTint, faSun, faMoon, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import '../Css/Datos.css';
import Agr1 from "../IMG/Agr4.png";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const crops = [
  {
    name: "Maíz",
    minTemperature: 10,
    maxTemperature: 30,
    minHumidity: 50,
    maxHumidity: 70,
    isDaytime: true,
  },
  {
    name: "Trigo",
    minTemperature: 10,
    maxTemperature: 25,
    minHumidity: 30,
    maxHumidity: 50,
    isDaytime: true,
  },
  {
    name: "Tomate",
    minTemperature: 15,
    maxTemperature: 30,
    minHumidity: 60,
    maxHumidity: 80,
    isDaytime: true,
  },
];

const Software = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [isDaytime, setIsDaytime] = useState(true);
  const [weatherCondition, setWeatherCondition] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/data-readings'); 
      const jsonData = await response.json();

      const newTemperatureData = jsonData.map(data => ({
        day: data.day,
        temperature: data.temperature
      }));

      const newHumidityData = jsonData.map(data => ({
        day: data.day,
        humidity: data.humidity
      }));

      setTemperatureData(newTemperatureData);
      setHumidityData(newHumidityData);

      if (jsonData.length > 0) {
        setIsDaytime(jsonData[jsonData.length - 1].isDaytime);
        setWeatherCondition(jsonData[jsonData.length - 1].weatherCondition);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const temperature = temperatureData.length > 0 ? temperatureData[temperatureData.length - 1].temperature : null;
  const humidity = humidityData.length > 0 ? humidityData[humidityData.length - 1].humidity : null;

  const isAptoForFarming = crops.filter(
    crop =>
      temperature >= crop.minTemperature &&
      temperature <= crop.maxTemperature &&
      humidity >= crop.minHumidity &&
      humidity <= crop.maxHumidity &&
      isDaytime === crop.isDaytime
  );

  const animationProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    delay: 500,
  });

  const getRecommendations = () => {
    if (temperature === null || humidity === null) {
      return "No se pueden obtener recomendaciones en este momento.";
    }

    if (isAptoForFarming.length > 0) {
      return `Los cultivos aptos para sembrar son: ${isAptoForFarming.map(crop => crop.name).join(', ')}.`;
    } else {
      return "No es apto para sembrar ningún cultivo en este momento.";
    }
  };

  return (
    <>
      <Navbar />
      <animated.div className="software-container" style={animationProps}>
        <h2>Datos del clima</h2>
        <div className="weather-data">
          <img src={Agr1} alt="Imagen de agricultura" className="agriculture-image" />
          <div className="weather-data-item">
            <FontAwesomeIcon icon={faTemperatureHigh} className="weather-icon" />
            <p>Temperatura: {temperature}°C</p>
          </div>
          <div className="weather-data-item">
            <FontAwesomeIcon icon={faTint} className="weather-icon" />
            <p>Humedad: {humidity}%</p>
          </div>
          <div className="weather-data-item">
            {isDaytime ? (
              <>
                <FontAwesomeIcon icon={faSun} className="weather-icon" />
                <p>Periodo: Día</p>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faMoon} className="weather-icon" />
                <p>Periodo: Noche</p>
              </>
            )}
          </div>
          <div className="weather-data-item">
            <FontAwesomeIcon
              icon={isAptoForFarming.length > 0 ? faCheck : faTimes}
              className={isAptoForFarming.length > 0 ? 'weather-icon apto-icon' : 'weather-icon no-apto-icon'}
            />
            <p>{isAptoForFarming.length > 0 ? 'Apto para sembrar: ' + isAptoForFarming.map(crop => crop.name).join(', ') : 'No apto para sembrar ningún cultivo'}</p>
          </div>
        </div>
        <div className="charts-container">
          <div className="temperature-chart">
            <h3>Temperatura</h3>
            <LineChart width={600} height={300} data={temperatureData}>
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#ff8f00" name="Temperature" />
            </LineChart>
          </div>
          <div className="humidity-chart">
            <h3>Humedad</h3>
            <LineChart width={600} height={300} data={humidityData}>
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#1e88e5" name="Humidity" />
            </LineChart>
          </div>
        </div>
        <div className="recommendations">
          <h3>Consejos y recomendaciones</h3>
          <p>{getRecommendations()}</p>
        </div>
      </animated.div>
    </>
  );
};

export default Software;
