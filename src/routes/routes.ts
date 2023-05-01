import React from "react";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import DashboardScreen from "../screens/DashboardScreen";
import CancelTicketScreen from "../screens/CancelTicketScreen";
import BookingHistoryScreen from "../screens/BookingHistoryScreen";
import ShowTicketsScreen from "../screens/ShowTicketsScreen";
import TicketDetailsScreen from "../screens/TicketDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";

export enum Routes {
  LandingScreen = "/",
  LoginScreen = "/login",
  SignupScreen = "/signup",
  DashboardScreen = "/dashboard",
  CancelTicketScreen = "/cancel-ticket",
  CancelTicketDetailsScreen = "/cancel-ticket/:action/:ticketId",
  BookingHistoryScreen = "/booking-history",
  ShowTicketsScreen = "/show-tickets",
  ShowTicketsDetailsScreen = "/show-tickets/:action/:ticketId",
  ProfileScreen = "/profile",
}

interface IRoute {
  path: Routes;
  name: string;
  element: React.FC;
}

const routes: IRoute[] = [
  { path: Routes.LandingScreen, name: "Landing Page", element: LoginScreen },
  { path: Routes.LoginScreen, name: "Login", element: LoginScreen },
  { path: Routes.SignupScreen, name: "Signup", element: SignupScreen },
  { path: Routes.DashboardScreen, name: "Dashboard", element: DashboardScreen },
  {
    path: Routes.CancelTicketScreen,
    name: "Cancel Tickets",
    element: CancelTicketScreen,
  },
  {
    path: Routes.CancelTicketDetailsScreen,
    name: "Cancel Tickets",
    element: TicketDetailsScreen,
  },
  {
    path: Routes.BookingHistoryScreen,
    name: "Booking History",
    element: BookingHistoryScreen,
  },
  {
    path: Routes.ShowTicketsScreen,
    name: "Show Tickets",
    element: ShowTicketsScreen,
  },
  {
    path: Routes.ShowTicketsDetailsScreen,
    name: "Show Tickets",
    element: TicketDetailsScreen,
  },
  {
    path: Routes.ProfileScreen,
    name: "Profile Screen",
    element: ProfileScreen,
  },
];

export default routes;
