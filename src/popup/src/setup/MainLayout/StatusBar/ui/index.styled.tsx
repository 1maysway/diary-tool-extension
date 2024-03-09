import { styled } from '@mui/material';


const WrapperStyled = styled('div')(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(0, 2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: `1px solid ${theme.palette.divider}`,
    boxSizing: 'border-box',
}));

export {
    WrapperStyled,
};
