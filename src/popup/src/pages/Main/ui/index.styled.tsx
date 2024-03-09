import {Button, styled } from '@mui/material';


const WrapperStyled = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 0, 4),
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
}));

const SelectsWrapperStyled = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 3),
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

const SettingsWrapperStyled = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1.5),
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

const SettingsItemStyled = styled(SettingsWrapperStyled)(({ theme }) => ({
    gap: theme.spacing(1),
}));

const ChangeCallbackButtonStyled = styled(Button)(({ theme }) => ({
    flexBasis: '50%',
}));

export {
    WrapperStyled,
    SelectsWrapperStyled,
    SettingsWrapperStyled,
    SettingsItemStyled,
    ChangeCallbackButtonStyled,
};
