import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

export default function DocumentManagementLM() {
  const [documents, setDocuments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    department: '',
    documentName: '',
    documentType: '',
    documentFile: null
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const departments = ['Integrated Technology Services', 'Human Resources', 'Finance'];
  const allowedFileTypes = ['png', 'jpg', 'jpeg', 'gif', 'txt', 'pdf', 'xls', 'xlsx', 'doc', 'docx'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (allowedFileTypes.includes(fileExtension)) {
        handleInputChange('documentFile', file);
      } else {
        alert('Invalid file type. Please upload a supported file format.');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      department: '',
      documentName: '',
      documentType: '',
      documentFile: null
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.department || !formData.documentName || !formData.documentType || !formData.documentFile) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingId) {
      setDocuments(documents.map(doc => 
        doc.id === editingId ? { ...doc, ...formData, fileName: formData.documentFile.name } : doc
      ));
    } else {
      const newDocument = {
        id: Date.now(),
        ...formData,
        fileName: formData.documentFile.name
      };
      setDocuments([...documents, newDocument]);
    }
    
    handleReset();
    setShowForm(false);
  };

  const handleEdit = (document) => {
    setFormData({
      department: document.department,
      documentName: document.documentName,
      documentType: document.documentType,
      documentFile: { name: document.fileName }
    });
    setEditingId(document.id);
    setShowForm(true);
  };

  const handleDelete = (document) => {
    setDocumentToDelete(document);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    setDocuments(documents.filter(doc => doc.id !== documentToDelete.id));
    setDeleteConfirmOpen(false);
  };

  const filteredDocuments = documents.filter(doc =>
    Object.values(doc).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">General Documents</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setShowForm(!showForm);
            handleReset();
          }}
        >
          {showForm ? 'Hide' : 'Add New'}
        </Button>
      </Box>

      {showForm && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>{editingId ? 'Edit Document' : 'Add New Document'}</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    label="Department"
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Document Name"
                  value={formData.documentName}
                  onChange={(e) => handleInputChange('documentName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Document Type"
                  placeholder="Eg. Payslip"
                  value={formData.documentType}
                  onChange={(e) => handleInputChange('documentType', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <input
                  accept={allowedFileTypes.map(type => `.${type}`).join(',')}
                  style={{ display: 'none' }}
                  id="document-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="document-file">
                  <Button variant="outlined" component="span" fullWidth>
                    {formData.documentFile ? formData.documentFile.name : 'Choose file...'}
                  </Button>
                </label>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Upload files only: {allowedFileTypes.join(', ')}
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleReset}>Reset</Button>
              <Button type="submit" variant="contained">{editingId ? 'Update' : 'Save'}</Button>
            </Box>
          </form>
        </Paper>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>List All System Documents</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
            <Select
              size="small"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value)}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
          </Box>
          <TextField
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>DEPARTMENT</TableCell>
                <TableCell>DOCUMENT NAME</TableCell>
                <TableCell>DOCUMENT TYPE</TableCell>
                <TableCell>DOCUMENT FILE</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">No records available</TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.department}</TableCell>
                    <TableCell>{doc.documentName}</TableCell>
                    <TableCell>{doc.documentType}</TableCell>
                    <TableCell>{doc.fileName}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(doc)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(doc)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2">
            Showing {Math.min(filteredDocuments.length, entriesPerPage)} of {documents.length} entries
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button disabled={true}>Previous</Button>
            <Button disabled={true}>Next</Button>
          </Box>
        </Box>
      </Paper>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this document?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}