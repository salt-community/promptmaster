import "./App.css";
import { LoginProvider } from "./components/LoginProvider";
import Login from "./components/Login";

function App() {
  return (
    <LoginProvider>
      <Login />
    </LoginProvider>
  );
}

export default App;
