import Navbar from "./Navbar";
import React from 'react';
import "../Css/Informacion.css";
import CROP_CONDITIONS from "./cropData";

const ALL_CROPS = Object.keys(CROP_CONDITIONS);

const Informacion = () => {
  return (
    <div>
      <Navbar />
      <div className="cultivos-container">
        <h1>Información de Cultivos</h1>
        <div className="table-responsive">
          <table className="cultivos-table">
            <thead>
              <tr>
                <th>Cultivo</th>
                <th>Descripción</th>
                <th>Temperaturas Óptimas</th>
                <th>Humedad Óptima</th>
                <th>Consejos de Cultivo</th>
                <th>Temporada de Cultivo</th>
              </tr>
            </thead>
            <tbody>
              {ALL_CROPS.map((crop) => {
                const {
                  description,
                  temperatureOptimal,
                  humidityOptimal,
                  tips,
                  season
                } = CROP_CONDITIONS[crop];
  
                return (
                  <tr key={crop}>
                    <td>{crop}</td>
                    <td>{description}</td>
                    <td>{`${temperatureOptimal[0]}°C - ${temperatureOptimal[1]}°C`}</td>
                    <td>{`${humidityOptimal[0]}% - ${humidityOptimal[1]}%`}</td>
                    <td>{tips}</td>
                    <td>{season}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Informacion;
