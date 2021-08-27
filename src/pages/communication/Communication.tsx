import { Tabs } from "antd";
import React from "react";
import Chat from "./chat/Chat";

export interface CommunicationProps {}

export interface CommunicationState {}

class Communication extends React.Component<CommunicationProps, CommunicationState> {
    render() {
        return (
            <Tabs defaultActiveKey="1" centered>
                <Tabs.TabPane tab="Chat" key="1">
                    <Chat />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Video Meeting" key="2">
                    Content of Tab Pane 2
                </Tabs.TabPane>
            </Tabs>
        );
    }
}

export default Communication;
