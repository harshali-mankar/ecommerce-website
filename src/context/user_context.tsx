import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface User {
  loginWithRedirect: () => {};
  logout: () => {};
  myUser: any;
}

interface Props {
  children: React.ReactNode;
}

const UserContext = React.createContext<User | null>(null);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();
  const [myUser, setMyUser] = useState<null | any>(null);

  useEffect(() => {
    if (isAuthenticated) {
      setMyUser(user);
    } else {
      setMyUser(false);
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
