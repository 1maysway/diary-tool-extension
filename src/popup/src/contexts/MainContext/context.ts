import {AppSettingsValues, defaultLogins, defaultSettings, defaultStands, LoginData, SelectedData, Stand} from "shared";
import {createContext} from "react";


export type MainContext = {
    logins: LoginData[];
    setLogins: (logins: LoginData[]) => void;
    settings: AppSettingsValues;
    setSettings: (settings: AppSettingsValues) => void;
    stands: Stand[],
    setStands: (stands: Stand[]) => void,
    selectedData?: SelectedData,
    setSelectedData: (selectedData: SelectedData) => void,
    appVersion: string,
};

const MainContextDefault: MainContext = {
    logins: defaultLogins,
    setLogins: () => {},
    settings: defaultSettings,
    setSettings: () => {},
    stands: defaultStands,
    setStands: () => {},
    selectedData: undefined,
    setSelectedData: () => {},
    appVersion: '1.0.0',
};

export const MainContext = createContext(MainContextDefault);
