import {ChangeCallbackButtonStyled, SelectsWrapperStyled, SettingsItemStyled, SettingsWrapperStyled, WrapperStyled} from "./index.styled";
import {
    ButtonGroup,
    Checkbox, Chip,
    FormControl,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Tooltip,
    Typography, Zoom
} from "@mui/material";
import {
    appHref,
    COOKIE_KEYS,
    LoginData, SelectedData,
    sendMessageExt,
    Stand,
    urlRegex, VisualActionProps
} from "shared";
import {MainContext} from "../../../contexts";
import React, {useContext, useEffect, useMemo, useState} from "react";
import jwtDecode from 'jwt-decode';
import LoadingButton from '@mui/lab/LoadingButton';


export const Main = () => {
    const { logins, stands, settings, selectedData } = useContext(MainContext);

    const [selectedLogin, setSelectedLogin] = useState<LoginData>();
    const [selectedStand, setSelectedStand] = useState<Stand>();

    const selectedStandUrl = useMemo(() => {
        return (settings.useDiaryUrl ? selectedStand?.diaryUrl : selectedStand?.url) || '';
    }, [selectedStand?.id]);

    const filteredLogins = useMemo(() => {
        setSelectedLogin(undefined);
        return (selectedStand?.id && logins.filter(login => login.stands.some(stand => stand.id === selectedStand?.id))) || undefined;
    }, [selectedStand?.id, logins]);

    const selectedLoginStand = useMemo(() => {
        return selectedLogin?.stands.find(stand => stand.id === selectedStand?.id);
    }, [selectedLogin?.id, selectedStand?.id]);

    const [customData, setCustomData] = useState<SelectedData['customData']>({
        keepAliveToken: settings.keepAliveToken,
        callbackUrl: selectedStandUrl,
    });

    const tokenExpires = useMemo(() => {
        const decoded = (selectedLoginStand?.authToken && jwtDecode<{ exp: number }>(selectedLoginStand.authToken)) || undefined;

        let res: string | undefined;

        if (decoded) {
            const now = new Date();
            const expirationDate = new Date(decoded.exp * 1000);

            // @ts-ignore
            const diffMilliseconds = expirationDate - now;

            const diffSeconds = Math.floor(diffMilliseconds / 1000);
            const diffMinutes = Math.floor(diffSeconds / 60);
            const diffHours = Math.floor(diffMinutes / 60);

            res = diffMinutes > 0 ? `${diffHours}h ${diffMinutes % 60}m ${diffSeconds % 60}s` : undefined;
        }

        setCustomData({
            ...customData,
            keepAliveToken: Boolean(res) && settings.keepAliveToken,
        });

        return res;
    }, [selectedLoginStand]);

    const [lastCallbackUrl, setLastCallbackUrl] = useState<string>();

    useEffect(() => {
        chrome.cookies.get({
            name: COOKIE_KEYS.lastCallbackUrl,
            url: appHref,
        }, (res) => {
            if (res) {
                setLastCallbackUrl(res.value);
                setCustomData({
                    ...customData,
                    callbackUrl: res.value
                })
            }
        });
    }, []);

    const onChangeKeepAliveToken = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomData({
            ...customData,
            keepAliveToken: event.target.checked
        })
    };

    const onChangeCallbackUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.onfocus?.(new FocusEvent("focus"));
        setCustomData({
            ...customData,
            callbackUrl: event.target.value
        })
    };

    useEffect(() => {
        setCustomData({
            ...customData,
            callbackUrl: selectedStandUrl,
        });
    }, [selectedStand?.id]);

    const isCallbackUrlValid = useMemo(() => {
        return urlRegex.test(customData.callbackUrl);
    }, [customData.callbackUrl]);

    const submitAllowed = Boolean(selectedLogin && selectedStand && customData.callbackUrl && !selectedData?.workTabId && isCallbackUrlValid);
    const isCallbackStand = Boolean(customData.callbackUrl === selectedStandUrl);

    const onClickAuth = async () => {
        if (!selectedStand || !selectedLoginStand || !selectedLogin) {
            return;
        }

        const gifsFolderPath = 'gifs/';

        const loaderUrl = await new Promise<string>(r => {
            chrome.runtime.getPackageDirectoryEntry((directoryEntry) => {
                directoryEntry.getDirectory(gifsFolderPath, {}, (imagesFolder) => {
                    const reader = imagesFolder.createReader();

                    reader.readEntries((entries) => {
                        r(chrome.runtime.getURL(gifsFolderPath + entries[Math.floor(Math.random() * entries.length)].name));
                    });
                });
            });
        });

        const facts = await fetch(chrome.runtime.getURL('jsons/facts.json')).then(res => res.json());

        const visualActionProps: VisualActionProps = {
            loaderUrl,
            fact: facts[Math.floor(Math.random() * facts.length)],
        };

        const selectedData = {
            loginId: selectedLogin.id,
            standId: selectedStand.id,
            customData,
        };

        sendMessageExt('background', 'initAuth', {}, selectedData, visualActionProps);
    };

    const onChooseLastCallbackUrl = () => {
        setCustomData({
            ...customData,
            callbackUrl: lastCallbackUrl || '',
        })
    };

    const onChooseStandCallbackUrl = () => {
        setCustomData({
            ...customData,
            callbackUrl: selectedStandUrl,
        })
    };

    return (
        <WrapperStyled>
            <Typography variant="h4">Главная</Typography>
            <SelectsWrapperStyled>
                <FormControl fullWidth>
                    <InputLabel id="stand">Стэнд</InputLabel>
                    <Select
                        labelId="stand"
                        value={selectedStand?.id || ''}
                        label="Стэнд"
                        onChange={(e, c) => {
                            setSelectedStand(stands.find(stand => (stand.id) === e.target.value))
                        }}
                        fullWidth
                        variant="filled"
                    >
                        {
                            stands.map(stand => (
                                <MenuItem value={stand.id}>{stand.id}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="login">Учетная запись</InputLabel>
                    <Select
                        labelId="login"
                        value={selectedLogin?.id || ''}
                        label="Учетная запись"
                        onChange={(e) => {
                            setSelectedLogin(logins.find(login => login.id === e.target.value))
                        }}
                        fullWidth
                        variant="filled"
                        disabled={!selectedStand}
                    >
                        {
                            filteredLogins?.map(login => (
                                <MenuItem value={login.id}>{login.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </SelectsWrapperStyled>
            <SettingsWrapperStyled>
                <SettingsItemStyled>
                    <Tooltip
                        TransitionComponent={Zoom}
                        title={tokenExpires && `Токен будет просрочен через: ${tokenExpires}`}
                        followCursor
                    >
                        <FormControlLabel
                            disabled={!tokenExpires}
                            control={
                                <Checkbox
                                    checked={Boolean(customData.keepAliveToken && tokenExpires)}
                                    onChange={onChangeKeepAliveToken}
                                />
                            }
                            label="Использовать предыдущий токен"
                        />
                    </Tooltip>
                </SettingsItemStyled>
                <Paper sx={{ paddingBlock: theme => theme.spacing(2) }}>
                    <SettingsItemStyled>
                        <TextField
                            disabled={!selectedStand}
                            fullWidth
                            label={'Callback URL'}
                            InputLabelProps={{ shrink: Boolean(customData.callbackUrl) }}
                            InputProps={{
                                endAdornment: isCallbackStand && (
                                    <InputAdornment position="end">
                                        <Chip label="Стэнд" variant="outlined" />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            value={customData.callbackUrl}
                            onChange={onChangeCallbackUrl}
                            error={!isCallbackUrlValid && Boolean(customData.callbackUrl)}
                            helperText={!isCallbackUrlValid && Boolean(customData.callbackUrl) && 'Невалидное значение'}
                        />
                        {
                            lastCallbackUrl && (
                                <ButtonGroup variant="outlined" disabled={!selectedStand || !selectedLogin}>
                                    <ChangeCallbackButtonStyled onClick={onChooseStandCallbackUrl}>Стэнд</ChangeCallbackButtonStyled>
                                    <ChangeCallbackButtonStyled onClick={onChooseLastCallbackUrl}>Сохранённый</ChangeCallbackButtonStyled>
                                </ButtonGroup>
                            )
                        }
                    </SettingsItemStyled>
                </Paper>
            </SettingsWrapperStyled>
            <LoadingButton loading={Boolean(selectedData?.workTabId)} variant="contained" onClick={onClickAuth} disabled={!submitAllowed}>Авторизоваться</LoadingButton>
        </WrapperStyled>
    );
};
