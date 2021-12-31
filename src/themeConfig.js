import { createTheme } from "@mui/material/styles";
import { lightBlue, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: "#484848",
      main: "#212121",
      dark: "#000000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#73e8ff",
      main: "#29b6f6",
      dark: "#0086c3",
      contrastText: "#000",
    },
  },
});

export default theme;
