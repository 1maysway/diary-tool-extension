import {PropsWithChildren} from "react";
import {ContentInnerWrapperStyled, ContentWrapperStyled, WrapperStyled } from "./index.styled";
import {MainContextProvider, RouteContextProvider} from "../../../contexts";
import { Header } from "../Header";


export const MainLayout = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <RouteContextProvider>
            <MainContextProvider>
                <WrapperStyled>
                    <Header />
                    <ContentWrapperStyled>
                        <ContentInnerWrapperStyled>
                            {
                                children
                            }
                        </ContentInnerWrapperStyled>
                    </ContentWrapperStyled>
                </WrapperStyled>
            </MainContextProvider>
        </RouteContextProvider>
    );
};
