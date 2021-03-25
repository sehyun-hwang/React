import React, { Component } from "react";
import { render } from "react-dom";
import { getMedia, AppState, BoxPayload } from "./Hello";
import "./style.css";

import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

// @ts-ignore
import { io } from "socket.io-client";

interface AppProps {
  src?: string;
}

const socket = io("wss://proxy.hwangsehyun.com/webrtc-onvif", {
  transports: ["websocket"]
});

class App extends Component<AppProps, AppState[]> {
  src: string;

  constructor(props) {
    super(props);
    Object.assign(this, props);

    const events = fromEvent(socket, "box");
    events.subscribe(console.log);

    payloads.subscribe(this.setState.bind(this));
  }

  render() {
    return this.state ? (
      <div className="box">
        {getMedia(this.src)}
        <div style={this.state.style}>{this.state.comment}</div>
      </div>
    ) : (
      <div />
    );
  }
}

render(<App />, document.getElementById("root"));
