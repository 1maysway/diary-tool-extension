import { styled } from '@mui/material';


const WrapperStyled = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 100,
}));

const ButtonsWrapperStyled = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1.5, 0),
}));

export {
    WrapperStyled,
    ButtonsWrapperStyled,
};
