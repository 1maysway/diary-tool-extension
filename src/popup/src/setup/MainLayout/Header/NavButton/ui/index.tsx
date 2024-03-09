import {TextStyled, WrapperStyled} from "./index.styled";


type Props = {
    onClick: () => void,
    children: React.ReactNode,
    isCurrent?: boolean,
};
export const NavButton = ({ onClick, children, isCurrent = false }: Props) => {
    return (
        <WrapperStyled onClick={onClick} sIsCurrent={isCurrent}>
            <TextStyled variant="body1" sIsCurrent={isCurrent}>
                {
                    children
                }
            </TextStyled>
        </WrapperStyled>
    );
};
