"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Stack,
  Divider,
} from "@mui/material"
import {
  CloudUpload as CloudUploadIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Sync as SyncIcon,
} from "@mui/icons-material"
import axiosInstance from "../utils/axiosInstance";

const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

// The component now accepts an 'onBack' prop
const DocumentManager = ({ onBack }) => {
  const employeeId = localStorage.getItem("loggedInEmpId");

  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // State for the "Add New Document" form
  const [newFile, setNewFile] = useState(null);
  const [newDocumentName, setNewDocumentName] = useState("");
  const [newDocumentType, setNewDocumentType] = useState("");

  const fetchDocuments = async () => {
    if (!employeeId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/document_details/?user_id=${employeeId}`);
      if (response.data.status === "success") {
        setDocuments(response.data.docs || []);
      } else {
        setDocuments([]);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [employeeId]);

  // --- CRUD OPERATIONS ---

  const handleAddNewDocument = async () => {
    if (!newFile || !newDocumentName || !newDocumentType || !employeeId) {
      alert("Please provide a document name, type, and choose a file.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("user_id", employeeId);
    formData.append("company_id", 2);
    formData.append("document_file", newFile);
    formData.append("document_type", newDocumentType);
    formData.append("document_name", newDocumentName);

    try {
      await axiosInstance.post("/api/document_details/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Document uploaded successfully!");
      setNewFile(null);
      setNewDocumentName("");
      setNewDocumentType("");
      fetchDocuments();
    } catch (error) {
      console.error("Error uploading new document:", error);
      alert("Failed to upload document.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReplaceFile = async (event, documentToUpdate) => {
    const file = event.target.files[0];
    if (!file || !employeeId) return;

    const formData = new FormData();
    formData.append("document_id", documentToUpdate.document_id);
    formData.append("user_id", employeeId);
    formData.append("company_id", 2);
    formData.append("document_file", file);
    formData.append("document_name", documentToUpdate.document_name);
    formData.append("document_type", documentToUpdate.document_type);

    try {
      await axiosInstance.patch("/api/document_details/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Document replaced successfully!");
      fetchDocuments();
    } catch (error) {
      console.error("Error replacing document:", error);
      alert("Failed to replace document.");
    }
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      await axiosInstance.delete("/api/document_details/", {
        data: { document_id: documentId, user_id: employeeId },
      });
      alert("Document deleted successfully!");
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Documents
      </Typography>
      <Paper elevation={2} sx={{ mb: 4 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ "& .MuiTableCell-head": { fontWeight: "bold" } }}>
                <TableCell>DOCUMENT NAME</TableCell>
                <TableCell align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : documents.length > 0 ? (
                documents.map((doc) => (
                  <TableRow key={doc.document_id}>
                    <TableCell>{doc.document_name}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="Download/View">
                          <MuiLink href={`${API_BASE_URL}${doc.document_file}`} target="_blank" rel="noopener noreferrer">
                            <IconButton color="primary"><VisibilityIcon /></IconButton>
                          </MuiLink>
                        </Tooltip>
                        <Tooltip title="Replace File (Edit)">
                          <IconButton color="info" component="label">
                            <SyncIcon />
                            <input type="file" hidden onChange={(e) => handleReplaceFile(e, doc)} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => handleDelete(doc.document_id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No documents found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add New Document
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Document Name"
              variant="outlined"
              fullWidth
              required
              value={newDocumentName}
              onChange={(e) => setNewDocumentName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Document Type"
              variant="outlined"
              fullWidth
              required
              value={newDocumentType}
              onChange={(e) => setNewDocumentType(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" component="label" fullWidth>
              {newFile ? newFile.name.substring(0, 25) + '...' : "Choose File..."}
              <input type="file" hidden onChange={(e) => setNewFile(e.target.files[0])} />
            </Button>
          </Grid>
        </Grid>
        <Typography variant="caption" display="block" sx={{ mt: 1, color: "text.secondary" }}>
          Upload files only: png, jpg, jpeg, gif, txt, pdf, xls, xlsx, doc, docx
        </Typography>
        <Divider sx={{ my: 2 }} />
        {/* Container for the buttons */}
        <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isUploading}
              onClick={handleAddNewDocument}
            >
              {isUploading ? <CircularProgress size={24} color="inherit" /> : "Add Document"}
            </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default DocumentManager;

