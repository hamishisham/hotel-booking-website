import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Avatar,
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { loading, deleteUser } = useState(false); // Optional: Add loading state if necessary

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredUsers = users.filter(user =>
    user[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (user) => {
    setSelectedUser(user);
    setEditMode(false);
    setViewOpen(true);
  };

  const handleEditToggle = () => setEditMode(!editMode);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`https://hotel-json-server-production.up.railway.app/${selectedUser.id}`, selectedUser)
      .then(() => {
        setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
        setViewOpen(false);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        setUsers(prev => prev.filter(u => u.id !== id));
      });
  };

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
        Users List
      </Typography>

      {/* Search and Filter Section */}
      <Box className="flex flex-wrap gap-4 mb-4">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Search by</InputLabel>
          <Select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            label="Search by"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="role">Role</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Users Table */}
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: isDarkMode ? "#2c2c2c" : "#f5f5f5" }}>
            {["Avatar", "Name", "Email", "Phone", "Role", "Actions"].map((header) => (
              <TableCell key={header} sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                "&:hover": {
                  backgroundColor: isDarkMode ? "#2a2a2a" : "#f9f9f9",
                },
              }}
            >
              <TableCell>
                <Avatar
                  src={`https://i.pravatar.cc/150?u=${user.email}`}
                  alt={user.name}
                  sx={{ width: 30, height: 30 }}
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => handleView(user)} color="primary">
                  <Visibility fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => { handleView(user); setEditMode(true); }} color="secondary">
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(user.id)} color="error">
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

export default Users;
