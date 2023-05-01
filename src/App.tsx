import React from "react";
import { Navigate, Route, Routes as RoutesWrapper } from "react-router";
import { Routes } from "./routes/routes";
import routes from "./routes/routes";

function App() {
  return (
    <RoutesWrapper>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.path === Routes.LandingScreen ? (
              <Navigate to={Routes.LoginScreen} />
            ) : (
              <route.element />
            )
          }
        />
      ))}
    </RoutesWrapper>
  );
}

export default App;
