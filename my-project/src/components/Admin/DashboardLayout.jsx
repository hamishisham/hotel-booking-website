// Layout.jsx
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  const sidebarWidth = 240;
  const headerHeight = 64;

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: `${sidebarWidth}px`, flexShrink: 0 }}>
        <Sidebar />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Header height={headerHeight} />
        <Box
          sx={{
            mt: `${headerHeight}px`,
            p: 3,
            minHeight: `calc(100vh - ${headerHeight}px)`,
            bgcolor: "#f5f7fa",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
