

//a qui estoy separando las descripcions para tener mejor organiado//*
const CROP_CONDITIONS = {
   
    'Arroz': {
        description: 'El arroz es un cultivo ampliamente cultivado en áreas con agua estancada y suelos aluviales. Es una de las principales fuentes de alimento en todo el mundo.',
        temperatureOptimal: [20, 35],
        humidityOptimal: [70, 90],
        tips: 'Siembra el arroz en parcelas inundadas con agua de 5 a 10 cm de altura. La temporada de cultivo depende de la región, pero generalmente es durante la temporada de lluvias.',
        season: 'Temporada de lluvias'
      },
      'Sandia': {
        description: 'La sandía es una fruta refrescante y jugosa que se cultiva en climas cálidos. Requiere temperaturas cálidas para un buen crecimiento y maduración de la fruta.',
        temperatureOptimal: [20, 35],
        humidityOptimal: [60, 80],
        tips: 'Planta las semillas de sandía en suelo bien drenado y con suficiente luz solar. La temporada de cultivo es primavera y verano.',
        season: 'Primavera y verano'
      },
      'Pera': {
        description: 'La pera es una fruta dulce y jugosa que se cultiva en climas templados. Requiere temperaturas moderadas para un buen crecimiento.',
        temperatureOptimal: [15, 25],
        humidityOptimal: [50, 80],
        tips: 'Planta los árboles de pera en suelo bien drenado y con buen drenaje. Poda los árboles en primavera para una mejor producción de frutas.',
        season: 'Primavera y otoño'
      },
      'Ajo': {
        description: 'El ajo es una planta bulbosa que se cultiva en una amplia variedad de climas. Requiere temperaturas frescas para su crecimiento.',
        temperatureOptimal: [10, 30],
        humidityOptimal: [50, 80],
        tips: 'Planta los dientes de ajo en otoño para una cosecha en primavera. Mantén el suelo bien drenado y evita el exceso de riego.',
        season: 'Otoño y primavera'
      },
      'Cebolla': {
        description: 'La cebolla es un bulbo popular en la cocina y se cultiva en una amplia gama de climas. Requiere temperaturas frescas para su desarrollo.',
        temperatureOptimal: [10, 30],
        humidityOptimal: [50, 70],
        tips: 'Siembra las semillas o bulbos de cebolla en suelo bien drenado. Riega moderadamente y evita el encharcamiento.',
        season: 'Otoño y primavera'
      },
      'Cafe': {
        description: 'El café es una planta cultivada por sus semillas, que se tuestan y se utilizan para hacer café. Se cultiva en regiones tropicales y subtropicales.',
        temperatureOptimal: [10, 30],
        humidityOptimal: [60, 100],
        tips: 'Planta los granos de café en suelos ricos en materia orgánica y sombra parcial. El café requiere un clima cálido y húmedo para un buen crecimiento.',
        season: 'Todo el año (depende de la variedad)'
      },

      'Tomates': {
        description: 'Los tomates son una hortaliza popular y se cultivan en una amplia variedad de climas debido a su versatilidad y demanda.',
        temperatureOptimal: [18, 32],
        humidityOptimal: [60, 100],
        tips: 'Siembra las semillas de tomate en un lugar soleado y con buen drenaje. Poda las ramas para mejorar la producción de frutas y evita el exceso de riego.',
        season: 'Primavera y verano'
      },
    
      'Zanahoria': {
        description: 'La zanahoria es una hortaliza popular y se cultiva en climas templados y fríos. Requiere temperaturas frescas para su desarrollo.',
        temperatureOptimal: [10, 30],
        humidityOptimal: [50, 90],
        tips: 'Siembra las semillas de zanahoria en suelo suelto y bien preparado. Riega regularmente para mantener el suelo húmedo y facilitar el crecimiento de las raíces.',
        season: 'Otoño y primavera'
      },
    
      'Espinaca': {
        description: 'La espinaca es una verdura de hojas verdes que se cultiva en climas frescos. Requiere temperaturas moderadas para un crecimiento óptimo.',
        temperatureOptimal: [5, 30],
        humidityOptimal: [50, 90],
        tips: 'Siembra las semillas de espinaca en suelos ricos en materia orgánica y con sombra parcial. Mantén el suelo húmedo para un crecimiento rápido.',
        season: 'Otoño y primavera'
      },

      'Frijoles': {
        description: 'Los frijoles son una fuente importante de proteínas y se cultivan en una amplia variedad de climas. Requieren temperaturas cálidas para su crecimiento.',
        temperatureOptimal: [15, 35],
        humidityOptimal: [50, 80],
        tips: 'Siembra los frijoles en un suelo bien drenado y rico en nutrientes. Mantén el suelo húmedo durante todo el ciclo de crecimiento y evita el exceso de agua para prevenir enfermedades.',
        season: 'Primavera y verano'
      },
    
      'Pepino': {
        description: 'El pepino es una hortaliza refrescante y se cultiva en climas cálidos. Requiere temperaturas cálidas para un buen desarrollo.',
        temperatureOptimal: [15, 35],
        humidityOptimal: [60, 90],
        tips: 'Planta los pepinos en un lugar soleado y protegido del viento. Proporciona un buen riego para evitar la amargura en los frutos.',
        season: 'Primavera y verano'
      },
    
      'Lechuga': {
        description: 'La lechuga es una hortaliza de hojas verdes que se cultiva en climas frescos. Requiere temperaturas moderadas para su crecimiento óptimo.',
        temperatureOptimal: [5, 25],
        humidityOptimal: [50, 70],
        tips: 'Siembra la lechuga en un suelo bien drenado y riega regularmente para mantener el suelo húmedo. Protege las plantas del calor excesivo para evitar el amargor.',
        season: 'Primavera y otoño'
      },
    
      'Calabaza': {
        description: 'La calabaza es una hortaliza popular y se cultiva en climas cálidos. Requiere temperaturas cálidas para su desarrollo.',
        temperatureOptimal: [20, 35],
        humidityOptimal: [70, 90],
        tips: 'Siembra las semillas de calabaza en un suelo fértil y en un lugar con pleno sol. Proporciona un riego regular durante el crecimiento y evita el encharcamiento del suelo.',
        season: 'Primavera y verano'
      },
    
      'Pimiento': {
        description: 'El pimiento es una hortaliza versátil que se cultiva en una amplia variedad de climas. Requiere temperaturas cálidas para su crecimiento.',
        temperatureOptimal: [18, 32],
        humidityOptimal: [60, 80],
        tips: 'Siembra los pimientos en un lugar soleado y protegido del viento. Proporciona un riego constante y evita el exceso de nitrógeno para evitar el crecimiento excesivo de hojas.',
        season: 'Primavera y verano'
      },
    
      'Maíz': {
        description: 'El maíz es un cultivo básico en la agricultura, utilizado tanto para consumo humano como para alimentación animal.',
        temperatureOptimal: [10, 30],
        humidityOptimal: [50, 90],
        tips: 'Siembra el maíz en un suelo bien preparado y con buen drenaje. Planta el maíz en bloques en lugar de filas para una mejor polinización.',
        season: 'Primavera y verano'
      },
    
      'Girasol': {
        description: 'El girasol es una planta que produce grandes flores amarillas y se cultiva en climas cálidos. Requiere temperaturas cálidas para un buen crecimiento.',
        temperatureOptimal: [10, 40],
        humidityOptimal: [30, 90],
        tips: 'Siembra las semillas de girasol en un lugar soleado y con buen drenaje. Riega regularmente, especialmente durante la etapa de floración.',
        season: 'Primavera y verano'
      },
    
      'Trigo': {
        description: 'El trigo es uno de los cereales más importantes del mundo y se utiliza para hacer harina y otros productos alimenticios.',
        temperatureOptimal: [10, 25],
        humidityOptimal: [30, 90],
        tips: 'Siembra el trigo en un suelo bien preparado y con una buena cantidad de nitrógeno. Riega durante el crecimiento y evita el exceso de humedad durante la etapa de maduración.',
        season: 'Otoño e invierno'
      },
    
      'Soja': {
        description: 'La soja es un cultivo importante en la agricultura y se cultiva en climas cálidos y húmedos. Requiere temperaturas cálidas para su desarrollo.',
        temperatureOptimal: [20, 40],
        humidityOptimal: [40, 90],
        tips: 'Siembra la soja en un suelo bien drenado y con un pH entre neutro y ligeramente ácido. Proporciona un riego adecuado y evita el encharcamiento del suelo.',
        season: 'Primavera y verano'
      }
    };

  export default CROP_CONDITIONS;
  