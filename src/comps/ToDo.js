import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/GridLegacy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ToDo({ Title, Details }) {
  return (
    <>
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
                  {Title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ textAlign: "left" }}
                >
                  {Details}
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
                  className="btn"
                  aria-label="delete"
                  style={{ color: "green", background: "white" }}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  className="btn"
                  aria-label="delete"
                  style={{ color: "yellow", background: "white" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  className="btn"
                  aria-label="delete"
                  style={{ color: "red", background: "white" }}
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
