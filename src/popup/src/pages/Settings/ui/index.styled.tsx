import { styled } from '@mui/material';


const WrapperStyled = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 0, 4),
    gap: theme.spacing(2),
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
}));

const SettingsWrapperStyled = styled('div')(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(0, 3),
    gap: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    boxSizing: 'border-box',
    marginTop: theme.spacing(2),
}));

const SettingsItemStyled = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    boxSizing: 'border-box',
    width: '100%',
    // '&:not(:last-child)': {
    //     borderBottom: `1px solid ${theme.palette.divider}`,
    //     paddingBottom: theme.spacing(2),
    // },
}));

export {
    WrapperStyled,
    SettingsWrapperStyled,
    SettingsItemStyled,
};
