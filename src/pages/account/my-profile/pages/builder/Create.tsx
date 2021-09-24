import React from "react";
import { Steps } from "antd";

interface CreateProps {}

interface CreateState {}

class Create extends React.Component<CreateProps, CreateState> {
    render() {
        return (
            <Steps size="small" current={1}>
                <Steps.Step title="Personal Details" />
                <Steps.Step title="Choose Template" />
                <Steps.Step title="Preview & Finish" />
            </Steps>
        );
    }
}

export default Create;
