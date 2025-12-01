import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';

// --- Updated Sample Data (Illustrative - replace with your actual data) ---
// Each row object now needs properties for ALL the columns.
// For brevity, I'm only showing a few properties for the first row.
// You'll need to ensure your actual data has all these keys.
const reportData = [
  {
    id: 1,
    division: 'Livestock VetBiz',
    accountsManager: 0,
    areaSalesManager: 0,
    commercialOperationExecutive: 0,
    customerExperienceExecutive: 0, // This was already present, kept for consistency
    digitalMarketingExecutive: 0,
    digitalMarketingManager: 0,
    driver: 0,
    // --- Adding new columns to data structure ---
    financeManager: 0,
    graphicDesigner: 0,
    humanResourceGeneralist: 0,
    humanResourceManager: 0, // Note: "Human Resource Manager" appears twice, will use distinct keys if intended differently or combine
    marketingExecutive: 0, // Note: "Marketing Executive" appears twice
    marketingManager: 0,
    mediaManager: 0,
    nationalSalesManager: 0,
    officeBoy: 0,
    operationExecutiveFactory: 0,
    operationExecutiveGodown: 0,
    vetZoneOperationExecutive: 0,
    productManager: 0,
    productionSupervisor: 0, // Note: "Production Supervisor" appears multiple times
    purchaseExecutive: 0,
    purchaseManager: 0,
    qaQcExecutive: 0,
    salesCoOrdinator: 0,
    salesExecutiveVetzone: 0,
    storekeeper: 0,
    technicalManager: 0,
    veterinarySalesExecutive: 0,
    veterinarySalesOfficer: 0,
    vetzoneSupervisor: 0,
    zonalSalesManager: 0,
    accountExecutive: 0,
    storeExecutive: 0,
    purchaseOfficer: 0, // Note: "Purchase Officer" appears twice
    assistantGraphicDesigner: 0,
    mediaExecutive: 0,
    officeAdministrator: 0,
    backOfficeOperator: 0,
    assistantSalesCoOrdinator: 0,
    operationHead: 0,
    financeOfficer: 0,
    // humanResourceManager2: 0, // Example if the second "Human Resource Manager" is distinct
    managementTrainee: 0,
    // marketingExecutive2: 0, // Example if the second "Marketing Executive" is distinct
    // purchaseOfficer2: 0, // Example if the second "Purchase Officer" is distinct
    executiveToManagingDirector: 0,
    buh: 0,
    srAreaSalesManager: 0,
    salesManager: 0,
    officeAdmin: 0,
    // productionSupervisor2: 0, // Example if the second "Production Supervisor" is distinct
    projectManager: 0,
    assistantStorekeeper: 0,
    // customerExperienceExecutive: 0, // Already present
    territorySalesManager: 0,
    hrExecutive: 0,
    productExecutive: 0,
    assistantStoreExecutive: 0,
    dataEntryOperator: 0,
    // productionSupervisor3: 0, // Example if the third "Production Supervisor" is distinct
    livestockSolutionAdvisor: 0,
    poultrySolutionAdvisor: 0,
    totalManpower: 0, // A new 'Total' column at the end of designations
  },
  {
    id: 2,
    division: 'Livestock TredBiz',
    accountsManager: 0, areaSalesManager: 0, commercialOperationExecutive: 0, customerExperienceExecutive: 0, digitalMarketingExecutive: 0, digitalMarketingManager: 0, driver: 0, financeManager: 0, graphicDesigner: 0, humanResourceGeneralist: 0, humanResourceManager: 0, marketingExecutive: 0, marketingManager: 0, mediaManager: 0, nationalSalesManager: 0, officeBoy: 0, operationExecutiveFactory: 0, operationExecutiveGodown: 0, vetZoneOperationExecutive: 0, productManager: 0, productionSupervisor: 0, purchaseExecutive: 0, purchaseManager: 0, qaQcExecutive: 0, salesCoOrdinator: 0, salesExecutiveVetzone: 0, storekeeper: 0, technicalManager: 0, veterinarySalesExecutive: 0, veterinarySalesOfficer: 0, vetzoneSupervisor: 0, zonalSalesManager: 0, accountExecutive: 0, storeExecutive: 0, purchaseOfficer: 0, assistantGraphicDesigner: 0, mediaExecutive: 0, officeAdministrator: 0, backOfficeOperator: 0, assistantSalesCoOrdinator: 0, operationHead: 0, financeOfficer: 0, managementTrainee: 0, executiveToManagingDirector: 0, buh: 0, srAreaSalesManager: 0, salesManager: 0, officeAdmin: 0, projectManager: 0, assistantStorekeeper: 0, territorySalesManager: 0, hrExecutive: 0, productExecutive: 0, assistantStoreExecutive: 0, dataEntryOperator: 0, livestockSolutionAdvisor: 0, poultrySolutionAdvisor: 0, totalManpower: 0,
  },
  {
    id: 3,
    division: 'Companion',
    accountsManager: 0, areaSalesManager: 1, commercialOperationExecutive: 0, customerExperienceExecutive: 0, digitalMarketingExecutive: 0, digitalMarketingManager: 0, driver: 0, financeManager: 0, graphicDesigner: 0, humanResourceGeneralist: 0, humanResourceManager: 0, marketingExecutive: 0, marketingManager: 0, mediaManager: 0, nationalSalesManager: 0, officeBoy: 0, operationExecutiveFactory: 0, operationExecutiveGodown: 0, vetZoneOperationExecutive: 0, productManager: 0, productionSupervisor: 0, purchaseExecutive: 0, purchaseManager: 0, qaQcExecutive: 0, salesCoOrdinator: 0, salesExecutiveVetzone: 0, storekeeper: 0, technicalManager: 0, veterinarySalesExecutive: 0, veterinarySalesOfficer: 0, vetzoneSupervisor: 0, zonalSalesManager: 0, accountExecutive: 0, storeExecutive: 0, purchaseOfficer: 0, assistantGraphicDesigner: 0, mediaExecutive: 0, officeAdministrator: 0, backOfficeOperator: 0, assistantSalesCoOrdinator: 0, operationHead: 0, financeOfficer: 0, managementTrainee: 0, executiveToManagingDirector: 0, buh: 0, srAreaSalesManager: 0, salesManager: 0, officeAdmin: 0, projectManager: 0, assistantStorekeeper: 0, territorySalesManager: 0, hrExecutive: 0, productExecutive: 0, assistantStoreExecutive: 0, dataEntryOperator: 0, livestockSolutionAdvisor: 0, poultrySolutionAdvisor: 0, totalManpower: 1,
  },
  {
    id: 4,
    division: 'Poultry',
    accountsManager: 0, areaSalesManager: 0, commercialOperationExecutive: 0, customerExperienceExecutive: 0, digitalMarketingExecutive: 0, digitalMarketingManager: 0, driver: 0, financeManager: 0, graphicDesigner: 0, humanResourceGeneralist: 0, humanResourceManager: 0, marketingExecutive: 0, marketingManager: 0, mediaManager: 0, nationalSalesManager: 0, officeBoy: 0, operationExecutiveFactory: 0, operationExecutiveGodown: 0, vetZoneOperationExecutive: 0, productManager: 0, productionSupervisor: 0, purchaseExecutive: 0, purchaseManager: 0, qaQcExecutive: 0, salesCoOrdinator: 0, salesExecutiveVetzone: 0, storekeeper: 0, technicalManager: 0, veterinarySalesExecutive: 0, veterinarySalesOfficer: 0, vetzoneSupervisor: 0, zonalSalesManager: 0, accountExecutive: 0, storeExecutive: 0, purchaseOfficer: 0, assistantGraphicDesigner: 0, mediaExecutive: 0, officeAdministrator: 0, backOfficeOperator: 0, assistantSalesCoOrdinator: 0, operationHead: 0, financeOfficer: 0, managementTrainee: 0, executiveToManagingDirector: 0, buh: 0, srAreaSalesManager: 0, salesManager: 0, officeAdmin: 0, projectManager: 0, assistantStorekeeper: 0, territorySalesManager: 0, hrExecutive: 0, productExecutive: 0, assistantStoreExecutive: 0, dataEntryOperator: 0, livestockSolutionAdvisor: 0, poultrySolutionAdvisor: 0, totalManpower: 0,
  },
];

// --- Updated Columns Definition ---
// Helper function to generate camelCase accessorKey from header string
const toCamelCase = (str) => {
  return str
    .replace(/\s\(.\)/g, '') // remove (a), (b), etc.
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
    .replace(/^(.)/, (match, chr) => chr.toLowerCase())
    .replace(/\s|\W/g, ''); // Remove spaces and non-alphanumeric
};


const initialColumns = [
  { header: 'ACCOUNTS MANAGER', minWidth: 150 },
  { header: 'AREA SALES MANAGER', minWidth: 170 },
  { header: 'COMMERCIAL OPERATION EXECUTIVE', minWidth: 250 },
  { header: 'CUSTOMER EXPERIENCE EXECUTIVE', minWidth: 250 },
  { header: 'DIGITAL MARKETING EXECUTIVE', minWidth: 250 },
  { header: 'DIGITAL MARKETING MANAGER', minWidth: 250 },
  { header: 'DRIVER', minWidth: 100 },
];

const newDesignationHeaders = [
  'Finance Manager', 'Graphic Designer', 'Human Resource Generalist', 'Human Resource Manager',
  'Marketing Executive', 'Marketing Manager', 'Media Manager', 'National Sales Manager',
  'Office Boy', 'Operation Executive - Factory', 'Operation Executive - Godown',
  'VetZone Operation Executive', 'Product Manager', 'Production Supervisor',
  'Purchase Executive', 'Purchase Manager', 'QA/QC Executive', 'Sales Co-ordinator',
  'Sales Executive - Vetzone', 'Storekeeper', 'Technical Manager',
  'Veterinary Sales Executive', 'Veterinary Sales Officer', 'Vetzone Supervisor',
  'Zonal Sales Manager', 'Account executive', 'Store Executive', 'Purchase Officer',
  'Assistant Graphic Designer', 'Media Executive', 'Office Administrator',
  'Back Office Operator', 'Assistant Sales Co-ordinator', 'Operation Head',
  'Finance Officer', 'Human Resource Manager', // Appears again, ensure distinct key if needed
  'Management Trainee', 'Marketing Executive', // Appears again
  'Purchase Officer', // Appears again
  'Executive to Managing Director', 'BUH', 'Sr. Area Sales Manager', 'Sales Manager',
  'Office Admin', 'Production Supervisor', // Appears again
  'Project Manager', 'Assistant Storekeeper', 'Customer Experience Executive', // Appears again
  'Territory Sales Manager', 'HR Executive', 'Product Executive',
  'Assistant Store Executive', 'Data Entry Operator', 'Production Supervisor', // Appears again
  'Livestock Solution Advisor', 'Poultry Solution Advisor', 'Total' // The final "Total" column
];

// Combine initial columns with new ones, generating accessorKeys
const allDesignationColumns = [
    ...initialColumns,
    ...newDesignationHeaders.map(header => ({ header, minWidth: 180 })) // Default minWidth for new ones
].map(col => ({
    ...col,
    accessorKey: col.accessorKey || toCamelCase(col.header), // Use existing or generate
    align: 'center', // Default to center for these count columns
}));

// Final columns array including SR. NO. and DIVISION
const columns = [
  { accessorKey: 'id', header: 'SR. NO.', minWidth: 70, align: 'left' },
  { accessorKey: 'division', header: 'DIVISION', minWidth: 170, align: 'left' },
  ...allDesignationColumns,
];


export default function DepartmentDesignationReport() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const tableHeaderCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f0f3f5', // Slightly different shade for distinction
    borderRight: '1px solid #e0e0e0',
    padding: '10px 12px',
    whiteSpace: 'nowrap',
    fontSize: '0.8rem', // Adjusted for more columns
    textTransform: 'uppercase',
  };

  const tableBodyCellStyle = {
    borderRight: '1px solid #e0e0e0',
    padding: '8px 12px',
    fontSize: '0.8rem', // Adjusted for more columns
  };

  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      height: '12px',
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f1f1f1',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '10px',
      '&:hover': {
        backgroundColor: '#555',
      },
    },
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #f1f1f1',
  };

  return (
    <Container sx={{ width: "100%" }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
        Department vs Designation Report
      </Typography>
      <Paper  sx={{ width: '100%', overflowX: 'auto' }}>
        <TableContainer sx={{ minWidth: '100%' }}>
          <Table stickyHeader size="small" aria-label="department vs designation report table">
            <TableHead>
              <TableRow>
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={column.accessorKey}
                    sx={{
                      ...tableHeaderCellStyle,
                      minWidth: column.minWidth,
                      textAlign: column.align || 'center',
                      borderRight: colIndex === columns.length - 1 ? 'none' : tableHeaderCellStyle.borderRight,
                    }}
                  >
                    {column.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={`${row.id}-${column.accessorKey}`}
                      sx={{
                        ...tableBodyCellStyle,
                        textAlign: column.align || 'center',
                        borderRight: colIndex === columns.length - 1 ? 'none' : tableBodyCellStyle.borderRight,
                      }}
                    >
                      {row[column.accessorKey] !== undefined ? row[column.accessorKey] : 0}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {reportData.length === 0 && (
                <TableRow>
                    <TableCell colSpan={columns.length} align="center" sx={{py: 3}}>
                        No data available in table
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}