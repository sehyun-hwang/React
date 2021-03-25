import React, { Component, ComponentState } from "react";
import { render } from "react-dom";
import { getMedia, getBox, AppState, BoxPayload } from "./Hello";
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

class App extends Component<AppProps, ComponentState> {
  src: string;

  boxStates: AppState[];

  constructor(props) {
    super(props);
    Object.assign(this, props);

    const events = fromEvent(socket, "box");
    //events.subscribe(console.log);

    const payloads = events.pipe(
      map(([id, payload]: [number, BoxPayload]) =>
        payload.boxs.map(({ id, box, style = {} }) => {
          Object.entries(box).forEach(
            ([key, value]) => (style[key] = 100 * value + "%")
          );

          return {
            id,
            style,
            comment: "Start editing to see some magic happen :)"
          };
        })
      )
    );
    payloads.subscribe(x => {
      console.log(x);
      this.boxStates = x;
      this.setState({});
    });
  }

  render() {
    const { src } = this;
    return this.state ? (
      <div className="box">
        {getMedia({ src })}
        {this.boxStates.map(getBox)}
      </div>
    ) : (
      <div />
    );
  }
}

render(<App />, document.getElementById("root"));
