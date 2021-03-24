import React from "react";

export default ({ src }) =>
  src ? (
    <video src={src} />
  ) : (
    <img src="https://i2-prod.belfastlive.co.uk/incoming/article13722455.ece/ALTERNATES/s615/1PNG.png" />
  );
