import React from 'react';
import { render } from '@testing-library/react';
import Provider from '../context/TableContext';

export default function renderWithContext(children) {
  return (
    render(
      <Provider>
        { children }
      </Provider>
    )
  )
};