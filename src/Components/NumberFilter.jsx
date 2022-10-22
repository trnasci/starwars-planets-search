import React, { useState, useContext } from 'react';
import { TableContext } from '../context/TableContext';

function NumberFilter() {
  const { handleChangeColumnFilter,
    optionColumn,
    columnFilter,
    handleOptionColumn,
    handleClearFilters } = useContext(TableContext);
  const [stateColumnFilter, setStateColumnFilter] = useState({
    columnfilter: 'population',
    comparisonfilter: 'maior que',
    valuefilter: '0',
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
        {optionColumn.map((e) => <option key={ Math.random() }>{e}</option>)}
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
        onClick={ () => handleChangeColumnFilter(
          stateColumnFilter,
          stateColumnFilter.columnfilter,
          setStateColumnFilter(
            (oldState) => ({ ...oldState, columnfilter: 'population' }),
          ),
        ) }
      >
        Filtrar
      </button>
      {columnFilter.map((e) => (
        <span
          data-testid="filter"
          key={ e.columnfilter }
        >
          {e.columnfilter}
          {e.comparisonfilter}
          {e.valuefilter}
          <button
            type="button"
            name={ e.columnfilter }
            onClick={ () => handleOptionColumn(e.columnfilter) }
          >
            excluir
          </button>
        </span>))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => handleClearFilters() }
      >
        Remover todas filtragens
      </button>
    </div>
  );
}

export default NumberFilter;
