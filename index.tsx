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
  id: string;
  src?: string;
  style: React.CSSProperties;
  comment: string;
}

interface BoxPayload {
  cctv: number;
  timestamp?: Date;
  boxs: [
    {
      id: string;
      box: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
      style?: React.CSSProperties;
      comment?: string;
    }
  ];
}

const PAYLOAD: BoxPayload = {
  cctv: 0,
  boxs: [
    {
      id: "person-1",
      box: {
        top: 0.1,
        bottom: 0.2,
        left: 0.3,
        right: 0.4
      },
      style: {
        color: "red"
      }
    }
  ]
};

const socket = io("wss://proxy.hwangsehyun.com/webrtc-onvif", {
  transports: ["websocket"]
});

class App extends Component<AppProps, AppState[]> {
  constructor(props) {
    super(props);

    const events = fromEvent(socket, "box");
    events.subscribe(console.log);

    const payloads = events.pipe(
      map(([id, payload]: [number, BoxPayload]) => {

        
        payload.boxs.map(({ id, box, style = {} }) => {
          Object.entries(box).forEach(
            ([key, value]) => (style[key] = 100 * value + "%")
          );

          this.state = {
            id,
            style,
            comment: "Start editing to see some magic happen :)"
          };

          console.log(123123, this.state);
          return <div>this.state</div>;
        });


      }));
    payloads.subscribe(this.setState.bind(this));
  }

  render() {
    return this.state ? (
      <div className="box">
        <Hello src={this.state.src} />
        <div style={this.state.style}>{this.state.comment}</div>
      </div>
    ) : (
      <div />
    );
  }
}

render(<App />, document.getElementById("root"));
