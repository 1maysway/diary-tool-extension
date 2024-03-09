import React from "react";
import {RouteObj} from "../../../contexts";
import {Logins, Main, Settings } from "../../../pages";
import {PATHS} from "./paths";

const routes: RouteObj[] = [
    {
        path: PATHS.root,
        element: <Main />,
        name: 'Главная',
    },
    {
        path: PATHS.logins,
        element: <Logins />,
        name: 'Аккаунты',
    },
    {
        path: PATHS.settings,
        element: <Settings />,
        name: 'Настройки',
    },
];

export default routes;