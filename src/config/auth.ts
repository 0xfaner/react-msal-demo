import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: `${process.env.REACT_APP_MSAL_APPLICARION_ID}`,
    authority: `${process.env.REACT_APP_MSAL_CLOUD_INSTANCE_ID}/${process.env.REACT_APP_MSAL_TENANT_ID}`,
    redirectUri: `${process.env.REACT_APP_MSAL_REDIRECT_URI}`,
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
  graphMeEndpoint: `${process.env.REACT_APP_GRAPH_ENDPOINT_URI}/v1.0/me`,
  graphUserEndpoint: `${process.env.REACT_APP_GRAPH_ENDPOINT_URI}/v1.0/users`
};
