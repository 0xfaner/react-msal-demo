import { graphConfig } from "../config/auth";

export const getGraphMyPhoto = async (accessToken: string) => {
  const url = `${graphConfig.graphMeEndpoint}/photo/$value`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  };

  try {
    const response = await fetch(url, options);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    return console.log(error);
  }
};

export type GraphProfile = {
  displayName: string;
  surname: string;
  givenName: string;
  id: string;
  userPrincipalName: string;
  businessPhones: string[];
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation: string;
  preferredLanguage: string;
}

export const getGraphMyProfile = async (accessToken: string) => {
  const url = `${graphConfig.graphMeEndpoint}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return {
      displayName: json.displayName,
      surname: json.surname,
      givenName: json.givenName,
      id: json.id,
      userPrincipalName: json.userPrincipalName,
      businessPhones: json.businessPhones,
      jobTitle: json.jobTitle,
      mail: json.mail,
      mobilePhone: json.mobilePhone,
      officeLocation: json.officeLocation,
      preferredLanguage: json.preferredLanguage,
    } as GraphProfile;
  } catch (error) {
    return console.log(error);
  }
};

export const getGraphUserProfile = async (accessToken: string, userId: string) => {
  const url = `${graphConfig.graphUserEndpoint}/${userId}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return {
      displayName: json.displayName,
      surname: json.surname,
      givenName: json.givenName,
      id: json.id,
      userPrincipalName: json.userPrincipalName,
      businessPhones: json.businessPhones,
      jobTitle: json.jobTitle,
      mail: json.mail,
      mobilePhone: json.mobilePhone,
      officeLocation: json.officeLocation,
      preferredLanguage: json.preferredLanguage,
    } as GraphProfile;
  } catch (error) {
    return console.log(error);
  }
};
