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

const SelectsWrapperStyled = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 3),
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

export {
    WrapperStyled,
    SelectsWrapperStyled,
};
