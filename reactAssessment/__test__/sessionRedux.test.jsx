import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useSession } from 'next-auth/react';
import Route from '../src/app/components/Route';

// Mocking Redux store
const mockStore = configureStore([]);

// Mocking useSession hook
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Mocking UserList component
jest.mock('../src/app/components/UserList', () => () => <div>UserList</div>);

describe('Route component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      session: {
        items: {},
      },
    });
  });

  test('adds session to Redux and renders UserList component when session is authorized', () => {
    const sessionData = {
      user: {
        name: 'Apple Xuehan',
        email: 'applehxh@gmail.com',
        image: 'https://lh3.googleusercontent.com/a/ACg8ocL7Zk6jm1xu2_mJ9jeaqnzijqFUnSKANFVcB5zZ1LFFG7sZ0gkn=s96-c',
      },
      expires: '2024-05-20T12:53:35.060Z',
    };

    // Mocking useSession to return sessionData
    useSession.mockReturnValueOnce({ data: sessionData });

    render(
      <Provider store={store}>
        <Route />
      </Provider>
    );

    // Check if session data is added to Redux store
    const actions = store.getActions();
    expect(actions[0].type).toEqual('session/addSession');
    expect(actions[0].payload).toEqual(sessionData);

  });
});
