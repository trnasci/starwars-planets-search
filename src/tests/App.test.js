import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithContext from './renderWithContext';
import testData from '../../cypress/mocks/testData';

afterEach(() => jest.clearAllMocks());

describe('Testes', () => {
  test('1- teste se existe um filtro por Nome', () => {
    renderWithContext(<App />);
    const filterName = screen.getByRole('textbox', { name: /filtro por nome:/i});
    expect(filterName).toBeInTheDocument();
  });

  test('2- teste se existe uma tabela na pagina', () => {
    renderWithContext(<App />);
    const columnName = screen.getByRole('columnheader', {  name: /name/i});
    const columnRotation = screen.getByRole('columnheader', {  name: /rotation period/i});
    const columnOrbital = screen.getByRole('columnheader', {  name: /orbital period/i});
    expect(columnName).toBeInTheDocument();
    expect(columnRotation).toBeInTheDocument();
    expect(columnOrbital).toBeInTheDocument();
  });

  test('3- teste se existe um filtro numérico e um botão de filtrar', () => {
    renderWithContext(<App />);
    const columnfilter = screen.getByTestId('column-filter');
    const comparisonfilter = screen.getByTestId('comparison-filter');
    const valuefilter = screen.getByTestId('value-filter');
    const btnfilter = screen.getByTestId('button-filter');
    const btnremovefilter = screen.getByTestId('button-remove-filters'); 
    expect(columnfilter).toBeInTheDocument();
    expect(comparisonfilter).toBeInTheDocument();
    expect(valuefilter).toBeInTheDocument();
    expect(btnfilter).toBeInTheDocument();
    expect(btnremovefilter).toBeInTheDocument();
  });

  test('4- teste se Realiza uma requisição para a API', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act(async () => {
      renderWithContext(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  test('5- teste se filtro do nome funciona', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act(async () => {
      renderWithContext(<App />);
    });
    const filterName = screen.getByRole('textbox', { name: /filtro por nome:/i});
    userEvent.type(filterName, 'oo');
    expect(await screen.findByRole('cell', { name: /tatooine/i })).toBeInTheDocument();
  });

  test('6- teste se filtro numerico funciona', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act(async () => {
      renderWithContext(<App />);
    });
    const columnfilter = screen.getByTestId('column-filter');
    const comparisonfilter = screen.getByTestId('comparison-filter');
    const valuefilter = screen.getByTestId('value-filter');
    userEvent.selectOptions(columnfilter, ['orbital_period']);
    userEvent.selectOptions(comparisonfilter, ['menor que']);
    userEvent.type(valuefilter, '400');
    const btnfilter = screen.getByTestId('button-filter');
    userEvent.click(btnfilter);
    expect(await screen.getByRole('cell', {  name: /dagobah/i})).toBeInTheDocument();
    const btnremovefilter = screen.getByTestId('button-remove-filters');
    userEvent.click(btnremovefilter);
    expect(await screen.getByRole('cell', {  name: /coruscant/i})).toBeInTheDocument();
  });

  test('7- teste se outros filtros numericos', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act(async () => {
      renderWithContext(<App />);
    });
    const columnfilter = screen.getByTestId('column-filter');
    const comparisonfilter = screen.getByTestId('comparison-filter');
    const valuefilter = screen.getByTestId('value-filter');
    const btnfilter = screen.getByTestId('button-filter');
    userEvent.selectOptions(columnfilter, ['population']);
    userEvent.selectOptions(comparisonfilter, ['maior que']);
    userEvent.type(valuefilter, '1000');
    userEvent.click(btnfilter);
    expect(await screen.getByRole('cell', {  name: /Tatooine/i})).toBeInTheDocument();
    userEvent.selectOptions(columnfilter, ['orbital_period']);
    userEvent.selectOptions(comparisonfilter, ['menor que']);
    userEvent.type(valuefilter, '402');
    userEvent.click(btnfilter);
    expect(await screen.getByRole('cell', {  name: /Tatooine/i})).toBeInTheDocument();
  });

  test('8- teste se o filtro selecionado aparece com o botão excluir', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act(async () => {
      renderWithContext(<App />);
    });
    const columnfilter = screen.getByTestId('column-filter');
    const comparisonfilter = screen.getByTestId('comparison-filter');
    const valuefilter = screen.getByTestId('value-filter');
    const btnfilter = screen.getByTestId('button-filter');
    userEvent.selectOptions(columnfilter, ['population']);
    userEvent.selectOptions(comparisonfilter, ['maior que']);
    userEvent.type(valuefilter, '1000');
    userEvent.click(btnfilter);
    expect(await screen.getByRole('button', {  name: /filtrar/i})).toBeInTheDocument();
  });
});