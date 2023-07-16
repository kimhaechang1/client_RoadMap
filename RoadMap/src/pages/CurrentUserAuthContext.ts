import { createContext } from "react";

export const CurrentUserAuthContext = createContext<{
    auth : string,
    setAuth : React.Dispatch<React.SetStateAction<string>>
} | null>({
    auth : "",
    setAuth : ()=>{}
});