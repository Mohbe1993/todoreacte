import { useState } from "react";
import "./App.css";
import ToDoList from "./comps/ToDoList";
import { v4 as uuidv4 } from "uuid";
import { Todoscont } from "./contexts/Todoscont";

const ctodos = [];
function App() {
  const [todos, setTodos] = useState(ctodos);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100vh",
        background: "#191b1f",
      }}
    >
      <Todoscont.Provider value={{ todos, setTodos }}>
        <ToDoList style={{ display: ctodos.length === 0 ? "none" : "block" }} />
      </Todoscont.Provider>
    </div>
  );
}

export default App;
