import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const TableContext = createContext();

function Provider({ children }) {
  const [planetList, setPlanetList] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

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

  const contextValue = useMemo(() => ({
    planetList,
    nameFilter,
    handleChangeName,
  }), [planetList, nameFilter]);

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
