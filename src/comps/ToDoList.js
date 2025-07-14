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
import { useContext, useState } from "react";

export default function ToDoList() {
  const { todos, setTodos } = useContext(Todoscont);
  const [titleIn, setTitelIn] = useState("");
  const [textFieldLabel, setTextFieldLabel] = useState(
    "Add your new task here"
  );

  const todosMap = todos.map((t) => {
    return <ToDo key={t.id} ToDo={t} />;
  });
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
      setTodos([...todos, newTodo]);
      setTitelIn("");
      setTextFieldLabel("Add your new task here");
    }
  }
  return (
    <Container maxWidth="md">
      <Card sx={{ minWidth: 275, my: 1 }}>
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
              //   value={alignment}
              exclusive
              //   onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="left">All</ToggleButton>
              <ToggleButton value="center">Done</ToggleButton>
              <ToggleButton value="right">on going</ToggleButton>
            </ToggleButtonGroup>
            {todosMap}
            <Grid container spacing={2} marginTop={2}>
              <Grid
                item
                xs={8}
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
                />
              </Grid>
              <Grid
                item
                xs={4}
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
            </Grid>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
