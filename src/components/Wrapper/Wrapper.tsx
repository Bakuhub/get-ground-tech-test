import React, {ComponentType} from "react";
import { Toolbar, Typography} from "@mui/material";
import {
    ContentContainer, Footer, StyledAppBar, StyledTitle, WrapperContainer
} from "components/Wrapper/styled";

type WrapperComponentProps = {
    childComponent: ComponentType<any>;
};

class Wrapper extends React.Component<WrapperComponentProps> {

    render() {
        const {childComponent: ChildComponent} = this.props;

        return (
                <WrapperContainer>
                    <StyledAppBar position="static">
                        <Toolbar>
                            <StyledTitle variant="h1">
                                Books Search
                            </StyledTitle>
                        </Toolbar>
                    </StyledAppBar>

                    <ContentContainer>
                        <ChildComponent/>
                    </ContentContainer>

                    <Footer>
                        <Typography variant="body1">
                            © 2023 GetGround tech test - David Tse
                        </Typography>
                    </Footer>
                </WrapperContainer>
        );
    }
}


export default (
        Wrapper
);