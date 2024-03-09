import React, {PropsWithChildren} from "react";
import {ContentInnerWrapperStyled, ContentWrapperStyled, WrapperStyled } from "./index.styled";
import {MainContextProvider, RouteContextProvider} from "../../../contexts";
import { Header } from "../Header";
import { StatusBar } from "../StatusBar";


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
                        <StatusBar />
                    </ContentWrapperStyled>
                </WrapperStyled>
            </MainContextProvider>
        </RouteContextProvider>
    );
};
