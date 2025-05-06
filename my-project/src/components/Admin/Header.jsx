import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Logo from "/logomini.PNG"; // Replace with your actual logo path

const Header = ({ height = 64 }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 240px)`,
        ml: "240px",
        bgcolor: "#ffffff",
        color: "#0D47A1",
        boxShadow: 2,
        height,
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-start" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <img src={Logo} alt="logo" style={{ height: 32, width: 32 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            BookNest
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
