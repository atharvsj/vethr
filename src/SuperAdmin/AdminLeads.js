import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function ManageLeads() {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Ravi Singh",
      contactNo: "9876543210",
      gender: "Male",
      country: "India",
      status: "New",
      profilePicture: null,
    },
    {
      id: 2,
      name: "Suman Patel",
      contactNo: "9876543211",
      gender: "Female",
      country: "India",
      status: "Contacted",
      profilePicture: null,
    },
    {
      id: 3,
      name: "Arjun Verma",
      contactNo: "9876543212",
      gender: "Male",
      country: "India",
      status: "Interested",
      profilePicture: null,
    },
    {
      id: 4,
      name: "Neha Das",
      contactNo: "9876543213",
      gender: "Female",
      country: "India",
      status: "Not Interested",
      profilePicture: null,
    },
  ]);

  const [newLead, setNewLead] = useState({
    name: "",
    contactNo: "",
    gender: "",
    country: "",
    status: "",
    profilePicture: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setNewLead({
      ...newLead,
      profilePicture: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleAddLead = () => {
    if (isEditing) {
      setLeads(
        leads.map((lead) =>
          lead.id === editId ? { ...lead, ...newLead } : lead
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setLeads([...leads, { ...newLead, id: leads.length + 1 }]);
    }
    setNewLead({
      name: "",
      contactNo: "",
      gender: "",
      country: "",
      status: "",
      profilePicture: null,
    });
  };

  const handleEditLead = (id) => {
    const leadToEdit = leads.find((lead) => lead.id === id);
    setNewLead(leadToEdit);
    setIsEditing(true);
    setEditId(id);
  };

  const handleDeleteLead = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contactNo.includes(searchTerm)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2, mt: -5 }}>
        Manage Leads
      </Typography>

      <Grid container spacing={2}>
        {/* Left Side: Add/Edit Lead Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {isEditing ? "Edit Lead" : "Add Lead"}
              </Typography>
              <TextField
                label="Name"
                name="name"
                value={newLead.name}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Contact No"
                name="contactNo"
                value={newLead.contactNo}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />

              <TextField
                name="gender"
                value={newLead.gender}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
                select
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                label="Country"
                name="country"
                value={newLead.country}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="status"
                value={newLead.status}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
                select
                label="Status"
              >
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Contacted">Contacted</MenuItem>
                <MenuItem value="Interested">Interested</MenuItem>
                <MenuItem value="Not Interested">Not Interested</MenuItem>
              </TextField>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddLead}
                fullWidth
              >
                {isEditing ? "Update Lead" : "Add Lead"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box textAlign="center">
            <Avatar
              src={newLead.profilePicture}
              sx={{ width: 100, marginLeft: 5, height: 100, mb: 2 }}
            />
            <label htmlFor="profile-picture-upload">
              <input
                accept="image/*"
                id="profile-picture-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <Typography variant="caption">Upload Profile Picture</Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Search and List of Leads */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search Leads"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </Box>

      <Grid container spacing={2}>
        {filteredLeads.map((lead) => (
          <Grid item xs={12} md={6} lg={4} key={lead.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="h6">{lead.name}</Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditLead(lead.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteLead(lead.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Contact: {lead.contactNo}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Gender: {lead.gender}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Country: {lead.country}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {lead.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
