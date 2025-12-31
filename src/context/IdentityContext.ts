import React from "react";

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
