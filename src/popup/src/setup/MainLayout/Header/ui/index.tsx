import React, {useContext, useMemo, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ButtonsWrapperStyled, WrapperStyled} from "./index.styled";
import routes from 'src/setup/Router/config/routes';
import { RouteContext } from 'src/contexts/RouteContext';
import { PATHS } from 'src/setup/Router/config/paths';
import {NavButton} from "../NavButton";
import { ClickAwayListener } from '@mui/material';


export const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const {setPath, path} = useContext(RouteContext);

    const onClickRoute = (path: PATHS) => {
        setExpanded(!expanded);
        setPath(path);
    };

    const currentRoute = useMemo(() => {
        return routes.find(route => route.path === path);
    }, [path]);

    return (
        <ClickAwayListener onClickAway={() => setExpanded(false)}>
            <WrapperStyled>
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} elevation={2}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="header-content"
                        id="header"
                    >
                        <Typography>
                            Diary Tool - {currentRoute?.name}
                        </Typography>
                    </AccordionSummary>
                    <ButtonsWrapperStyled>
                        {
                            routes.map((route) => (
                                route.path && <NavButton onClick={() => onClickRoute(route.path)} key={route.path} isCurrent={path === route.path}>
                                    {
                                        route.name
                                    }
                                </NavButton>
                            ))
                        }
                    </ButtonsWrapperStyled>
                </Accordion>
            </WrapperStyled>
        </ClickAwayListener>
    );
};