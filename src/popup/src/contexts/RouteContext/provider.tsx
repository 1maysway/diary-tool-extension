import React, {PropsWithChildren, useState} from "react";
import {PATHS} from "../../setup/Router/config/paths";
import { RouteContext } from "./context";

export const RouteContextProvider = ({ children }: PropsWithChildren<unknown>) => {
    const [path, setPath] = useState(PATHS.root);

    return (
        <RouteContext.Provider value={{path, setPath}}>
            {
                children
            }
        </RouteContext.Provider>
    );
};
