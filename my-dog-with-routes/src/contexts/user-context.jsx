import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  // Function to set the user and authentication state
  const loginUser = (userData) => {
    setUser(userData);
    setAuthenticated(true);
  };

  // Function to log out
  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('https://three-points.herokuapp.com/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const userData = response.data;
            loginUser(userData); // Set user and authentication state
          } else {
            localStorage.removeItem('token');
            setUser(null);
            setAuthenticated(false);
            navigate('/login');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [navigate]);

  const contextValue = {
    user,
    authenticated,
    loginUser,
    logoutUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
