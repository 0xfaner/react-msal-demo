import { graphConfig } from "../config/auth";

export class GraphAPIError extends Error {
  statusCode?: number;
  originalError?: unknown;

  constructor(
    message: string,
    statusCode?: number,
    originalError?: unknown
  ) {
    super(message);
    this.name = "GraphAPIError";
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

const fetchGraphData = async <T>(url: string, accessToken: string): Promise<T> => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new GraphAPIError(
        `Graph API request failed with status ${response.status}`,
        response.status
      );
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof GraphAPIError) {
      throw error;
    }
    throw new GraphAPIError(
      `Failed to fetch data from Graph API: ${error instanceof Error ? error.message : String(error)}`,
      undefined,
      error
    );
  }
};

const fetchGraphBlob = async (url: string, accessToken: string): Promise<Blob> => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new GraphAPIError(
        `Graph API request failed with status ${response.status}`,
        response.status
      );
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    if (error instanceof GraphAPIError) {
      throw error;
    }
    throw new GraphAPIError(
      `Failed to fetch blob from Graph API: ${error instanceof Error ? error.message : String(error)}`,
      undefined,
      error
    );
  }
};

export const getGraphMyPhoto = async (accessToken: string): Promise<string | null> => {
  try {
    const url = `${graphConfig.graphMeEndpoint}/photo/$value`;
    const blob = await fetchGraphBlob(url, accessToken);
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to fetch user photo:", error);
    return null;
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
};

const mapGraphResponse = (json: Record<string, unknown>): GraphProfile => ({
  displayName: json.displayName as string,
  surname: json.surname as string,
  givenName: json.givenName as string,
  id: json.id as string,
  userPrincipalName: json.userPrincipalName as string,
  businessPhones: json.businessPhones as string[],
  jobTitle: json.jobTitle as string,
  mail: json.mail as string,
  mobilePhone: json.mobilePhone as string,
  officeLocation: json.officeLocation as string,
  preferredLanguage: json.preferredLanguage as string,
});

export const getGraphMyProfile = async (accessToken: string): Promise<GraphProfile> => {
  const url = `${graphConfig.graphMeEndpoint}`;
  const data = await fetchGraphData<Record<string, unknown>>(url, accessToken);
  return mapGraphResponse(data);
};

export const getGraphUserProfile = async (accessToken: string, userId: string): Promise<GraphProfile> => {
  const url = `${graphConfig.graphUserEndpoint}/${userId}`;
  const data = await fetchGraphData<Record<string, unknown>>(url, accessToken);
  return mapGraphResponse(data);
};
