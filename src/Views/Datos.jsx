import React, { useState, useEffect, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTable, useSortBy } from 'react-table';
import ReactPaginate from 'react-paginate';
import 'react-tooltip/dist/react-tooltip.css';
import '../Css/TablaDatos.css';
import Navbar from './Navbar';

const CROP_CONDITIONS = {
  'Arroz': { temp: [20, 35], humidity: [70, 90] },
  'Sandia': { temp: [20, 35], humidity: [60, 80] },
  'Pera': { temp: [15, 25], humidity: [50, 80] },
  'Ajo': { temp: [10, 30], humidity: [50, 80] }, 
  'Cebolla': { temp: [10, 30], humidity: [50, 70] }, 
  'Cafe': { temp: [10, 30], humidity: [60, 100] }, 
  'Tomates': { temp: [18, 32], humidity: [60, 100] }, 

  'Zanahoria': { temp: [10, 30], humidity: [50, 90] }, 
  'Espinaca': { temp: [5, 30], humidity: [50, 90] }, 
  'Frijoles': { temp: [15, 35], humidity: [50, 80] }, 

  'Pepino': { temp: [15, 35], humidity: [60, 90] }, 
  'Lechuga': { temp: [5, 25], humidity: [50, 70] },
  'Calabaza': { temp: [20, 35], humidity: [70, 90] },
  'Pimiento': { temp: [18, 32], humidity: [60, 80] }, 


  'Maíz': { temp: [10, 40], humidity: [50, 90] }, 
  'Girasol': { temp: [10, 40], humidity: [30, 90] }, 
  'Trigo': { temp: [1, 35], humidity: [30, 90] },
  'Soja': { temp: [20, 40], humidity: [40, 90] }, 
};

const ALL_CROPS = Object.keys(CROP_CONDITIONS);

const Datos = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const animationProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    delay: 500,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('44.206.238.218');
        const jsonData = await response.json();

        const newCrops = jsonData.map(row => {
          const suitableCrops = [];
          const unsuitableCrops = [];

          ALL_CROPS.forEach(crop => {
            const conditions = CROP_CONDITIONS[crop];
            const isSuitable =
              row.temperature >= conditions.temp[0] && row.temperature <= conditions.temp[1] &&
              row.humidity >= conditions.humidity[0] && row.humidity <= conditions.humidity[1];

            if (isSuitable) suitableCrops.push(crop);
            else unsuitableCrops.push(crop);
          });

          return { ...row, suitableCrops, unsuitableCrops };
        });

        setData(newCrops);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const isTempSuitableForPlanting = (temp, humidity) => temp >= 10 && temp <= 35 && humidity >= 40 && humidity <= 80;


  const handlePageClick = (data) => {
    let selected = data.selected;
    setCurrentPage(selected);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Temperatura',
        accessor: 'temperature',
      },
      {
        Header: 'Humedad',
        accessor: 'humidity',
      },
      {
        Header: 'Periodo',
        accessor: 'dayNight',
        Cell: ({ cell }) => (cell.value ? 'Día' : 'Noche'),
      },
      {
        Header: 'Apto para sembrar',
        accessor: (row) => isTempSuitableForPlanting(row.temperature, row.humidity),
        Cell: ({ cell, row }) => 
          cell.value ? (
            <div style={{ color: 'green' }}>
              <FontAwesomeIcon icon={faCheck} className="check-icon" />
            </div>
          ) : (
            <div style={{ color: 'red' }} data-tip={`No apto para sembrar: ${row.original.unsuitableCrops.join(', ')}`}>
              <FontAwesomeIcon
                icon={faTimes}
                className="times-icon"
                data-for={`tooltip-${row.index}`}
              />
              <ReactTooltip id={`tooltip-${row.index}`} effect="solid" place="top" />
            </div>
          ),
      },
      {
        Header: 'Cultivos no aptos',
        accessor: 'unsuitableCrops',
        Cell: ({ cell: { value } }) => (
          <ul>
            {value.map((crop, index) => (
              <li key={index}>{crop}</li>
            ))}
          </ul>
        ),
      },
      {
        Header: 'Cultivos aptos',
        accessor: 'suitableCrops',
        Cell: ({ cell: { value } }) => (
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {value.map((crop, index) => (
              <span key={index} style={{ color: 'green', margin: '2px' }}>{crop}</span>
            ))}
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  const offset = currentPage * itemsPerPage;

  return (
    <div className="datos-container">
      <Navbar />
      <animated.div style={animationProps} className="table-container">
        <table {...getTableProps()} className="data-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.slice(offset, offset + itemsPerPage).map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(rows.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </animated.div>
    </div>
  );
};

export default Datos;
