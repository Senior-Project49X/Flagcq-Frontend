import React from "react";

interface login {
  text?: string;
}

export default function LoadingComponent({ text }: Readonly<login>) {
  return (
    <div>
      <div className="loading-container">
        <div className="spinner"></div>
        {text ? <p>{text}</p> : <p>Loading, please wait...</p>}
      </div>
    </div>
  );
}
