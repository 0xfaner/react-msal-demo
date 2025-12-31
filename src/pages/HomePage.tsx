import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Text, Button } from "@fluentui/react-components";
import { useIdentity } from "../hooks/useIdentity";
import { loginRequest } from "../config/auth";
import styles from "./HomePage.module.css";

const HomePage: React.FunctionComponent = () => {
  const { instance } = useMsal();
  const identity = useIdentity();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest)
  };
  const handleLogout = () => {
    instance.logoutRedirect();
  }

  return (
    <div className={styles.container}>
      <AuthenticatedTemplate>
        {identity && (
          <React.Fragment>
            <div className={styles.tab}>
              <div className={styles.avatarWrapper}>
                <img className={styles.avatarImg} src={identity.profile.avatar} alt="avatar" />
              </div>
              <div className={styles.profileInfo}>
                <div>
                  <div className={styles.label}>Display name:</div>
                  <div><Text>{identity.profile.displayName}</Text></div>
                </div>
                <div>
                  <div className={styles.label}>Mail:</div>
                  <div><Text>{identity.profile.mail}</Text></div>
                </div>
                <div>
                  <div className={styles.label}>User id:</div>
                  <div><Text>{identity.userid}</Text></div>
                </div>
              </div>
            </div>
            <Button appearance="primary" onClick={handleLogout}>Sign out</Button>
          </React.Fragment>
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className={styles.unauthenticatedContainer}>
          <Text size={500}>Please click the button below to sign in.</Text>
          <Button appearance="primary" onClick={handleLogin}>Sign in</Button>
        </div>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default HomePage;
