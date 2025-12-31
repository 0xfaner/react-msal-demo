import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import {
  Link,
  useId,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverSurface
} from "@fluentui/react-components";
import { useIdentity } from "../hooks/useIdentity";
import { loginRequest } from "../config/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const AuthenticatedProfile: React.FunctionComponent = () => {
  const profileId = useId('profile-tab');
  const identity = useIdentity();

  if (!identity) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger disableButtonEnhancement>
        <div id={profileId} className={styles.profile}>
          <div className={styles.profileHint}>{identity.profile.givenName}</div>
          <Avatar image={{ src: identity.profile.avatar }} size={40} shape="circular" />
        </div>
      </PopoverTrigger>
      <PopoverSurface>
        <div className={styles.profileTabContainer}>
          <Avatar image={{ src: identity.profile.avatar }} size={48} shape="circular" />
          <div className={styles.profileTabInfo}>
            <div className={styles.profileTabName}>{identity.profile.displayName}</div>
            <div className={styles.profileTabMail}>{identity.profile.mail}</div>
            <Link href={`https://account.microsoft.com/?ref=MeControl&amp;username=${identity.profile.mail}`}>My Microsoft Account</Link>
          </div>
        </div>
      </PopoverSurface>
    </Popover>
  );
}

const UnauthenticatedProfile: React.FunctionComponent = () => {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginRedirect(loginRequest)
  };

  return (
    <div className={styles.profile} onClick={handleLogin}>
      <div className={styles.profileHint}>{"Sign in"}</div>
      <div className={styles.signInEmoji}>👤</div>
    </div>
  )
}

const Header: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div className={styles.brand} onClick={() => navigate("/")}>
        {"React MSAL Demo"}
      </div>
      <div className={styles.profileContainer}>
        <AuthenticatedTemplate>
          <AuthenticatedProfile />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <UnauthenticatedProfile />
        </UnauthenticatedTemplate>
      </div>
    </div>
  );
};

export default Header;
