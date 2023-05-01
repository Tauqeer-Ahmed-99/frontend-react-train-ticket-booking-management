import { createContext } from "react";

export interface IUser {
  userId: string | number;
  username: string;
  email: string;
  phone: string;
  address: string;
}

export interface IUserContext {
  user: IUser | null;
  signup: (
    username: string,
    email: string,
    password: string,
    phone: string,
    address: string
  ) => Promise<any>;
  signin: (email: string, password: string) => Promise<any>;
  signout: () => void;
}

const UserContext = createContext<IUserContext>({
  user: null,
  signup: async (
    username: string,
    email: string,
    password: string,
    phone: string,
    address: string
  ) => {},
  signin: async (email: string, password: string) => {},
  signout: () => {},
});

export default UserContext;
