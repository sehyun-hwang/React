import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";

import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

// @ts-ignore
import { io } from "socket.io-client";

interface AppProps {}
interface AppState {
  src?: string;
  style: React.CSSProperties;
  textContent: string;
}

interface BoxPayload {
  cctv: number;
  box: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  style: React.CSSProperties;
}

const socket = io("wss://proxy.hwangsehyun.com/webrtc-onvif", {
  transports: ["websocket"]
});

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);

            const PAYLOAD: BoxPayload = {
      cctv: 0,
      box: {
        top: 0.1,
        bottom: 0.2,
        left: 0.3,
        right: 0.4
      },
      style: {
        color: "red"
      }
    };

    const events = fromEvent(socket, "box");
    events.subscribe(console.log);
    const payloads = events.pipe(
      map(([id, payload]) => {


    const style: React.CSSProperties =
      typeof payload.style === "object" ? payload.style : {};
    Object.entries(PAYLOAD.box).forEach(
      ([key, value]) => (style[key] = 100 * value + "%")
    );

    this.state = {
      style,
      textContent: "Start editing to see some magic happen :)"
    };
    console.log(this.state);
      })
    );
    payloads.subscribe(console.log);
  }

  render() {
    return this.state? (
      <div className="box">
        <Hello src={this.state.src} />
        <div style={this.state.style}>{this.state.textContent}</div>
      </div>
    ) : (<div></div>);
  }
}

render(<App />, document.getElementById("root"));
