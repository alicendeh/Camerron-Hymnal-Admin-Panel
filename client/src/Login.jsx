import React, { useContext, useState, useEffect } from "react";
import AuthContext from "./context/Auth/AuthContext";
import MainScreen from "./MainScreen";

export default function Login(props) {
  const authContext = useContext(AuthContext);
  const { loginUser, isAuthenticated } = authContext;
  const [Data, setData] = useState({ name: "", password: "" });
  const { name, password } = Data;

  const onChange = (e) => setData({ ...Data, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    loginUser({
      name,
      password,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/mainScreen");
    }
  }, [isAuthenticated, props.history]);

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "grid",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "grey",
          width: "50vw",
          display: "grid",
          justifyContent: "center",
          padding: 55,
          height: "50vh",
          boxShadow: "1px 5px 8px black",
        }}
      >
        <div>
          <h1>Login Into the system</h1>
        </div>
        <div>
          <label>Admins Username</label>

          <br />
          <br />
          <input
            style={{
              padding: 15,
              width: "20vw",
            }}
            type="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Admins Password</label>
          <br />
          <br />

          <input
            style={{
              padding: 15,
              width: "20vw",
            }}
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            style={{
              padding: 15,
              width: "22vw",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
