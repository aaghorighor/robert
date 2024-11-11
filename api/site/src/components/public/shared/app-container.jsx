import React from "react";

export const AppContainer = (props) => {
  const { fluid, className = "", children } = props;

  return (
    <div
      className={`app-container ${
        fluid ? "app-container--fluid" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const ContainerWindow = ({ children, width, style  }) => {
  const containerStyle = width ? { width: `${width}%`, ...style } : style;
  return (
    <div className={`container_window`} style={containerStyle}>
      <div className={`center_window`}>{children}</div>
    </div>
  );
};


