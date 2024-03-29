import { waitFor, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import Login from '../login';

describe('Login', () => {
  let addressInputNode: any = null;

  beforeEach(() => {
    render(<Login />);

    addressInputNode = screen.getByPlaceholderText('Enter Koicoin Address');
  });

  afterEach(() => {
    addressInputNode = null;
  });

  it('App loads the login page by default', async () => {
    expect(addressInputNode).toBeInTheDocument();
  });

  it('the login form has validation', () => {
    act(async () => {
      const signinButton = screen.getByTestId('signin');

      await waitFor(() => {
        expect(signinButton.toBeVisible());
      });

      await fireEvent.click(signinButton);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(
          'Please input a valid address'
        );
      });

      fireEvent.change(addressInputNode, { target: { value: 'Banana' } });
      await waitFor(() => {
        expect(addressInputNode.value).toBe('Banana');
      });
    });
  });
});
