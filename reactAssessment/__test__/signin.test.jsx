import { render, fireEvent } from '@testing-library/react';
import SigninButton from '../src/app/components/SigninButton';
import { signIn } from 'next-auth/react'; 

// Mock the signIn function
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('<SigninButton />', () => {
  beforeEach(() => {
    signIn.mockClear(); // Clear any previous mock calls
  });

  test('clicking on the button should call signIn() function', () => {
    // Render the SigninButton component
    const { getByText } = render(<SigninButton />);
    const button = getByText('Sign In');

    // Simulate a click event on the button
    fireEvent.click(button);

    // Check if the signIn() function is called
    expect(signIn).toHaveBeenCalled();
  });
});
