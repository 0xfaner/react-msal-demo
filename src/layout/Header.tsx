import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Callout, Icon, Image, ImageFit, Link, Stack } from "@fluentui/react";
import { useBoolean, useId } from "@fluentui/react-hooks";
import { IdentityContext } from "../components/IdentityProvider";
import { loginRequest } from "../config/auth";
import { useNavigate } from "react-router-dom";

const AuthenticatedProfile: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const profileId = useId('profile-tab');

  return (
    <IdentityContext.Consumer>
      {(identity) => (
        <Stack id={profileId} className="header-profile" horizontal horizontalAlign="center" verticalAlign="center" onClick={toggleIsCalloutVisible}>
          <div className="header-profile-hint">{identity?.profile.givenName}</div>
          <Image className="header-profile-avatar" src={identity?.profile.avatar} imageFit={ImageFit.centerCover} />
          <Callout target={`#${profileId}`} hidden={!isCalloutVisible} onDismiss={toggleIsCalloutVisible}>
            <Stack className="header-profiletab" horizontal tokens={{ childrenGap: "20px" }}>
              <Image className="header-profiletab-avatar" src={identity?.profile.avatar} imageFit={ImageFit.centerCover} />
              <Stack verticalAlign="center" tokens={{ childrenGap: "5px" }}>
                <div className="header-profiletab-name">{identity?.profile.displayName}</div>
                <div className="header-profiletab-mail">{identity?.profile.mail}</div>
                <Link href={`https://account.microsoft.com/?ref=MeControl&amp;username=${identity?.profile.mail}`} underline>My Microsoft Account</Link>
              </Stack>
            </Stack>
          </Callout>
        </Stack>
      )}
    </IdentityContext.Consumer>
  );
}

const UnauthenticatedProfile: React.FunctionComponent = () => {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginRedirect(loginRequest)
  };

  return (
    <Stack className="header-profile" horizontal horizontalAlign="center" verticalAlign="center" onClick={handleLogin}>
      <div className="header-profile-hint">{"Sign in"}</div>
      <Icon className="header-profile-avatar" iconName="Contact" />
    </Stack>
  )
}

const Header: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <Stack className="header" horizontal horizontalAlign="space-between">
      <Stack className="header-brand" horizontalAlign="center" verticalAlign="center" onClick={() => navigate("/")}>
        {"React MSAL Demo"}
      </Stack>
      <AuthenticatedTemplate>
        <AuthenticatedProfile />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <UnauthenticatedProfile />
      </UnauthenticatedTemplate>
    </Stack>
  );
};

export default Header;
