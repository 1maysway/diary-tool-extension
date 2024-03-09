import { styled } from '@mui/material';


const WrapperStyled = styled('div')(({ theme }) => ({
    height: '100%',
}));

const ContentWrapperStyled = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(6),
    height: '100vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
}));

const ContentInnerWrapperStyled = styled('div')(({ theme }) => ({
    overflow: 'auto',
    flexGrow: 1,
    boxSizing: 'border-box',
}));

export {
    WrapperStyled,
    ContentWrapperStyled,
    ContentInnerWrapperStyled,
};
