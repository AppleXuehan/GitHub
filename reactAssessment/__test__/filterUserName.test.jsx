// Mock Next.js environment
jest.mock("next/server", () => ({
  NextRequest: jest.fn(),
  NextResponse: jest.fn(),
}));

import axios from "axios";
import { fetchUsers } from "../src/app/api/users/route"; 

jest.mock("axios");

describe("fetchUsers function", () => {
  it("should fetch users with first name starting with 'G' or last name starting with 'W'", async () => {
    const mockResponse = {
      data: {
        total_pages: 1,
        data: [
          { id: 1, first_name: "George", last_name: "Washington", email: "george@example.com" },
          { id: 2, first_name: "John", last_name: "Adams", email: "john@example.com" },
          { id: 3, first_name: "Thomas", last_name: "Jefferson", email: "thomas@example.com" },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const users = await fetchUsers();

    expect(axios.get).toHaveBeenCalledWith("https://reqres.in/api/users?page=1");
    expect(users).toEqual([
      { id: 1, first_name: "George", last_name: "Washington", email: "george@example.com" },
    ]);
  });

  it("should throw an error if fetching data fails", async () => {
    axios.get.mockRejectedValue(new Error("Failed to fetch data"));

    await expect(fetchUsers()).rejects.toThrow("An error occurred while fetching data: Failed to fetch data");
  });
});
