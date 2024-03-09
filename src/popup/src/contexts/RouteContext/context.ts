import {createContext} from "react";
import {PATHS} from "../../setup/Router/config/paths";


export type RouteContext = {
    path: PATHS
    setPath: (route: PATHS) => void
}

export const routeContextDefaultValue: RouteContext = {
    path: PATHS.root,
    setPath: () => {}
};

export const RouteContext = createContext(routeContextDefaultValue)