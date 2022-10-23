import React, { useContext } from 'react';
import { TableContext } from '../context/TableContext';

function Table() {
  const { planetList, nameFilter, columnFilter } = useContext(TableContext);
  const nu3 = 3;
  let planetListTable = [];
  if (columnFilter.length === 1) {
    const filter = columnFilter[0].columnfilter;
    const number = columnFilter[0].valuefilter;
    const valuecomparison = columnFilter[0].comparisonfilter;
    planetListTable = planetList
      .filter((e) => {
        switch (valuecomparison) {
        case 'maior que':
          return Number(e[filter]) > Number(number);
        case 'menor que':
          return Number(e[filter]) < Number(number);
        default:
          return Number(e[filter]) === Number(number);
        }
      });
  } else if (columnFilter.length === 2) {
    const filter = columnFilter[0].columnfilter;
    const number = columnFilter[0].valuefilter;
    const valuecomparison = columnFilter[0].comparisonfilter;
    const filter1 = columnFilter[1].columnfilter;
    const number1 = columnFilter[1].valuefilter;
    const valuecomparison1 = columnFilter[1].comparisonfilter;
    planetListTable = planetList
      .filter((el) => {
        switch (valuecomparison) {
        case 'maior que':
          return Number(el[filter]) > Number(number);
        case 'menor que':
          return Number(el[filter]) < Number(number);
        default:
          return Number(el[filter]) === Number(number);
        }
      }).filter((e) => {
        switch (valuecomparison1) {
        case 'maior que':
          return Number(e[filter1]) > Number(number1);
        case 'menor que':
          return Number(e[filter1]) < Number(number1);
        default:
          return Number(e[filter1]) === Number(number1);
        }
      });
  } else if (columnFilter.length === nu3) {
    const filter = columnFilter[0].columnfilter;
    const number = columnFilter[0].valuefilter;
    const valuecomparison = columnFilter[0].comparisonfilter;
    const filter1 = columnFilter[1].columnfilter;
    const number1 = columnFilter[1].valuefilter;
    const valuecomparison1 = columnFilter[1].comparisonfilter;
    const filter2 = columnFilter[2].columnfilter;
    const number2 = columnFilter[2].valuefilter;
    const valuecomparison2 = columnFilter[2].comparisonfilter;
    planetListTable = planetList
      .filter((ele) => {
        switch (valuecomparison) {
        case 'maior que':
          return Number(ele[filter]) > Number(number);
        case 'menor que':
          return Number(ele[filter]) < Number(number);
        default:
          return Number(ele[filter]) === Number(number);
        }
      }).filter((el) => {
        switch (valuecomparison1) {
        case 'maior que':
          return Number(el[filter1]) > Number(number1);
        case 'menor que':
          return Number(el[filter1]) < Number(number1);
        default:
          return Number(el[filter1]) === Number(number1);
        }
      }).filter((e) => {
        switch (valuecomparison2) {
        case 'maior que':
          return Number(e[filter2]) > Number(number2);
        case 'menor que':
          return Number(e[filter2]) < Number(number2);
        default:
          return Number(e[filter2]) === Number(number2);
        }
      });
  } else {
    planetListTable = planetList
      .filter((element) => element.name.toLowerCase().includes(nameFilter.toLowerCase()));
  }

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Rotation Period</th>
          <th scope="col">Orbital Period</th>
          <th scope="col">Diameter</th>
          <th scope="col">Climate</th>
          <th scope="col">Gravity</th>
          <th scope="col">Terrain</th>
          <th scope="col">Surface Water</th>
          <th scope="col">Population</th>
          <th scope="col">Films</th>
          <th scope="col">Created</th>
          <th scope="col">Edited</th>
          <th scope="col">URL</th>
        </tr>
      </thead>
      <tbody>
        {planetListTable.map((element) => (
          <tr key={ element.name }>
            <td>{element.name}</td>
            <td>{element.rotation_period}</td>
            <td>{element.orbital_period}</td>
            <td>{element.diameter}</td>
            <td>{element.climate}</td>
            <td>{element.gravity}</td>
            <td>{element.terrain}</td>
            <td>{element.surface_water}</td>
            <td>{element.population}</td>
            <td>{element.films}</td>
            <td>{element.created}</td>
            <td>{element.edited}</td>
            <td>{element.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
