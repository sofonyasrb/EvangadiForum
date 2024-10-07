import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "user" && password === "pass") {
      alert("Login successful!");
    } else {
      setMessage("Invalid username or password.");
    }
  };

  async function handlesubmit(e) {
    e.preventDefualt();
    try {
      await axios.post("/users/Signup", {
        username: UsernameVlaue,
        password: PassValue,
      });
    } catch (error) {
      console(error.response);
    }
  }

  return (
    <div className="outer-container">
      <div className="login-container">
        <h2>Login to your account</h2>
        <div className="new-account">
          Don't have an account?<a href="/">create a new account</a>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="password-container"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="/">
            <button className="login-button" type="submit">
              login
            </button>
          </a>
        </form>
        {message && <p style={{ color: "red" }}>{message}</p>}

        <div className="New-account-2">
          <a href="/">Create an account?</a>
        </div>
      </div>
      <div className="p-container">
        <a href="/">About</a>
        <h1>Evangadi Networks Q&A</h1>
        <div>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.!
          </p>
          <p>
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <a href="/">
            {" "}
            <button className="last-button">How it works</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
