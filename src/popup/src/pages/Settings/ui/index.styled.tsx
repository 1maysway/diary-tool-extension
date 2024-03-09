import { styled } from '@mui/material';


const WrapperStyled = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 0, 4),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
}));

export {
    WrapperStyled,
};
