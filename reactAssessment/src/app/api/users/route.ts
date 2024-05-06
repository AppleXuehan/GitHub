import { User, UserDataAPI } from "../../interfaces"; 
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Define a global object to store original email addresses
const originalEmails: Record<string, string> = {};

export async function fetchUsers() {
  try {
    let allUserData: User[] = [];
    let currentPage = 1;
    let totalPages = 1; // Initialize totalPages to 1 initially

    // Loop until currentPage is greater than totalPages
    while (currentPage <= totalPages) {
      const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
      const data: UserDataAPI = response.data;
      totalPages = data.total_pages; // Set the total pages to correct number
      
      // Concatenate data from current page
      allUserData = allUserData.concat(data.data.filter(user => {
        const firstNameStartsWithG = user.first_name?.startsWith('G');
        const lastNameStartsWithW = user.last_name?.startsWith('W');
        return firstNameStartsWithG || lastNameStartsWithW;
      }));

      currentPage++; // Move to the next page
    }

    // Store original email addresses in the global object
    allUserData.forEach(user => {
      // Store only if not already present
      if (!originalEmails[user.id]) {
        originalEmails[user.id] = user.email;
      }
    });

    // Return the collected user data
    return allUserData;
  } catch (error: any) {
    // Handle network errors or other exceptions
    throw new Error(`An error occurred while fetching data: ${error.message}`);
  }
}

export async function GET(req: NextRequest) {
  // Initialize an empty array to store the user IDs
  let userIdsToUnmask: number[] = [];
  
  if(req.nextUrl.searchParams.get('userId')) {
    
    // Split the string by comma to get individual user IDs
    let userIdsSplit = req.nextUrl.searchParams.get('userId')?.split(',');

    // Loop through the split user IDs and add them to the array
    userIdsSplit?.forEach(userId => {
      userIdsToUnmask.push(parseInt(userId));
    });
  }

  try {
      // Fetch users data
      const usersData = await fetchUsers();

      // Map through the user data and mask each email address
      const maskedUserData = usersData.map(user => {
        // Check if the user ID is in the list of IDs to unmask
        if (userIdsToUnmask.includes(user.id)) {
          // If the user ID is in the list, unmask the email
          return { ...user, email: originalEmails[user.id] };
        } else {
          // If the user ID is not in the list, mask the email
          const maskedEmail = user.email.replace(/./g, '*');
          return { ...user, email: maskedEmail };
        }
      });

      // Define the response data
      const response: User[] = maskedUserData;

      return NextResponse.json(response, {
        status: 200,
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to get users" },
        {
          status: 500,
        }
      );
    }
  }