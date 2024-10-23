import { useEffect, useRef, useState } from "react";
import Game from "./Game";
import { useLogin } from "../hooks/useLogin";

const baseURL = import.meta.env.VITE_BASE_URL;
const PM_API_TOKEN_KEY = "promptmaster-api-token";

const Login = () => {
  const { login, setLogin } = useLogin();
  const [loading, setLoading] = useState<boolean>(true);
  const pwRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("loading page, reading token from local storage...");
    const token = localStorage.getItem(PM_API_TOKEN_KEY);
    console.log("token :>> ", token);
    if (token) {
      // first check if token is right
      fetch(`${baseURL}/login/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then(async (response) => {
          if (!response.ok) {
            console.log("stored token is bad!");
            localStorage.removeItem(PM_API_TOKEN_KEY);
            setLogin("");
          } else {
            console.log("storing token in state...");
            localStorage.setItem(PM_API_TOKEN_KEY, token);
            setLogin(token);
          }
        })
        .catch((error) => {
          alert("Error: " + error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const enterPassword = () => {
    if (!pwRef.current) return;

    fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: pwRef.current.value }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.json();
      })
      .then(({ token }: { token: string }) => {
        console.log("token :>> ", token);
        console.log("storing token in local storage AND state...");
        localStorage.setItem(PM_API_TOKEN_KEY, token);
        setLogin(token);
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });

    pwRef.current.value = "";
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : login ? (
        <Game />
      ) : (
        <>
          <p>Enter password!</p>
          <input type="password" ref={pwRef} />
          <button onClick={enterPassword}>Enter</button>
        </>
      )}
    </>
  );
};

export default Login;
