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

  function handleChecClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === ToDo.id) {
        t.stat = !t.stat;
      }
      return t;
    });
    setTodos(updatedTodos);
  }
  function handleDeleteConf() {
    const updatedDeletedTodos = todos.filter((t) => {
      return t.id !== ToDo.id;
    });
    setTodos(updatedDeletedTodos);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
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
                  style={{ textAlign: "left" }}
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
