import React from "react";

function DefaultLayout({ children }) {
  return (
    <div>
      <h1>Header</h1>
      {children}
    </div>
  );
}

export default DefaultLayout;
