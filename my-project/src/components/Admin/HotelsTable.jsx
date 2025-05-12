import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  IconButton,
  Avatar,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { useHotels } from "../../context/HotelContext";

const HotelsTable = () => {
  const { hotels, loading, deleteHotel } = useHotels();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      p={3}
      sx={{
        bgcolor: isDarkMode ? "#1e1e1e" : "#ffffff",
        borderRadius: 2,
        boxShadow: 2,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h5" mb={2} color="textPrimary">
        Hotel List
      </Typography>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: isDarkMode ? "#2c2c2c" : "#f5f5f5" }}>
            {[
              "Name",
              "Image",
              "Location",
              "Rating",
              "Description",
              "Actions",
            ].map((header) => (
              <TableCell
                key={header}
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {hotels.map((hotel) => (
            <TableRow
              key={hotel.Id}
              sx={{
                "&:hover": {
                  backgroundColor: isDarkMode ? "#2a2a2a" : "#f9f9f9",
                },
              }}
            >
              <TableCell>{hotel.name}</TableCell>
              <TableCell>
                <Avatar
                  src={hotel.image}
                  alt={hotel.name}
                  sx={{ width: 60, height: 60, borderRadius: 4 }}
                />
              </TableCell>
              <TableCell>{hotel.location}</TableCell>
              <TableCell>{hotel.rating}</TableCell>
              <TableCell>{hotel.description}</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => alert(`Viewing ${hotel.name}`)} // Handle View functionality
                  color="primary"
                >
                  <Visibility fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => alert(`Editing ${hotel.name}`)} // Handle Edit functionality
                  color="secondary"
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => deleteHotel(hotel.Id)}
                  color="error"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default HotelsTable;
