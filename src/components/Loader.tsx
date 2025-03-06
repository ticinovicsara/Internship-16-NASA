import React from "react";
import "../styles/loader.scss";

const Loader: React.FC = () => {
  return (
    <div id="universe">
      <div id="galaxy">
        <div className="circle"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} id={`orbit${i}`}>
            <div id={`pos${i}`}>
              <div id={`dot${i}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
