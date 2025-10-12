import React, { Children } from "react";

const BaseNode = ({ title, id, children }) => {
  return (
    <div
      key={id}
      style={{
        position: "relative",
        minWidth: "220px",
         background: 'rgba(255, 255, 255, 1)', 
        border: "2px solid #1a192b",
        borderRadius: "8px",
        padding: "12px",
        minHeight: "150px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
    
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "8px",
          fontSize: "14px",
          color: "#1a192b",
        }}
      >
        {title}
      </div>

     
      {Children.map(children, (child, index) => (
        <div key={index} style={{ marginBottom: "8px" }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default BaseNode;
