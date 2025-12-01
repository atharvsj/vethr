import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  AppBar,
  Toolbar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from '@mui/material';
import {
  CakeOutlined,
  Print,
  Add,
  Search as SearchIcon,
  PhotoCamera,
  Home,
  Edit,
  Delete,
  Close,
} from '@mui/icons-material';


function NewEmployeeForm({ open, onClose, onSave, employeeToEdit }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    photo: null,
    department: '',
    status: '',
    position: '',
    active: true,
    email: '',
    birthDate: '',
    dateHired: '',
    contactNo: '',
    contactPerson: '',
    relation: '',
    address: '',
    requiredDocuments: [],
  });
  const [newDocument, setNewDocument] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit);
    }
  }, [employeeToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDocument = () => {
    if (newDocument) {
      setFormData(prev => ({
        ...prev,
        requiredDocuments: [...prev.requiredDocuments, newDocument]
      }));
      setNewDocument('');
    }
  };

  const handleRemoveDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.filter((_, i) => i !== index)
    }));
  };

  const handleSwitchChange = (e) => {
    setFormData(prev => ({
      ...prev,
      active: e.target.checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ mb: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="#"
            >
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Employees</Typography>
          </Breadcrumbs>
        </Box>
        <Typography variant="h6">{employeeToEdit ? 'Edit Employee' : 'New Employee'}</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Profile Image
                </Typography>
                <Avatar
                  sx={{ width: 150, height: 150, margin: 'auto', mb: 1 }}
                  src={formData.photo}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-image-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="profile-image-upload">
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    label="Birth Date"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    label="Date Hired"
                    name="dateHired"
                    type="date"
                    value={formData.dateHired}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={formData.department}
                      name="department"
                      onChange={handleInputChange}
                      label="Department"
                    >
                      <MenuItem value="Technical Support">Technical Support</MenuItem>
                      <MenuItem value="Admin/Accounting">Admin/Accounting</MenuItem>
                      <MenuItem value="Human Resources">Human Resources</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      name="status"
                      onChange={handleInputChange}
                      label="Status"
                    >
                      <MenuItem value="Regular">Regular</MenuItem>
                      <MenuItem value="Contractual">Contractual</MenuItem>
                      <MenuItem value="On Call">On Call</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact No."
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Relation"
                name="relation"
                value={formData.relation}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Required Documents</Typography>
              <List>
                {formData.requiredDocuments.map((doc, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={doc} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveDocument(index)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <TextField
                  fullWidth
                  label="New Document"
                  value={newDocument}
                  onChange={(e) => setNewDocument(e.target.value)}
                />
                <Button variant="contained" onClick={handleAddDocument}>Add</Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Typography component="legend">Employee Status</Typography>
                <Switch
                  checked={formData.active}
                  onChange={handleSwitchChange}
                  name="active"
                  color="primary"
                />
                <Typography>{formData.active ? 'Active' : 'Inactive'}</Typography>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function PayrollPage({ employee, onClose }) {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEntriesChange = (event) => {
    setEntriesPerPage(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Payroll
        </Typography>
        <Button variant="outlined" startIcon={<Close />} onClick={onClose}>
          Close
        </Button>
      </Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
      >
        Pay Slip History
      </Typography>

      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Emp. Id:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {employee.id}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Emp. Name:
              </Typography>
              <Typography variant="body2">{employee.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Designation:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {employee.position}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                UAN No.:
              </Typography>
              <Typography variant="body2">N/A</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold' }}>
            Show
          </Typography>
          <Select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            size="small"
            sx={{ minWidth: 80 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
            entries
          </Typography>
        </Box>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ maxWidth: 300 }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>SALARY MONTH</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>NET PAYABLE</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>PAY DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} align="center">
                No records available
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" disabled sx={{ mr: 1 }}>
          Previous
        </Button>
        <Button variant="contained" disabled>
          Next
        </Button>
      </Box>
    </Box>
  );
}

function BirthdayDialog({ open, onClose, birthdayEmployees }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Employee Birthdays</DialogTitle>
      <DialogContent>
        {birthdayEmployees.length > 0 ? (
          <List>
            {birthdayEmployees.map((employee) => (
              <ListItem key={employee.id}>
                <ListItemText
                  primary={employee.name}
                  secondary={`Birthday: ${new Date(employee.birthDate).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No birthdays today.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EmployeeManagementSystem() {
  const [employees, setEmployees] = useState([]);
  const [employmentType, setEmploymentType] = useState('');
  const [department, setDepartment] = useState('');
  const [hiringStatus, setHiringStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openNewForm, setOpenNewForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [showPayroll, setShowPayroll] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showBirthdayDialog, setShowBirthdayDialog] = useState(false);
  const [birthdayEmployees, setBirthdayEmployees] = useState([]);

  useEffect(() => {
    checkBirthdays();
  }, [employees]);

  const checkBirthdays = () => {
    const today = new Date();
    const todayFormatted = today.toISOString().slice(5, 10); // MM-DD format
    const celebrants = employees.filter(emp => emp.birthDate.slice(5) === todayFormatted);
    setBirthdayEmployees(celebrants);
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching with filters:', { employmentType, department, hiringStatus, searchTerm });
  };

  const handleOpenNewForm = () => {
    setEmployeeToEdit(null);
    setOpenNewForm(true);
  };

  const handleCloseNewForm = () => {
    setOpenNewForm(false);
    setEmployeeToEdit(null);
  };

  const handleSaveEmployee = (employeeData) => {
    if (employeeToEdit) {
      setEmployees(employees.map(emp => emp.id === employeeData.id ? employeeData : emp));
    } else {
      setEmployees([...employees, { ...employeeData, id: Date.now().toString() }]);
    }
    handleCloseNewForm();
  };

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    setOpenNewForm(true);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handlePrintEmployeeList = () => {
    const printContent = employees.map(emp => 
      `${emp.name} - ${emp.department} - ${emp.position}`
    ).join('\n');
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<pre>' + printContent + '</pre>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleViewPayroll = (employee) => {
    setSelectedEmployee(employee);
    setShowPayroll(true);
  };

  const handleClosePayroll = () => {
    setShowPayroll(false);
    setSelectedEmployee(null);
  };

  const handleOpenBirthdayDialog = () => {
    setShowBirthdayDialog(true);
  };

  const handleCloseBirthdayDialog = () => {
    setShowBirthdayDialog(false);
  };

  const filteredEmployees = employees.filter(employee => {
    return (
      (employmentType === '' || employee.status === employmentType) &&
      (department === '' || employee.department === department) &&
      (hiringStatus === '' || 
        (hiringStatus === 'active' ? employee.active : !employee.active)) &&
      (searchTerm === '' || employee.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Active Employees <Chip label={employees.filter(emp => emp.active).length} color="primary" size="small" />
          </Typography>
          <Button startIcon={<CakeOutlined />} color="inherit" onClick={handleOpenBirthdayDialog}>Birthday</Button>
          <Button startIcon={<Print />} color="inherit" onClick={handlePrintEmployeeList}>Print Contract List</Button>
          <Button 
            startIcon={<Add />} 
            color="success" 
            variant="contained"
            onClick={handleOpenNewForm}
          >
            New
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Employment Type</InputLabel>
          <Select
            value={employmentType}
            label="Employment Type"
            onChange={(e) => setEmploymentType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Regular">Regular</MenuItem>
            <MenuItem value="Contractual">Contractual</MenuItem>
            <MenuItem value="On Call">On Call</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Department</InputLabel>
          <Select
            value={department}
            label="Select Department"
            onChange={(e) => setDepartment(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Technical Support">Technical Support</MenuItem>
            <MenuItem value="Admin/Accounting">Admin/Accounting</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Hiring Status Filter</InputLabel>
          <Select
            value={hiringStatus}
            label="Hiring Status Filter"
            onChange={(e) => setHiringStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <TextField
          placeholder="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      {showPayroll ? (
        <PayrollPage employee={selectedEmployee} onClose={handleClosePayroll} />
      ) : (
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {filteredEmployees.map((employee) => (
              <Grid item xs={12} sm={6} md={4} key={employee.id}>
                <Card>
                  <CardContent sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      src={employee.photo}
                      sx={{ width: 64, height: 64 }}
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        {employee.name}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {employee.id}
                      </Typography>
                      <Typography variant="body2">
                        {employee.department} {employee.status} - {employee.position}
                      </Typography>
                      <Chip 
                        label={employee.active ? 'Active' : 'Inactive'} 
                        color={employee.active ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color={employee.active ? "primary" : "default"}
                      onClick={() => handleEditEmployee(employee)}
                    >
                      <Edit />
                    </Button>
                    <Button 
                      size="small" 
                      variant="contained" 
                      color="secondary"
                      onClick={() => handleViewPayroll(employee)}
                    >
                      Payroll
                    </Button>
                    <Button 
                      size="small" 
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <Delete />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <NewEmployeeForm 
        open={openNewForm} 
        onClose={handleCloseNewForm}
        onSave={handleSaveEmployee}
        employeeToEdit={employeeToEdit}
      />

      <BirthdayDialog
        open={showBirthdayDialog}
        onClose={handleCloseBirthdayDialog}
        birthdayEmployees={birthdayEmployees}
      />
    </Box>
  );
}

export default EmployeeManagementSystem;

