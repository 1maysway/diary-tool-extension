import {Typography, styled } from '@mui/material';


type WithCurrentProps = {
    sIsCurrent: boolean
}
const WrapperStyled = styled('button', {
    shouldForwardProp: (prop) => prop !== 'sIsCurrent',
})<WithCurrentProps>(({ theme, sIsCurrent }) => ({
    width: '100%',
    cursor: 'pointer',
    border: 0,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.default,
    ...sIsCurrent && {
        backgroundColor: theme.palette.primary.light,
    },
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        '& *': {
            color: theme.palette.primary.contrastText,
        },
    },
}));

const TextStyled = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'sIsCurrent',
})<WithCurrentProps>(({ theme, sIsCurrent }) => ({
    color: sIsCurrent ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

export {
    WrapperStyled,
    TextStyled,
};
