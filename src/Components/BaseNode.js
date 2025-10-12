import React, { Children } from "react";

const BaseNode = ({ title, id, children, icon }) => {
  return (
    <div
      key={id}
      style={{
        position: "relative",
        minWidth: "280px",
        background: "#ffffff",
        border: "2px solid #1a1b1cff",
        borderRadius: "6px",
        overflow: "hidden",
        minHeight: "160px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
       
      <div
        style={{
          padding: "12px 16px",
          background: "#030303fc",
          color: "white",
          borderBottom: "1.5px solid #c7d2fe",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {icon && <span style={{ fontSize: "16px" }}>{icon}</span>}
        <div
          style={{
            fontWeight: "600",
            fontSize: "14px",
            color: "#ffffffff",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
      </div>

     
      <div style={{ padding: "16px" }}>
        {Children.map(children, (child, index) => (
          <div key={index} style={{ marginBottom: index < Children.count(children) - 1 ? "12px" : "0" }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseNode;