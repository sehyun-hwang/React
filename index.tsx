import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";

import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

// @ts-ignore
import { io } from "socket.io-client";

interface AppProps {}
interface AppState {
  src?: string;
  style: object;
  textContent: string;
}

const socket = io("wss://proxy.hwangsehyun.com/webrtc-onvif");

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    const PAYLOAD = {
      CCTV: 0,
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

    const style: React.CSSProperties =
      typeof PAYLOAD.style === "object" ? PAYLOAD.style : {};
    Object.entries(PAYLOAD.box).forEach(
      ([key, value]) => (style[key] = 100 * value + "%")
    );

    this.state = {
      style,
      textContent: "Start editing to see some magic happen :)"
    };
    console.log(this.state);
    
    const clicks = fromEvent(socket, "box");
    clicks.subscribe(x => console.log(x));
  }

  render() {
    return (
      <div className="box">
        <Hello src={this.state.src} />
        <div style={this.state.style}>{this.state.textContent}</div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
