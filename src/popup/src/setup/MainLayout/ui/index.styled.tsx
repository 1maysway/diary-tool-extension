import { styled } from '@mui/material';


const WrapperStyled = styled('div')(({ theme }) => ({
    height: '100%',
}));

const ContentWrapperStyled = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(6),
    height: '100vh',
    boxSizing: 'border-box',
}));

const ContentInnerWrapperStyled = styled('div')(({ theme }) => ({
    overflow: 'auto',
    height: '100%',
}));

export {
    WrapperStyled,
    ContentWrapperStyled,
    ContentInnerWrapperStyled,
};
