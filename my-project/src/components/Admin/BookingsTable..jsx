import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import { useBookings } from "../../context/BookingContext";

const BookingsTable = () => {
  const { bookings, loading, deleteBooking } = useBookings();
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
        bgcolor: isDarkMode ? "#1e1e1e" : "#fff",
        borderRadius: 2,
        boxShadow: 2,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h5" mb={2}>
        Bookings List
      </Typography>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: isDarkMode ? "#2c2c2c" : "#f5f5f5" }}>
            {["User ID", "Hotel ID", "Room", "Check-In", "Check-Out", "Status", "Actions"].map((head) => (
              <TableCell key={head} sx={{ fontWeight: "bold" }}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((b) => (
            <TableRow
              key={b.id}
              sx={{
                "&:hover": {
                  backgroundColor: isDarkMode ? "#2a2a2a" : "#f9f9f9",
                },
              }}
            >
              <TableCell>{b.userId}</TableCell>
              <TableCell>{b.hotelId}</TableCell>
              <TableCell>{b.roomNumber}</TableCell>
              <TableCell>{b.checkIn}</TableCell>
              <TableCell>{b.checkOut}</TableCell>
              <TableCell>{b.status}</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => alert(`Viewing booking #${b.id}`)}
                  color="primary"
                >
                  <Visibility fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => deleteBooking(b.id)}
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

export default BookingsTable;
