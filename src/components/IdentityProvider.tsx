import React, { useEffect, useState } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { tokenRequest } from "../config/auth";
import { getGraphMyPhoto, getGraphMyProfile } from "../api/graph";
import { IdentityContext, type Identity } from "../context/IdentityContext";

const IdentityProvider: React.FunctionComponent<{
  children: React.ReactNode
}> = (props) => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || isLoading) {
      return;
    }

    const loadIdentity = async () => {
      try {
        setIsLoading(true);
        const account = instance.getActiveAccount();
        if (!account) {
          console.warn("No active account found");
          return;
        }

        const result = await instance.acquireTokenSilent(tokenRequest);
        const [profile, avatar] = await Promise.all([
          getGraphMyProfile(result.accessToken),
          getGraphMyPhoto(result.accessToken)
        ]);

        if (profile) {
          setIdentity({
            userid: account.localAccountId,
            profile: {
              displayName: profile.displayName,
              surname: profile.surname,
              givenName: profile.givenName,
              mail: profile.userPrincipalName,
              avatar: avatar || "",
            }
          } as Identity);
        }
      } catch (error) {
        console.error("Failed to load identity:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadIdentity();
  }, [instance, isAuthenticated, isLoading]);

  return (
    <IdentityContext.Provider value={identity}>
      {props.children}
    </IdentityContext.Provider>
  );
};

export default IdentityProvider;
