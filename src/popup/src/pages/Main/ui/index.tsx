import {SelectsWrapperStyled, WrapperStyled} from "./index.styled";
import {Button, MenuItem, Select, Typography} from "@mui/material";
import {APP_STORAGE_PATHS, LoginData, Stand} from "../../../../../shared";
import {MainContext, SelectedData} from "../../../contexts";
import {useContext, useMemo, useState} from "react";
import jwtDecode from 'jwt-decode';
import dayjs from "dayjs";


export const Main = () => {
    const { logins, stands } = useContext(MainContext);

    const [selectedLogin, setSelectedLogin] = useState<LoginData>();
    const [selectedStand, setSelectedStand] = useState<Stand>();

    const filteredLogins = useMemo(() => {
        setSelectedLogin(undefined);
        return (selectedStand?.id && logins.filter(login => login.standsIds.includes(selectedStand?.id))) || undefined;
    }, [selectedStand?.id, logins]);

    const tokenExpires = useMemo(() => {
        const decoded = (selectedLogin?.authToken && jwtDecode<{ exp: number }>(selectedLogin?.authToken)) || undefined;

        if (decoded) {
            return dayjs.duration(decoded.exp).humanize();
        }
    }, [selectedLogin?.id]);

    const onClickAuth = async () => {
        const boPath = '/sps/oauth/ae';
        const boParams = [
            'response_type=code',
            'access_type=offline',
            `client_id=${selectedStand?.clientId}`,
            'scope=openid+profile+birthday+contacts+snils+blitz_user_rights+blitz_change_password',
            `redirect_uri=${selectedStand?.url}${selectedStand?.authCallbackPath}`,
        ].join('&');

        const boUrl = encodeURIComponent([boPath, boParams].join('?'));
        const loginTechUrl = `${selectedStand?.authHost}/sps/login/methods/password?bo=${boUrl}`;

        const newTab = await chrome.tabs.create({ url: loginTechUrl });

        const onTabRemoved = (closedTabId: number) => {
            console.log('removed tab', closedTabId)
            if (closedTabId === newTab.id) {
                chrome.storage.local.remove(APP_STORAGE_PATHS.selectedData);

                chrome.tabs.onRemoved.removeListener(onTabRemoved);
            }
        };

        chrome.tabs.onRemoved.addListener(onTabRemoved);

        newTab.id && selectedLogin && selectedStand && chrome.storage.local.set({
            [APP_STORAGE_PATHS.selectedData]: {
                loginId: selectedLogin.id,
                standId: selectedStand.id,
                workTabId: newTab.id,
            } as SelectedData,
        });
    };

    const submitAllowed = selectedLogin && selectedStand;

    console.log('selectedStand', selectedStand)

    return (
        <WrapperStyled>
            <Typography variant="h4">Главная</Typography>
            <SelectsWrapperStyled>
                <Select
                    value={selectedStand?.id !== undefined ? selectedStand.id : undefined}
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
                <Select
                    value={selectedLogin?.id !== undefined ? selectedLogin.id + '' : '-1'}
                    label="Учетная запись"
                    onChange={(e, c) => {
                        setSelectedLogin(logins.find(login => (login.id + '') === e.target.value))
                    }}
                    fullWidth
                    variant="filled"
                    disabled={!selectedStand}
                >
                    {
                        filteredLogins?.map(login => (
                            <MenuItem value={login.id+''}>{login.name}</MenuItem>
                        ))
                    }
                </Select>
            </SelectsWrapperStyled>
            <Typography>Token: {tokenExpires}</Typography>
            <Button variant="contained" onClick={onClickAuth} disabled={!submitAllowed}>Авторизоваться</Button>
        </WrapperStyled>
    );
};
