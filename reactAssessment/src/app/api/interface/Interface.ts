export interface LoginUserData {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    expires: string;
}

export interface UserDataAPI {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    support: {
      url: string;
      text: string;
    };
  }

  export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
  