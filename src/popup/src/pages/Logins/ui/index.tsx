import {ListStyled, WrapperStyled} from "./index.styled";
import {MainContext} from "src/contexts";
import React, {useContext, useState} from "react";
import { LoginCard } from "../LoginCard";
import {Box, Button, IconButton, Typography} from "@mui/material";
import {LoginData} from "shared";
import {SingleLogin} from "../SingleLogin";
import AddIcon from '@mui/icons-material/Add';

export const Logins = () => {
    const { logins, stands, settings, selectedData } = useContext(MainContext);

    const [selectLoginId, setSelectLoginId] = useState<LoginData['id']>();
    const [toCreateAccount, setToCreateAccount] = useState(false);

    return (selectLoginId || toCreateAccount) ? (
        <SingleLogin
            loginId={selectLoginId}
            onGoBack={() => {
                setSelectLoginId(undefined);
                setToCreateAccount(false);
            }}
        />
    ) : (
        <WrapperStyled>
            <Typography variant="h4">Аккаунты</Typography>
            <Box sx={{paddingInline: 3, width: '100%', boxSizing: 'border-box'}}>
                <Button
                    onClick={() => setToCreateAccount(true)}
                    fullWidth
                    variant="contained"
                >
                    Создать
                </Button>
            </Box>
            <ListStyled>
                {logins?.map(login => (
                    <LoginCard key={login.id} login={login} onClick={() => setSelectLoginId(login.id)} />
                ))}
            </ListStyled>
        </WrapperStyled>
    );
};
