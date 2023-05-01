import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext/UserProvider";
import TicketsProvider from "./context/TicketsContext/TicketsProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  typography: {
    fontFamily: `'Poppins', "sans-serif"`,
    caption: {
      color: "grey",
    },
  },
});

root.render(
  <BrowserRouter>
    <CssBaseline>
      <UserProvider>
        <TicketsProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </TicketsProvider>
      </UserProvider>
    </CssBaseline>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
