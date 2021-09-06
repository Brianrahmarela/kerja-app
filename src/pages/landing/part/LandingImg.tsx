import React, { Component } from 'react'
import bgLanding from '../../../assets/image/img-bg-landing.svg';
import { Image } from 'antd';


export class LandingImg extends Component {
  render() {
    return (
      <div>
        <Image style={{ padding: 0, margin: "0px 0px 70px 0px", }}
          src={bgLanding}
          preview={false}
          id="imglanding"
        />
      </div>
    )
  }
}

export default LandingImg
