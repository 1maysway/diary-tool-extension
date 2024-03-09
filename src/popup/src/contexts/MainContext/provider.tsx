import {AppSettingsValues, LoginData, APP_STORAGE_PATHS, defaultLogins, defaultSettings, Stand, defaultStands} from 'shared';
import {MainContext, SelectedData} from "./context";
import React, {PropsWithChildren, useEffect, useState} from "react";

export const MainContextProvider = ({children}: PropsWithChildren<unknown>) => {
    const [logins, setLogins] = useState<LoginData[]>();
    const [settings, setSettings] = useState<AppSettingsValues>();
    const [selectedData, setSelectedData] = useState<SelectedData>();
    const [stands, setStands] = useState<Stand[]>();

    useEffect(() => {
        (async () => {
            const storagedData = await chrome.storage.local.get([
                APP_STORAGE_PATHS.settings, APP_STORAGE_PATHS.logins, APP_STORAGE_PATHS.stands, APP_STORAGE_PATHS.selectedData,
            ]);
            setLogins(storagedData[APP_STORAGE_PATHS.logins]);
            setSettings(storagedData[APP_STORAGE_PATHS.settings]);
            setStands(storagedData[APP_STORAGE_PATHS.stands]);
            setSelectedData(storagedData[APP_STORAGE_PATHS.selectedData]);
        })();

        const onStorageChange = (changes: Record<string, chrome.storage.StorageChange>) => {
            if (changes[APP_STORAGE_PATHS.logins]) {
                setLogins(changes[APP_STORAGE_PATHS.logins].newValue);
            }
            if (changes[APP_STORAGE_PATHS.settings]) {
                setSettings(changes[APP_STORAGE_PATHS.settings].newValue);
            }
        }

        chrome.storage.local.onChanged.addListener(onStorageChange);

        return () => {
            chrome.storage.local.onChanged.removeListener(onStorageChange);
        }
    }, []);

    const value: MainContext = {
        logins: logins || defaultLogins,
        settings: settings || defaultSettings,
        stands: stands || defaultStands,
        selectedData: selectedData,
        setSelectedData: (selectedData) => {
            setSelectedData(selectedData);
            chrome.storage.local.set({[APP_STORAGE_PATHS.selectedData]: JSON.stringify(selectedData)});
        },
        setLogins: (logins) => {
            setLogins(logins);
            chrome.storage.local.set({[APP_STORAGE_PATHS.logins]: JSON.stringify(logins)});
        },
        setSettings: (settings) => {
            setSettings(settings);
            chrome.storage.local.set({[APP_STORAGE_PATHS.settings]: JSON.stringify(settings)});
        },
        setStands: (stands) => {
            setStands(stands);
            chrome.storage.local.set({[APP_STORAGE_PATHS.stands]: JSON.stringify(stands)});
        },
    };
    console.log(value)

    return (
        <MainContext.Provider value={value}>
            {
                children
            }
        </MainContext.Provider>
    );
}

