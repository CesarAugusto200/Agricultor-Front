import React from 'react';
import Navbar from "../Views/Navbar";
import { Carousel } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import "../Css/Agricult.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Agr1 from "../IMG/Agr1.jpg";
import Agr2 from "../IMG/Agr2.jpg";
import Agr3 from "../IMG/Agr3.jpg";

const HomePage = () => {
  const agricultureImages = [Agr1, Agr2, Agr3];

  const bgAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(1.2)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 800 },
  });

  return (
    <>
      <Navbar/>
    <animated.div style={bgAnimation} className="bg-light bg-agriculture">
      <div className="presentation-container">
        <h1 className="text-center">Bienvenido a "Amigo Agricultor"</h1>

        <section>
          <h2>Revoluciona tu agricultura con inteligencia ambiental</h2>
          <p>
            "Amigo Agricultor" es una plataforma innovadora que transforma tu agricultura con el poder del monitoreo ambiental en tiempo real. Con nuestra solución, puedes entender exactamente cuándo y cómo tus cultivos están prosperando, permitiéndote sembrar y cosechar de manera más eficiente y efectiva. Menos conjeturas, más crecimiento.
          </p>
        </section>

        <section>
          <h2>Características clave</h2>
          <ul>
            <li><strong>Monitoreo en tiempo real:</strong> Mantente al tanto de la temperatura y la humedad del ambiente a todas horas.</li>
            <li><strong>Planificación inteligente:</strong> Usa nuestros análisis detallados para planificar tus siembras y cosechas de manera más inteligente.</li>
           
          </ul>
        </section>

        <section>
          <Carousel>
            {agricultureImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={image} alt={`Imagen ${index + 1}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        </section>

        <section>
          <h2>Beneficios</h2>
          <ul>
            <li><strong>Mejora tu productividad:</strong> Maximiza el rendimiento de tus cultivos con nuestros análisis detallados.</li>
            <li><strong>Reduce tus costos:</strong> Evita pérdidas costosas con nuestro monitoreo en tiempo real y nuestras alertas climáticas.</li>
            <li><strong>Toma decisiones más inteligentes:</strong> Usa nuestros análisis detallados para tomar decisiones basadas en datos.</li>
          </ul>
        </section>

        <section>
          <h2>Empieza tu viaje hoy mismo</h2>
          <p>
            Si estás listo para transformar tu agricultura con "Amigo Agricultor", ponte en contacto con nosotros hoy mismo. 
          </p>
        </section>
      </div>
    </animated.div>
    </>
  );
};

export default HomePage;
