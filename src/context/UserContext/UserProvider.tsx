import React, { useEffect, useState } from "react";
import UserContext, { IUser, IUserContext } from "./UserContext";
import { useLocation, useNavigate } from "react-router";
import { Routes } from "../../routes/routes";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const origin = window.location.origin
    .split(":")
    .filter((_, index) => index !== 2)
    .join(":");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
      if (
        pathname === Routes.LandingScreen ||
        pathname === Routes.LoginScreen ||
        pathname === Routes.SignupScreen
      ) {
        navigate(Routes.DashboardScreen);
      }
    } else {
      if (pathname !== Routes.SignupScreen) {
        navigate(Routes.LoginScreen);
      }
    }
  }, [navigate, pathname]);

  const signup = async (
    username: string,
    email: string,
    password: string,
    phone: string,
    address: string
  ) => {
    try {
      const url = `${origin}:8000/signup`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, phone, password, address }),
      });

      const parsedResponse = await res.json();

      if (parsedResponse.status === "success") {
        sessionStorage.setItem("user", JSON.stringify(parsedResponse.user));
        setUser(parsedResponse.user);
      }

      return parsedResponse;
    } catch (error: any) {
      console.log(error);
      return error.message;
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const url = `${origin}:8000/login`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const parsedResponse = await res.json();

      if (parsedResponse.status === "success") {
        sessionStorage.setItem("user", JSON.stringify(parsedResponse.user));
        setUser(parsedResponse.user);
      }
      return parsedResponse;
    } catch (error: any) {
      console.log(error);
      return error.message;
    }
  };

  const signout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    navigate(Routes.LoginScreen);
  };

  const context: IUserContext = { user, signup, signin, signout };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
