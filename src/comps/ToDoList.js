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
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
const ctodos = [
  {
    id: uuidv4(),
    Title: "d",
    Details: "d",
    stat: false,
  },
  {
    id: uuidv4(),
    Title: "",
    Details: "",
    stat: false,
  },
  {
    id: uuidv4(),
    Title: "",
    Details: "",
    stat: false,
  },
];

export default function ToDoList() {
  const [todos, setTodos] = useState(ctodos);
  const [titleIn, setTitelIn] = useState("");
  const todosMap = todos.map((t) => {
    return <ToDo key={t.id} Title={t.Title} Details={t.Details} />;
  });
  function addClick(params) {
    const newTodo = {
      id: uuidv4(),
      Title: titleIn,
      Details: "",
      stat: false,
    };
    setTodos([...todos, newTodo]);
    setTitelIn("");
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
                  label="Add here"
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
