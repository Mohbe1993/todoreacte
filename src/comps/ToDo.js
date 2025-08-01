import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/GridLegacy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { Todoscont } from "../contexts/Todoscont";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { TextField } from "@mui/material";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ToDo({ ToDo, handleCheckClick }) {
  const { todos, setTodos } = useContext(Todoscont);
  const [uptodo, setUpTodo] = useState({
    Title: ToDo.Title,
    Details: ToDo.Details,
  });

  function handleChecClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === ToDo.id) {
        t.stat = !t.stat;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("toDos", JSON.stringify(updatedTodos));
  }
  function handleDeleteConf() {
    const updatedDeletedTodos = todos.filter((t) => {
      return t.id !== ToDo.id;
    });
    setTodos(updatedDeletedTodos);
    localStorage.setItem("toDos", JSON.stringify(updatedDeletedTodos));
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [update, setUpdate] = React.useState(false);

  const handleUpdateOpen = () => {
    setUpdate(true);
  };

  const handleUpdateClose = () => {
    setUpdate(false);
  };
  function handleUpdateConf() {
    const updatedTodos = todos.map((t) => {
      if (t.id === ToDo.id) {
        return { ...t, Title: uptodo.Title, Details: uptodo.Details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("toDos", JSON.stringify(updatedTodos));

    setUpdate(false);
  }
  return (
    <>
      <Dialog
        open={update}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleUpdateClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You can edit here
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Title"
              fullWidth
              variant="standard"
              value={uptodo.Title}
              onChange={(e) => {
                setUpTodo({ ...uptodo, Title: e.target.value });
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Details"
              fullWidth
              value={uptodo.Details}
              variant="standard"
              onChange={(e) => {
                setUpTodo({ ...uptodo, Details: e.target.value });
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Disagree</Button>
          <Button onClick={handleUpdateConf}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            you can not get it back
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDeleteConf}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Card
        className="todocard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography
                  gutterBottom
                  variant="h4"
                  style={{
                    textAlign: "left",
                    textDecoration: ToDo.stat ? "line-through green" : "none",
                  }}
                >
                  {ToDo.Title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ textAlign: "left" }}
                >
                  {ToDo.Details}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <IconButton
                  onClick={() => {
                    handleChecClick();
                  }}
                  className="btn"
                  aria-label="completed"
                  style={{
                    color: ToDo.stat ? "white" : "green",
                    background: ToDo.stat ? "green" : "white",
                  }}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  className="btn"
                  aria-label="edit"
                  style={{ color: "yellow", background: "white" }}
                  onClick={handleUpdateOpen}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  className="btn"
                  aria-label="delete"
                  style={{ color: "red", background: "white" }}
                  onClick={handleClickOpen}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
