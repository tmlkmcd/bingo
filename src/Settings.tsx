import * as React from "react";
import { clearPersist } from "./storage.ts";
import { useNavigate } from "react-router-dom";

export const Settings: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="settings">
      <button onClick={() => nav("/")}>Take me home</button>
      <br />
      <button
        onClick={() => {
          clearPersist();
        }}
      >
        Full reset
      </button>
    </div>
  );
};
