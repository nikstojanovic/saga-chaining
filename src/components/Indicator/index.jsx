import React from "react";

import './style.css';

const Indicator = (status) => (
  <div
    className="indicator"
    style={{
      background: status.status ? "#33D9B2" : "#FF5252"
    }}
  />
);

export default Indicator;
