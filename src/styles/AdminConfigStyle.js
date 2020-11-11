import { fade, makeStyles } from "@material-ui/core/styles";
import { FlareSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  // margin: {
  //   margin: theme.spacing(1),
  //   marginTop: "9%",
  // },
  // center: {
  //   position: "fixed",
  //   right: "40%",
  // },
  container: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: 300,
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  formContainer: {
    height: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  b: {
    marginTop: "5%",
  },
  // p: {
  //   marginTop: "50%",
  //   marginLeft: "5%",
  //   fontWeight: "bold",
  // },
  alert: {
    color: "green",
    fontWeight: "600",
  },
}));

export default useStyles;
