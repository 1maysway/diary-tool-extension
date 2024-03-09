import {ChipsWrapperStyled, WrapperStyled} from "./index.styled";
import {LoginData} from "shared";
import {Chip, Typography} from "@mui/material";


export type Props = {
    login: LoginData,
    onClick: () => void
}
export const LoginCard = ({ login, onClick }: Props) => {
    return (
        <WrapperStyled
            key={login.id}
            elevation={2}
            variant="outlined"
            onClick={onClick}
        >
            <Typography>{login.name}</Typography>
            <ChipsWrapperStyled>
                {login.stands.map(stand => (
                    <Chip
                        key={stand.id}
                        label={stand.id}
                        size="small"
                        variant="outlined"
                        color="info"
                    />
                ))}
            </ChipsWrapperStyled>
        </WrapperStyled>
    );
};
