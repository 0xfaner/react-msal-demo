import { useContext } from "react";
import { IdentityContext, type Identity } from "../context/IdentityContext";

export const useIdentity = (): Identity | null => {
    return useContext(IdentityContext);
};
