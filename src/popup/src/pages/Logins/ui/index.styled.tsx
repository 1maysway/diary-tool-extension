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

const ListStyled = styled('div')(({ theme }) => ({
    gap: theme.spacing(2),
    padding: theme.spacing(0, 3),
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: '100%',
}));

export {
    WrapperStyled,
    ListStyled
};
