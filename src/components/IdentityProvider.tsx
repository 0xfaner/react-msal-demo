import React, { useEffect, useState } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { tokenRequest } from "../config/auth";
import { getGraphMyPhoto, getGraphMyProfile } from "../api/graph";

export type Identity = {
  userid: string;
  profile: {
    displayName: string;
    surname: string;
    givenName: string;
    mail: string;
    avatar: string;
  };
};

export const IdentityContext = React.createContext<Identity | null>(null);

const IdentityProvider: React.FunctionComponent<{
  children: React.ReactNode
}> = (props) => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [identity, setIdentity] = useState<Identity | null>(null);

  useEffect(() => {
    if (isAuthenticated && !identity) {
      const account = instance.getActiveAccount();
      instance.acquireTokenSilent(tokenRequest)
        .then((result) => {
          Promise.all([
            getGraphMyProfile(result.accessToken),
            getGraphMyPhoto(result.accessToken)
          ]).then(([profile, avatar]) => ({
            userid: account!.localAccountId,
            profile: {
              displayName: profile!.displayName,
              surname: profile!.surname,
              givenName: profile!.givenName,
              mail: profile!.userPrincipalName,
              avatar: avatar!,
            }
          } as Identity)
          ).then((identity) => setIdentity(identity));
        });
    }
  }, [instance, isAuthenticated, identity]);

  return (
    <IdentityContext.Provider value={identity}>
      {props.children}
    </IdentityContext.Provider>
  );
};

export default IdentityProvider;
