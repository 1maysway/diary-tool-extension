import {Paper, Typography, styled} from '@mui/material';


const WrapperStyled = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    gap: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    boxSizing: 'border-box',
    width: '100%',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.action.hover
    },
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
}));

const ChipsWrapperStyled = styled('div')(({ theme }) => ({
    gap: theme.spacing(1),
    display: 'flex',
}));

export {
    WrapperStyled,
    ChipsWrapperStyled,
};
