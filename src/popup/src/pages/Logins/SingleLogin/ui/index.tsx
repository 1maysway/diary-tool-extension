import {HeaderStyled, InputsWrapperStyled, WrapperStyled } from "./index.styled";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {Box, Button, Checkbox, Chip,
    FormControl,
    IconButton,
    InputLabel,
    ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import { MainContext } from "src/contexts";
import {APP_STORAGE_PATHS, LoginData} from "shared";
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export type Props = {
    loginId?: LoginData['id'],
    onGoBack?: () => void,
}

export const SingleLogin = ({ loginId, onGoBack }: Props) => {
    const { logins, stands  } = useContext(MainContext);

    const standsIdsMapped = useMemo(() => {
        return stands?.map(stand => stand.id) || [];
    }, [stands]);

    const selectedLogin = useMemo(() => logins?.find(login => login.id === loginId), [loginId]);

    const [loginName, setLoginName] = useState<string>(selectedLogin?.login || '');
    const onChangeLoginName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginName(event.target.value);
    };

    const [password, setPassword] = useState<string>(selectedLogin?.password || '');
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const [name, setName] = useState<string>(selectedLogin?.name || '');
    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const isNameError = useMemo(() => {
        return logins?.some(login => login.name === name && login.id !== selectedLogin?.id);
    }, [name, selectedLogin?.id, logins]);

    const [standsIds, setStandsIds] = useState<string[]>(selectedLogin?.stands.map(stand => stand.id) || []);
    const onChangeStandsIds = (event: SelectChangeEvent<typeof standsIds>) => {
        const {
            target: { value },
        } = event;
        setStandsIds(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        setLoginName(selectedLogin?.login || '');
        setPassword(selectedLogin?.password || '');
        setName(selectedLogin?.name || '');
        setStandsIds(selectedLogin?.stands.map(stand => stand.id) || []);
    }, [selectedLogin?.id]);

    const onSubmit = async () => {
        await chrome.storage.local.set({
            [APP_STORAGE_PATHS.logins]: [
                ...logins.filter(login => login.id !== selectedLogin?.id),
                {
                    ...selectedLogin,
                    createdMs: selectedLogin?.createdMs || Date.now(),
                    id: selectedLogin?.id || uuidv4(),
                    login: loginName,
                    password,
                    name,
                    stands: standsIds.map(standId => ({
                        id: standId,
                        authToken: selectedLogin?.stands.find(stand => stand.id === standId)?.authToken,
                    })),
                } as LoginData,
            ],
        });

        onGoBack?.();
    };

    const onDeleteAccount = async () => {
        await chrome.storage.local.set({
            [APP_STORAGE_PATHS.logins]: logins.filter(login => login.id !== selectedLogin?.id),
        });
        onGoBack?.();
    };

    const canSubmit = !isNameError && standsIds.length > 0 && loginName && password && name;

    return (
        <WrapperStyled>
            <HeaderStyled>
                {
                    onGoBack && (
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={onGoBack}
                            fullWidth
                        >
                            Назад
                        </Button>
                    )
                }
                <Typography variant="h6">{selectedLogin ? 'Редактирование' : 'Создание'}</Typography>
            </HeaderStyled>
            <InputsWrapperStyled>
                <TextField
                    label="Логин"
                    variant="outlined"
                    fullWidth
                    value={loginName}
                    onChange={onChangeLoginName}
                />
                <TextField
                    label="Пароль"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={onChangePassword}
                />
                <TextField
                    label="Имя"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={onChangeName}
                    error={isNameError}
                    helperText={isNameError ? 'Такое имя уже существует' : ''}
                />
                <FormControl fullWidth>
                    <InputLabel id="multiple-stands-chip-label">Стэнды</InputLabel>
                    <Select
                        labelId="multiple-stands-chip-label"
                        id="multiple-stands-chip"
                        multiple
                        value={standsIds}
                        onChange={onChangeStandsIds}
                        input={<OutlinedInput id="select-stands-chip" label="Стэнды" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} size="small" />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        fullWidth
                    >
                        {standsIdsMapped.map((id) => (
                            <MenuItem
                                key={id}
                                value={id}
                            >
                                <Checkbox checked={standsIds.indexOf(id) > -1} />
                                <ListItemText primary={id} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button
                        variant="contained"
                        disabled={!canSubmit}
                        onClick={onSubmit}
                    >
                        {
                            selectedLogin ? 'Сохранить' : 'Создать'
                        }
                    </Button>
                    {
                        selectedLogin && (
                            <Button
                                variant="contained"
                                onClick={onDeleteAccount}
                                color="error"
                            >
                                Удалить
                            </Button>
                        )
                    }
                </Box>
            </InputsWrapperStyled>
        </WrapperStyled>
    );
};
