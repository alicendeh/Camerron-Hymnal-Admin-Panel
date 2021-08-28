import React, { useEffect, useContext } from "react";
import AddHymnal from "./AddHymnal";
import ViewHymnal from "./ViewHymnal";
import AuthContext from "./context/Auth/AuthContext";

export default function MainScreen(props) {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "40%",
          height: "100vh",
          position: "fixed",
          marginLeft: 12,
        }}
      >
        <AddHymnal />
      </div>
      <div
        style={{
          width: "60%",
          height: "100vh",
          marginLeft: "42%",
        }}
      >
        <ViewHymnal />
      </div>
    </div>
  );
}
