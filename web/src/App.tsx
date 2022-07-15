import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

export function App() {

  const [user, setUser] = useState();

  return user ? <Home /> : <Login signInUser={setUser} />
}

// 