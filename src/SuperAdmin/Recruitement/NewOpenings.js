import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  Card,
  CardContent,
  InputLabel,
  IconButton,
  Divider,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

// Importing Chart.js and React Chart.js wrapper
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// Helper function to simulate keyword extraction from resumes
const extractKeywordsFromResume = (text) => {
  const keywords = [
    "software engineer",
    "project management",
    "ui/ux",
    "developer",
    "frontend",
    "design",
  ]; // Example skills that can be extracted
  return keywords.filter((keyword) => text.toLowerCase().includes(keyword));
};

export default function NewOpenings() {
  const [openings, setOpenings] = useState([
    {
      id: 1,
      jobTitle: "Software Engineer",
      jobType: "Full-Time",
      postedOn: "2024-11-10",
      closingDate: "2024-12-10",
      positions: 3,
      description:
        "We are looking for a passionate Software Engineer with experience in React and Node.js.",
      designation: "Engineer",
      status: "Open",
    },
    {
      id: 2,
      jobTitle: "UI/UX Designer",
      jobType: "Contract",
      postedOn: "2024-11-12",
      closingDate: "2024-12-12",
      positions: 2,
      description:
        "Design user interfaces and create beautiful user experiences using Adobe XD and Figma.",
      designation: "Designer",
      status: "Closed",
    },
    {
      id: 3,
      jobTitle: "Project Manager",
      jobType: "Full-Time",
      postedOn: "2024-11-13",
      closingDate: "2024-12-13",
      positions: 1,
      description:
        "Manage project timelines, deliverables, and lead a team of developers.",
      designation: "Manager",
      status: "Open",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newOpening, setNewOpening] = useState({
    jobTitle: "",
    jobType: "Full-Time",
    postedOn: "",
    closingDate: "",
    positions: 1,
    description: "",
    designation: "",
    status: "Open",
  });
  const [fileData, setFileData] = useState(null);
  const [filteredOpenings, setFilteredOpenings] = useState(openings);
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer open state
  const [openJobDialog, setOpenJobDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js";
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf, .txt",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFileData(file);
        console.log("File uploaded:", file.name);
        parseResumeAndFilterJobs(file);
      }
    },
  });

  const parsePdfResume = async (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      const pdf = await getDocument(arrayBuffer).promise;
      const numPages = pdf.numPages;
      let text = "";
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ");
      }
      const keywords = extractKeywordsFromResume(text);
      filterJobsByKeywords(keywords);
    };
    reader.readAsArrayBuffer(file);
  };

  const parseTextResume = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      const keywords = extractKeywordsFromResume(text);
      filterJobsByKeywords(keywords);
    };
    reader.readAsText(file);
  };

  const parseResumeAndFilterJobs = (file) => {
    if (file.type === "application/pdf") {
      parsePdfResume(file);
    } else if (file.type === "text/plain") {
      parseTextResume(file);
    } else {
      alert("Unsupported file type.");
    }
  };

  const filterJobsByKeywords = (keywords) => {
    const filtered = openings.filter((opening) =>
      keywords.some(
        (keyword) =>
          opening.jobTitle.toLowerCase().includes(keyword) ||
          opening.description.toLowerCase().includes(keyword)
      )
    );
    setFilteredOpenings(filtered);
  };

  const handleAddJobClick = () => setDrawerOpen(true); // Open Drawer

  const handleCancelForm = () => setDrawerOpen(false); // Close Drawer

  const handleAddJobSubmit = () => {
    if (newOpening.id) {
      const updatedOpenings = openings.map((job) =>
        job.id === newOpening.id ? { ...job, ...newOpening } : job
      );
      setOpenings(updatedOpenings);
      setFilteredOpenings(updatedOpenings);
    } else {
      const newJob = { ...newOpening, id: openings.length + 1 };
      const updatedOpenings = [...openings, newJob];
      setOpenings(updatedOpenings);
      setFilteredOpenings(updatedOpenings);
    }
    setDrawerOpen(false); // Close drawer after submit
  };

  const handleEditJob = (id) => {
    const jobToEdit = openings.find((job) => job.id === id);
    setNewOpening(jobToEdit);
    setDrawerOpen(true);
  };

  const handleDeleteJob = (id) => {
    const updatedOpenings = openings.filter((job) => job.id !== id);
    setOpenings(updatedOpenings);
    setFilteredOpenings(updatedOpenings);
  };

  const handleViewJob = (id) => {
    const jobToView = openings.find((job) => job.id === id);
    setSelectedJob(jobToView);
    setOpenJobDialog(true);
  };

  const handleCloseJobDialog = () => setOpenJobDialog(false);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredOpenings(openings);
    } else {
      const filtered = openings.filter(
        (opening) =>
          opening.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opening.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOpenings(filtered);
    }
  }, [searchTerm, openings]);

  // Data for Donut Charts
  const jobStatusData = {
    labels: ["Open", "Closed"],
    datasets: [
      {
        data: [
          openings.filter((opening) => opening.status === "Open").length,
          openings.filter((opening) => opening.status === "Closed").length,
        ],
        backgroundColor: ["#36a2eb", "#ff6384"],
      },
    ],
  };

  const jobTypesData = {
    labels: ["Full-Time", "Contract", "Part-Time"],
    datasets: [
      {
        data: [
          openings.filter((opening) => opening.jobType === "Full-Time").length,
          openings.filter((opening) => opening.jobType === "Contract").length,
          openings.filter((opening) => opening.jobType === "Part-Time").length,
        ],
        backgroundColor: ["#ffcd56", "#ff9f40", "#ff6384"],
      },
    ],
  };

  const jobsByDesignationData = {
    labels: ["Engineer", "Designer", "Manager"],
    datasets: [
      {
        data: [
          openings.filter((opening) => opening.designation === "Engineer")
            .length,
          openings.filter((opening) => opening.designation === "Designer")
            .length,
          openings.filter((opening) => opening.designation === "Manager")
            .length,
        ],
        backgroundColor: ["#36a2eb", "#ff6384", "#ff9f40"],
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }} align="center">
        Job Openings
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddJobClick}
            sx={{ height: "36px", padding: "0 16px" }}
          >
            Add New Job
          </Button>
        </Grid>

        <Grid item xs={12} sm="auto">
          <TextField
            label="Search Jobs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            InputProps={{ endAdornment: <SearchIcon /> }}
            sx={{ maxWidth: "300px" }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" align="center">
              Filter Jobs by Resume
            </Typography>
            <Box
              sx={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Typography variant="body2">
                Drag & Drop a resume file here or Click to Upload
              </Typography>
            </Box>
            {fileData && (
              <Typography variant="body2" sx={{ mt: 2 }} align="center">
                Uploaded File: {fileData.name}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Donut Charts */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" align="center">
              Job Status
            </Typography>
            <Doughnut data={jobStatusData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" align="center">
              Job Types
            </Typography>
            <Doughnut data={jobTypesData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" align="center">
              Jobs by Designation
            </Typography>
            <Doughnut data={jobsByDesignationData} />
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={2}>
        {filteredOpenings.map((opening) => (
          <Grid item xs={12} sm={6} md={4} key={opening.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="h6">{opening.jobTitle}</Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditJob(opening.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteJob(opening.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="info"
                      onClick={() => handleViewJob(opening.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {opening.jobType} | Posted on: {opening.postedOn} | Closing
                  on: {opening.closingDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {opening.positions} positions available
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Drawer for Add New Job */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleCancelForm}>
        <Box sx={{ width: 400, p: 3 }}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Add New Job</Typography>
            <IconButton onClick={handleCancelForm}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            label="Job Title"
            value={newOpening.jobTitle}
            onChange={(e) =>
              setNewOpening({ ...newOpening, jobTitle: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Job Type</InputLabel>
            <Select
              value={newOpening.jobType}
              onChange={(e) =>
                setNewOpening({ ...newOpening, jobType: e.target.value })
              }
              label="Job Type"
            >
              <MenuItem value="Full-Time">Full-Time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
              <MenuItem value="Part-Time">Part-Time</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Job Description"
            value={newOpening.description}
            onChange={(e) =>
              setNewOpening({ ...newOpening, description: e.target.value })
            }
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between">
            <Button onClick={handleCancelForm} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddJobSubmit} color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Job Description Dialog */}
      <Dialog
        open={openJobDialog}
        onClose={handleCloseJobDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedJob ? selectedJob.jobTitle : "Job Details"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            {selectedJob ? selectedJob.description : ""}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJobDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
