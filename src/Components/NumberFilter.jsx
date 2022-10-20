import React, { useState, useContext } from 'react';
import { TableContext } from '../context/TableContext';

function NumberFilter() {
  const { handleChangeColumnFilter } = useContext(TableContext);
  const [stateColumnFilter, setStateColumnFilter] = useState({
    columnfilter: 'population',
    comparisonfilter: '',
    valuefilter: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStateColumnFilter((oldState) => ({ ...oldState, [name]: value }));
  };
  return (
    <div>
      <select
        data-testid="column-filter"
        name="columnfilter"
        value={ stateColumnFilter.columnfilter }
        onChange={ handleChange }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparisonfilter"
        value={ stateColumnFilter.comparisonfilter }
        onChange={ handleChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <label htmlFor="name-filter">
        <input
          type="number"
          name="valuefilter"
          id="valuefilter"
          value={ stateColumnFilter.valuefilter }
          data-testid="value-filter"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleChangeColumnFilter(stateColumnFilter) }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumberFilter;
