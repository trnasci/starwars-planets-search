import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const TableContext = createContext();

function Provider({ children }) {
  const [planetList, setPlanetList] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState([]);
  const [optionColumn, setOptionColumn] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const requestAPI = async () => {
    const endpoint = 'https://swapi.dev/api/planets';
    const data = await fetch(endpoint);
    const result = await data.json();
    const planets = result.results;
    setPlanetList(planets);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const handleChangeName = (event) => {
    const { value } = event.target;
    setNameFilter(value);
  };

  const handleChangeColumnFilter = (value, option) => {
    setColumnFilter((oldState) => ([...oldState, value]));
    setOptionColumn((oldState) => (oldState.filter((e) => e !== option)));
  };

  const handleOptionColumn = (option) => {
    setOptionColumn((oldState) => ([option, ...oldState]));
    setColumnFilter((oldState) => (oldState.filter((e) => e.columnfilter !== option)));
  };

  const handleClearFilters = () => {
    setOptionColumn([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']);
    setColumnFilter([]);
  };

  const contextValue = useMemo(() => ({
    planetList,
    nameFilter,
    columnFilter,
    optionColumn,
    handleChangeName,
    handleChangeColumnFilter,
    handleOptionColumn,
    handleClearFilters,
  }), [planetList, nameFilter, columnFilter, optionColumn]);

  return (
    <TableContext.Provider value={ contextValue }>
      { children }
    </TableContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
