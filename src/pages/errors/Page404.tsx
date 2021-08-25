import { Button, Result } from "antd";
import React from "react";

export interface Error404Props {}

export interface Error404State {}

class Error404 extends React.Component<Error404Props, Error404State> {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => (window.location.hash = "/home")}
          >
            Back Home
          </Button>
        }
      />
    );
  }
}

export default Error404;
