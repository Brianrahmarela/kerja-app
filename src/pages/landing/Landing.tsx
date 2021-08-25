import React from "react";

export interface LandingPageProps {}

export interface LandingPageState {}

class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
  state = { ready: false };
  render() {
    return <div>landing</div>;
  }
}

export default LandingPage;
