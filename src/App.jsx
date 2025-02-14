import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoApp from "./TodoApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex  justify-center bg-gray-300 p-4">
      <TodoApp />
    </div>
  );
}

export default App;
