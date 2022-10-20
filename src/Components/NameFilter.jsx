import React, { useContext } from 'react';
import { TableContext } from '../context/TableContext';

function NameFilter() {
  const { handleChangeName } = useContext(TableContext);
  return (
    <label htmlFor="name-filter">
      Filtro por nome:
      {' '}
      <input
        type="text"
        name="name-filter"
        id="name-filter"
        data-testid="name-filter"
        onChange={ handleChangeName }
      />
    </label>
  );
}

export default NameFilter;
