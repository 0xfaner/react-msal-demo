import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import AuthProvider from "./components/AuthProvider";
import IdentityProvider from "./components/IdentityProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
      <AuthProvider>
        <IdentityProvider>
          <App />
        </IdentityProvider>
      </AuthProvider>
    </FluentProvider>
  </StrictMode>,
)
