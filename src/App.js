import "./App.css";
import ToDoList from "./comps/ToDoList";

function App() {
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
      <ToDoList  />
    </div>
  );
}

export default App;
