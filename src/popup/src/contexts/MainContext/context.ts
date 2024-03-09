import {AppSettingsValues, defaultLogins, defaultSettings, defaultStands, LoginData, Stand} from "shared";
import {createContext} from "react";


export type SelectedData = {
    loginId: number,
    standId: string,
    workTabId: number,
};

export type MainContext = {
    logins: LoginData[];
    setLogins: (logins: LoginData[]) => void;
    settings: AppSettingsValues;
    setSettings: (settings: AppSettingsValues) => void;
    stands: Stand[],
    setStands: (stands: Stand[]) => void,
    selectedData?: SelectedData,
    setSelectedData: (selectedData: SelectedData) => void,
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
};

export const MainContext = createContext(MainContextDefault);
