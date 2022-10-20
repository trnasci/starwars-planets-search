import React from 'react';
import './App.css';
import NameFilter from './Components/NameFilter';
import NumberFilter from './Components/NumberFilter';
import Table from './Components/Table';

function App() {
  return (
    <main>
      <NameFilter />
      <NumberFilter />
      <Table />
    </main>
  );
}

export default App;
