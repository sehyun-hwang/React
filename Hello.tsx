import { Component, CSSProperties } from "react"

export interface BoxPayload {
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
      style?: CSSProperties;
      comment?: string;
    }
  ];
}

export const PAYLOAD: BoxPayload = {
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

export interface AppState {
  id: string;
  src?: string;
  style: React.CSSProperties;
  comment: string;
}



export const getMedia ({ src }) =>
  src ? (
    <video src={src} />
  ) : (
    <img src="https://i2-prod.belfastlive.co.uk/incoming/article13722455.ece/ALTERNATES/s615/1PNG.png" />
  );
