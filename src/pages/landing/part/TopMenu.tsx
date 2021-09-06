import React from "react";

export interface TopMenuProps {
    judul: string;
}

export interface TopMenuState {
    pageReady: boolean;
}

class TopMenu extends React.Component<TopMenuProps, TopMenuState> {
    state = {
        pageReady: false,
    };
    render() {
        return (
            <>
                <h1>{this.props.judul}</h1>
            </>
        );
    }
}

export default TopMenu;
