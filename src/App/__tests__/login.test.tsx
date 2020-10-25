import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
  fireEvent,
} from '@testing-library/dom';

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Login', () => {
  let addressInputNode: any = null;
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    addressInputNode = screen.getByPlaceholderText('Jobcoin Address');
  });

  afterEach(() => {
    addressInputNode = null;
  });

  it('App loads the login page by default', async () => {
    expect(addressInputNode).toBeInTheDocument();
  });

  it('the login form has validation', async () => {
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => screen.getByRole('alert'));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please input a valid address'
    );

    fireEvent.change(addressInputNode, { target: { value: 'Banana' } });
    await waitFor(() => screen.getByRole('alert'));
    expect(addressInputNode.value).toBe('Banana');

    /*     fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Jobcoin History Graph/i)).toBeInTheDocument();
    //await waitFor(() => screen.getByPlaceholderText('Destination Address')); */
  });
});
