import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const [isPremium, setIsPremium] = useState(
    JSON.parse(localStorage.getItem("isPremium")) || false,
  );

  const login = ({ token, user, isPremium }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isPremium", JSON.stringify(isPremium));

    setToken(token);
    setUser(user);
    setIsPremium(isPremium);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isPremium");

    setToken(null);
    setUser(null);
    setIsPremium(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isPremium,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
