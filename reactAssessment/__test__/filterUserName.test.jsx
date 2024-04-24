import axios from 'axios'; 
import { fetchUsers } from '../src/app/api/store/features/userSlice'; 

describe('fetchUsers thunk', () => {
  it('should fetch users with first name starting with "G" or last name starting with "W"', async () => {
    const mockedData = {
      data: [
        { id: 1, first_name: 'George', last_name: 'Washington' },
        { id: 2, first_name: 'John', last_name: 'Adams' },
        { id: 3, first_name: 'Thomas', last_name: 'Jefferson' },
      ],
    };

    // Mock axios.get to return the mockedData
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockedData });

    // Dispatch the fetchUsers thunk
    const resultAction = await fetchUsers()(jest.fn(), jest.fn(), undefined);

    // Extract the payload from the resulting action
    const users = resultAction.payload;

    // Check if users contain only those with first name starting with "G" or last name starting with "W"
    const allMatch = users.every(user => {
      return user.first_name?.startsWith('G') || user.last_name?.startsWith('W');
    });

    // Assert that all users match the criteria
    expect(allMatch).toBe(true);
  });
});
