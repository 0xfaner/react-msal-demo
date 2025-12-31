import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../config/auth";

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  msalInstance.handleRedirectPromise().then((response) => {
    if (response) {
      msalInstance.setActiveAccount(response.account);
    }
  });
});

const AuthProvider: React.FunctionComponent<{
  children: React.ReactNode
}> = (props) => {
  return (
    <MsalProvider instance={msalInstance}>
      {props.children}
    </MsalProvider>
  );
};

export default AuthProvider;
