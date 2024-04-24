import axios from 'axios';
import { fetchUsers } from '../src/app/api/store/features/userSlice';

jest.mock('axios'); // Mock the entire axios module

test('fetches records from all pages', async () => {
  const mockGet = axios.get; // Access the mocked function

  // Define mocked responses for the URLs
  mockGet.mockResolvedValueOnce({ data: { page: 1, total_pages: 2, data: [
    { id: 1, first_name: 'John', last_name: 'Doe' },
    { id: 2, first_name: 'Jane', last_name: 'Smith' },
    { id: 3, first_name: 'George', last_name: 'Washington' },
    { id: 4, first_name: 'Grace', last_name: 'Kelly' }
  ] } });
  mockGet.mockResolvedValueOnce({ data: { page: 2, total_pages: 2, data: [] } });

  // Execute the fetchUsers thunk
  await fetchUsers()(jest.fn()); // Pass a mock dispatch function

  // Assertions
  expect(mockGet).toHaveBeenCalledWith('https://reqres.in/api/users?page=1');
  expect(mockGet).toHaveBeenCalledWith('https://reqres.in/api/users?page=2');
});
