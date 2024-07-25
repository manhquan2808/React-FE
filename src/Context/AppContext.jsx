import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  async function getUser() {
    try {
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null); // Clear user if fetch fails
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }
  return (
    <AppContext.Provider
      value={{ token, setToken, user, setUser, selectedTask, setSelectedTask }}
    >
      {children}
    </AppContext.Provider>
  );
}
