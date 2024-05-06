import axios from "axios";
import { fetchUsers } from "../src/app/api/users/route"; 

// Mock Next.js environment
jest.mock("next/server", () => ({
  NextRequest: jest.fn(),
  NextResponse: jest.fn(),
}));

jest.mock('axios'); // Mock the entire axios module

test('fetches records from all pages', async () => {
  const mockGet = axios.get; // Access the mocked function

  // Define mocked responses for the URLs
  mockGet.mockResolvedValueOnce({ data: { page: 1, total_pages: 2, data: [
    { id: 1, first_name: "George", last_name: "Washington", email: "george@example.com" },
    { id: 2, first_name: "John", last_name: "Adams", email: "john@example.com" },
    { id: 3, first_name: "Thomas", last_name: "Jefferson", email: "thomas@example.com" },
    { id: 4, first_name: "Emma", last_name: "Wong", email: "emma.wong@example.com" }
  ] } });
  mockGet.mockResolvedValueOnce({ data: { page: 2, total_pages: 2, data: [] } });

  // Execute the fetchUsers function
  const usersData = await fetchUsers();

  // Assertions
  expect(mockGet).toHaveBeenCalledWith('https://reqres.in/api/users?page=1');
  expect(mockGet).toHaveBeenCalledWith('https://reqres.in/api/users?page=2');

  // Check if all records are fetched
  expect(usersData).toHaveLength(2); // Assuming there are 4 users in total
  //filter first name starting with 'G' or last name starting with 'W'
});
