import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { Work as WorkIcon } from "@mui/icons-material";

export default function ProjectsView() {
  const [entries, setEntries] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [projectStats, setProjectStats] = useState([
    { title: "TOTAL COMPLETED", count: 0, color: "success.main" },
    { title: "TOTAL IN PROGRESS", count: 0, color: "primary.main" },
    { title: "TOTAL NOT STARTED", count: 0, color: "warning.main" },
    { title: "TOTAL ON HOLD", count: 0, color: "error.main" },
  ]);

  const API_URL = "https://tdtlworld.com/hrms-backend/ci_projects/";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
        setFilteredProjects(response.data);
        updateStats(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        typeof project?.title === "string" &&
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const updateStats = (data) => {
    let completed = 0;
    let inProgress = 0;
    let notStarted = 0;
    let onHold = 0;

    data.forEach((p) => {
      const progress = p.project_progress?.toString();

      if (progress === "100") completed++;
      else if (progress === "0") notStarted++;
      else if (progress === "hold") onHold++; // optional if you have it
      else inProgress++; // everything else = in progress
    });

    setProjectStats([
      { title: "TOTAL COMPLETED", count: completed, color: "success.main" },
      { title: "TOTAL IN PROGRESS", count: inProgress, color: "primary.main" },
      { title: "TOTAL NOT STARTED", count: notStarted, color: "warning.main" },
      { title: "TOTAL ON HOLD", count: onHold, color: "error.main" },
    ]);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "Invalid Date" : d.toLocaleDateString();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Set Up Projects
      </Typography>

      <Grid container spacing={2}>
        {projectStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {stat.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Typography variant="h4" color={stat.color}>
                  {stat.count}
                </Typography>
                <Box sx={{ ml: 1, color: "text.secondary" }}>
                  <WorkIcon />
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          List of all Projects
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="entries-select-label">Show entries</InputLabel>
            <Select
              labelId="entries-select-label"
              value={entries}
              onChange={(e) => setEntries(e.target.value)}
              label="Show entries"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PROJECTS</TableCell>
                <TableCell>CLIENT</TableCell>
                <TableCell>START DATE</TableCell>
                <TableCell>END DATE</TableCell>
                <TableCell>TEAM</TableCell>
                <TableCell>PRIORITY</TableCell>
                <TableCell>PROGRESS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.length > 0 ? (
                filteredProjects
                  .slice(0, parseInt(entries))
                  .map((project, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{project.title ?? "N/A"}</TableCell>
                      <TableCell>{project.client_id ?? "N/A"}</TableCell>
                      <TableCell>{formatDate(project.start_date)}</TableCell>
                      <TableCell>{formatDate(project.end_date)}</TableCell>
                      <TableCell>
                        {typeof project.assigned_to === "string"
                          ? project.assigned_to.split(",").join(", ")
                          : "N/A"}
                      </TableCell>
                      <TableCell>{project.priority ?? "N/A"}</TableCell>
                      <TableCell>
                        {(() => {
                          const progress = project.project_progress?.toString();
                          if (progress === "100") return "Completed";
                          if (progress === "0") return "Not Started";
                          if (progress === "hold") return "On Hold";
                          return "In Progress";
                        })()}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No records available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined" sx={{ mr: 1 }}>
            Previous
          </Button>
          <Button variant="outlined">Next</Button>
        </Box>
      </Paper>
    </Box>
  );
}
