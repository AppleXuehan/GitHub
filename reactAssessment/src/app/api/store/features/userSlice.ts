import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserDataAPI } from "../../interface/Interface";

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (thunkAPI) => {
  try {
      let allUserData: User[] = [];
      let currentPage = 1;
      let totalPages = 1; // Initialize totalPages to 1 initially

      // Loop until currentPage is greater than totalPages
      while (currentPage <= totalPages) {
        const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
        const data: UserDataAPI = response.data;
        totalPages = data.total_pages; //Set the total pages to correct number
        allUserData = allUserData.concat(data.data); // Concatenate data from current page

        currentPage++; // Move to the next page
      }

      //Return all records with first name starting with “G”, or last name starting with “W”.
      const filteredUserData = allUserData.filter(user => {
        const firstNameStartsWithG = user.first_name?.startsWith('G');
        const lastNameStartsWithW = user.last_name?.startsWith('W');
        return firstNameStartsWithG || lastNameStartsWithW;
      });

      // Return the collected user data
      return filteredUserData;

  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error for handling in the slice
  }
},
);

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default UserSlice.reducer;
