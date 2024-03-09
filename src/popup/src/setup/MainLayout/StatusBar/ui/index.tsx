import { useContext } from "react";
import {MainContext} from "src/contexts";
import { WrapperStyled } from "./index.styled";
import Typography from "@mui/material/Typography";

export const StatusBar = () => {
    const { appVersion } = useContext(MainContext);
    return (
        <WrapperStyled>
            <Typography variant="caption">Version: {appVersion}</Typography>
        </WrapperStyled>
    );
};