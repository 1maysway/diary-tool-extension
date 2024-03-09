import { MainContext } from "src/contexts";
import {SettingsItemStyled, SettingsWrapperStyled, WrapperStyled } from "./index.styled";
import {Checkbox, Divider, FormControlLabel, TextField, Typography} from "@mui/material";
import React, {useContext, useMemo} from "react";
import {APP_STORAGE_PATHS, AppSettingsValues, appSettingsViews} from 'shared';


export const Settings = () => {
    const { settings, selectedData } = useContext(MainContext);

    const appSettingsDetails = useMemo(() => {
        return Object.entries(appSettingsViews);
    }, []);

    return (
        <WrapperStyled>
            <Typography variant="h4">Настройки</Typography>
            <SettingsWrapperStyled>
                {
                    appSettingsDetails.map(([key, value], index) => {
                        const variants = {
                            boolean: (
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={settings[key as keyof AppSettingsValues] as boolean}
                                        onChange={(event) => {
                                            chrome.storage.local.set({
                                                [APP_STORAGE_PATHS.settings]: {
                                                    ...settings,
                                                    [key]: event.target.checked,
                                                }
                                            })
                                        }}
                                    />}
                                    label={value.title}
                                    labelPlacement="start"
                                    sx={{width: '100%', display: 'flex', justifyContent: 'space-between', m: 0}}
                                    disabled={Boolean(selectedData?.workTabId)}
                                />
                            ),
                            string: (
                                <TextField
                                    type="text"
                                    value={settings[key as keyof AppSettingsValues] as unknown as string}
                                    onChange={(event) => {
                                        chrome.storage.local.set({
                                            [APP_STORAGE_PATHS.settings]: {
                                                ...settings,
                                                [key]: event.target.value,
                                            }
                                        })
                                    }}
                                    label={value.title}
                                    fullWidth
                                    disabled={Boolean(selectedData?.workTabId)}
                                />
                            ),
                            number: (
                                <TextField
                                    type="number"
                                    value={settings[key as keyof AppSettingsValues] as unknown as number}
                                    onChange={(event) => {
                                        chrome.storage.local.set({
                                            [APP_STORAGE_PATHS.settings]: {
                                                ...settings,
                                                [key]: Number(event.target.value),
                                            }
                                        })
                                    }}
                                    label={value.title}
                                    fullWidth
                                    disabled={Boolean(selectedData?.workTabId)}
                                />
                            ),
                        };
                        return (
                            <>
                                <SettingsItemStyled>
                                    {
                                        variants[value.type]
                                    }
                                    {
                                        value.description && <Typography variant="caption" sx={{ml: 1}}>{value.description}</Typography>
                                    }
                                </SettingsItemStyled>
                                {
                                    index < appSettingsDetails.length - 1 && <Divider sx={{width: '100%'}} />
                                }
                            </>
                        );
                    })
                }
            </SettingsWrapperStyled>
        </WrapperStyled>
    );
};
