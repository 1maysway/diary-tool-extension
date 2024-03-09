import React, {useContext} from "react";
import {RouteContext} from "../../contexts/RouteContext";
import routes from "./config/routes";


export const Router = () => {
    const {path} = useContext(RouteContext);

    const element = routes.find((r) => r.path === path)?.element;

    return <>{element}</>;
}