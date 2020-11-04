import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>({
    margin: {
      margin: theme.spacing(1),
      marginTop: "9%"
    },
    center:{
      position:"fixed",
      right:"40%"
    },
    b:{
      marginTop:"5%"
    }
  }),
);

export default useStyles
