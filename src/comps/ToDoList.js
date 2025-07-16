import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/GridLegacy";
import ToDo from "./ToDo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Todoscont } from "../contexts/Todoscont";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ToDoList() {
  const { todos, setTodos } = useContext(Todoscont);
  const [titleIn, setTitelIn] = useState("");
  const [textFieldLabel, setTextFieldLabel] = useState(
    "Add your new task here"
  );
  const [display, setDisplay] = useState("all");
  const completedTodos = todos.filter((t) => {
    return t.stat;
  });
  const notCompletedTodos = todos.filter((t) => {
    return !t.stat;
  });

  let todosToBeOn = todos;

  if (display === "done") {
    todosToBeOn = completedTodos;
  } else if (display === "not") {
    todosToBeOn = notCompletedTodos;
  }

  const todosMap = todosToBeOn.map((t) => {
    return <ToDo key={t.id} ToDo={t} />;
  });

  useEffect(() => {
    const storTodos = JSON.parse(localStorage.getItem("toDos"));
    setTodos(storTodos);
  }, []);

  function changeDisplay(e) {
    setDisplay(e.target.value);
  }

  function addClick() {
    if (titleIn === "") {
      setTextFieldLabel("What are you thinking about ?");
    } else {
      const newTodo = {
        id: uuidv4(),
        Title: titleIn,
        Details: "",
        stat: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("toDos", JSON.stringify(updatedTodos));
      setTitelIn("");
      setTextFieldLabel("Add your new task here");
    }
  }
  function handleDeleteAll() {
    if (todos.length === 0) return;
    setTodos([]);
    localStorage.setItem("toDos", JSON.stringify([]));
  }

  return (
    <Container maxWidth="md">
      <Card
        sx={{ minWidth: 275, my: 1, maxHeight: "80vh", overflowY: "scroll" }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h2"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            My List
            <Divider />
            <ToggleButtonGroup
              style={{ marginTop: "30px" }}
              value={display}
              exclusive
              onChange={changeDisplay}
              aria-label="text alignment"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="done">Done</ToggleButton>
              <ToggleButton value="not">on going</ToggleButton>
            </ToggleButtonGroup>
            {todosMap}
            <Grid container spacing={2} marginTop={2}>
              <Grid
                item
                xs={6}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label={textFieldLabel}
                  variant="outlined"
                  value={titleIn}
                  onChange={(e) => {
                    setTitelIn(e.target.value);
                  }}
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "blue",
                    color: "white",
                  }}
                  variant="outlined"
                  startIcon={<AddBoxIcon />}
                  onClick={() => {
                    addClick();
                  }}
                >
                  Add
                </Button>
              </Grid>
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <IconButton
                  className="btnDAll"
                  aria-label="delete"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "red",
                    color: "white",
                  }}
                  onClick={handleDeleteAll}
                >
                  <DeleteIcon /> Delete All
                </IconButton>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
