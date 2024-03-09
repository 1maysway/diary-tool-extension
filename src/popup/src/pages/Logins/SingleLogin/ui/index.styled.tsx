import { styled } from '@mui/material';


const WrapperStyled = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 0, 4),
    gap: theme.spacing(3),
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    alignItems: 'center',
}));

const InputsWrapperStyled = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 3),
    gap: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    alignItems: 'center',
    width: '100%',
}));

const HeaderStyled = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 3),
    gap: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: '100%',
    alignItems: 'center',
}));

export {
    WrapperStyled,
    HeaderStyled,
    InputsWrapperStyled,
};
