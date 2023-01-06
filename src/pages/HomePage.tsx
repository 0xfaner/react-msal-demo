import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Stack, Image, Text, ImageFit, Label, PrimaryButton } from "@fluentui/react";
import { IdentityContext } from "../components/IdentityProvider";
import { loginRequest } from "../config/auth";

const HomePage: React.FunctionComponent = () => {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginRedirect(loginRequest)
  };
  const handleLogout = () => {
    instance.logoutRedirect();
  }

  return (
    <Stack horizontalAlign="center" tokens={{ childrenGap: "40px" }} style={{
      minHeight: "calc(100vh - var(--header-height))",
    }}>
      <AuthenticatedTemplate>
        <IdentityContext.Consumer>
          {(identity) => (
            <React.Fragment>
              <Stack className="tab" tokens={{ childrenGap: "20px" }} style={{
                width: "320px",
                padding: "40px 20px",
                marginTop: "40px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 0 20px #cccccc",
                background: "repeating-linear-gradient(23deg, #fff 0%, #fff 42.8%, #4a78b0 0%, #4a78b0 100%)",
              }}>
                <Stack horizontal horizontalAlign="center">
                  <Image className="avatar" src={identity?.profile.avatar} imageFit={ImageFit.centerCover} height={"210px"} width={"210px"} style={{
                    borderRadius: "50%",
                  }} />
                </Stack>
                <Stack tokens={{ childrenGap: "10px" }}>
                  <Stack>
                    <Label>Display name:</Label>
                    <Text>{identity?.profile.displayName}</Text>
                  </Stack>
                  <Stack>
                    <Label>Mail:</Label>
                    <Text>{identity?.profile.mail}</Text>
                  </Stack>
                  <Stack>
                    <Label>User id:</Label>
                    <Text>{identity?.userid}</Text>
                  </Stack>
                </Stack>
              </Stack>
              <PrimaryButton text="Sign out" onClick={handleLogout} />
            </React.Fragment>
          )}
        </IdentityContext.Consumer>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Stack tokens={{ childrenGap: "40px" }} style={{
          marginTop: "40px",
        }}>
          <Text variant="xLarge">Please click the button below to sign in.</Text>
          <PrimaryButton text="Sign in" onClick={handleLogin} />
        </Stack>
      </UnauthenticatedTemplate>
    </Stack>

  );
};

export default HomePage;
