import React from "react";
import InventoryList from "./pages/InventoryList";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import UserToggle from "./components/UserToggle";

const App: React.FC = () => {
  const themeDark = createTheme({
    palette: {
      background: {
        default: "#161718",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <Box my={2} mx={3}>
        <UserToggle />
        <InventoryList />
      </Box>
    </ThemeProvider>
  );
};

export default App;
