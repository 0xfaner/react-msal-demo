import type { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: `${import.meta.env.VITE_MSAL_APPLICATION_ID}`,
    authority: `${import.meta.env.VITE_MSAL_CLOUD_INSTANCE_ID}/${import.meta.env.VITE_MSAL_TENANT_ID}`,
    redirectUri: `${import.meta.env.VITE_MSAL_REDIRECT_URI}`,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

export const tokenRequest = {
  scopes: ["email", "offline_access", "openid", "profile", "User.Read", "User.ReadBasic.All", "User.ReadWrite"]
};

export const loginRequest = {
  ...tokenRequest,
};

export const graphConfig = {
  graphMeEndpoint: `${import.meta.env.VITE_GRAPH_ENDPOINT_URI}/v1.0/me`,
  graphUserEndpoint: `${import.meta.env.VITE_GRAPH_ENDPOINT_URI}/v1.0/users`
};
