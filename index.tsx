import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";

// @ts-ignore
import { io } from "socket.io-client";

interface AppProps {}
interface AppState {
  name: string;
}

const socket = io("wss://proxy.hwangsehyun.com/webrtc-onvif");

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "React"
    };

    setInterval(() => socket.send({}), 1000);
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>Start editing to see some magic happen :)</p>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
