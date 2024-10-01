import React from "react";

export default function ListButton({ onClick, className = "" }) {
  return (
    <button onClick={onClick} className={className}>
      Delete item
    </button>
  );
}
