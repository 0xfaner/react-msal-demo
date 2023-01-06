import React from "react";
import ReactDOM from "react-dom/client";
import { initializeIcons, ThemeProvider } from "@fluentui/react";
import AuthProvider from "./components/AuthProvider";
import IdentityProvider from "./components/IdentityProvider";
import App from "./App";
import "./index.css";

initializeIcons();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <IdentityProvider>
          <App />
        </IdentityProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
