import React from 'react';
import '../styles/design.module.css';

const Design: React.FC = () => {
  return (
    <div className="container">
      <div className="leftBox">
        <div className="text">企業名</div>
        <div className="text">今社の部門</div>
      </div>
      <div className="middleBox">
        <div className="text">企業部長</div>
      </div>
      <div className="rightBox">
        <div className="text">事業部門</div>
      </div>
    </div>
  );
};

export default Design;
