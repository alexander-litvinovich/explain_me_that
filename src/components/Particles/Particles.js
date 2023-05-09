import React from "react";
import "./Particles.css";

const iterate = new Array(18).fill(null);

const Particles = () => (
  <div className="Particles">
    {iterate.map((_,index) => (
      <div key={`b${index}`} className="Particles-box">
        <div key={`p${index}`} className="Particles-part" />
      </div>
    ))}
  </div>
);

export default Particles;
