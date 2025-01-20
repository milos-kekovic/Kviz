import { createContext } from 'react'

const defaultUser = {
    userName: '',
    language: 'en', // Default language code
  };

export const UserContext = createContext({
    user: defaultUser,
    setUser: () => {}, // Default setter function
  });
