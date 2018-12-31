import React from "react";

import "./Rating.css";

export default function Rating({ rate, max = 5 }) {
  const percentage = Math.round(rate / max * 100);

  return (
    <div className="rating">
      <div className="rating--colored" style={{ width: percentage + "%" }}>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <div>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
    </div>
  );
}
