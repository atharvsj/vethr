import React, { useRef } from "react";
import { Box, Button, Paper } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const EmployeeClearanceForm = () => {
  const formRef1 = useRef();
  const formRef2 = useRef();

  const handleDownloadPDF = async () => {
    // Increase scale for higher resolution PDF
    const scale = 3;
    const canvas1 = await html2canvas(formRef1.current, { scale });
    const canvas2 = await html2canvas(formRef2.current, { scale });

    const imgData1 = canvas1.toDataURL("image/png");
    const imgData2 = canvas2.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();

    // Calculate image dimensions to fit within page margins
    const imgWidth = pdfWidth - 20; // 10mm margin
    const imgHeight1 = (canvas1.height * imgWidth) / canvas1.width;
    const imgHeight2 = (canvas2.height * imgWidth) / canvas2.width;

    pdf.addImage(imgData1, "PNG", 10, 10, imgWidth, imgHeight1);
    pdf.addPage();
    pdf.addImage(imgData2, "PNG", 10, 10, imgWidth, imgHeight2);
    pdf.save("Employee_Clearance_Form.pdf");
  };

  const styles = `
    .form-container {
      font-family: Arial, sans-serif;
      font-size: 11px;
      color: #000;
      background-color: #fff;
      padding: 20px;
    }
    .page2-layout {
        padding-top: 10px; 
        padding-bottom: 10px;
    }
    .page2-section {
        margin-bottom: 40px;
    }
    .form-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 15px;
    }
    .form-table td, .form-table th {
      padding: 6px;
      border: 0.5px solid #aaa;
      text-align: left;
    }
    .form-table th {
      font-weight: bold;
      background-color: #E7E6E6;
    }
    .header {
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 25px;
      text-decoration: underline;
      color: #0D47A1;
    }
    .section-title {
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      color: #0D47A1;
      margin: 25px 0 10px 0;
    }
    .info-table, .info-table td {
      border: none;
      padding: 4px 0;
    }
    .info-label {
      font-weight: bold;
      padding-right: 10px;
    }
    .underline-space {
        border-bottom: 1px solid #000;
        display: inline-block;
        width: 300px;
        margin-left: 5px;
    }
    .signature-section {
        margin-top: 20px;
    }
    .signature-box {
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
        align-items: center;
    }
    .signature-label {
        font-weight: bold;
    }
    .signature-line {
        border-bottom: 1px solid #000;
        width: 200px;
        display: inline-block;
        margin-left: 5px;
    }
    .date-line {
        border-bottom: 1px solid #000;
        width: 100px;
        display: inline-block;
        margin-left: 5px;
    }
    .correspondence-box {
        border: 1px solid #000;
        height: 100px;
        margin-top: 5px;
    }
    
    /* ✅ This class wrapper will allow tables to scroll horizontally on small screens */
    .table-wrapper {
        overflow-x: auto;
    }

    /* ✅ All responsive styles are inside this media query */
    @media (max-width: 600px) {
        .form-container {
            padding: 10px; /* Less padding on mobile */
            font-size: 10px;
        }
        .header {
            font-size: 16px;
        }
        .section-title {
            font-size: 13px;
        }
        .signature-box {
            flex-direction: column; /* Stack signature and date vertically */
            align-items: flex-start;
            gap: 15px;
        }
        .underline-space, .signature-line, .date-line {
            width: 100%; /* Make underlines take full available width */
            margin-left: 0;
        }
        .signature-label {
            display: block; /* Ensure label is on its own line */
            width: 100%;
        }
    }
  `;

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, backgroundColor: "#f0f0f0" }}>
      <style>{styles}</style>

      {/* Page 1 Content */}
      <Paper sx={{ mb: 3 }}>
        <div ref={formRef1} className="form-container">
          <div className="header">Employee Clearance Form</div>
          <table className="form-table info-table">
            <tbody>
              <tr><td className="info-label">Employee Id:</td></tr>
              <tr><td className="info-label">Name:</td></tr>
              <tr><td className="info-label">Designation:</td></tr>
              <tr><td className="info-label">Department:</td></tr>
              <tr><td className="info-label">Joining Date:</td></tr>
              <tr><td className="info-label">Resignation Date:</td></tr>
              <tr><td className="info-label">Relieving Date:</td></tr>
              <tr><td className="info-label">Line Manager:</td></tr>
            </tbody>
          </table>
          <div className="section-title">CLEARANCE FROM DEPT HEAD</div>
          {/* ✅ Added table-wrapper for responsiveness */}
          <div className="table-wrapper">
            <table className="form-table">
              <thead><tr><th>Sr. No.</th><th>List of activities</th><th>Status: (Pending/ Completed)</th></tr></thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}><td style={{height: '22px'}}>&nbsp;</td><td></td><td></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="signature-section">
            <div><span className="signature-label">Handing Over done to (Name):</span><span className="underline-space"></span></div>
            <div className="signature-box">
              <span className="signature-label">Employee Signature: <span className="signature-line"></span></span>
              <span className="signature-label">Date: <span className="date-line"></span></span>
            </div>
            <div className="signature-box">
              <span className="signature-label">Signature of person to whom handing over was done: <span className="signature-line"></span></span>
              <span className="signature-label">Date: <span className="date-line"></span></span>
            </div>
            <div className="signature-box">
              <span className="signature-label">Signature of Departmental Head: <span className="signature-line"></span></span>
              <span className="signature-label">Date: <span className="date-line"></span></span>
            </div>
          </div>
          <div className="section-title">CLEARANCE LIST</div>
           {/* ✅ Added table-wrapper for responsiveness */}
          <div className="table-wrapper">
            <table className="form-table">
              <thead><tr><th style={{width: '60px'}}>Sr. No</th><th>List of items</th><th>Status: (Returned/ Not returned)</th></tr></thead>
              <tbody>
                <tr><td>1.</td><td>Assets (Laptop, Tab, Projector, Samples, Company bag, Visual aid, Literature, etc.) handled by employee</td><td></td></tr>
                <tr><td>2.</td><td>Mobile sim</td><td></td></tr>
                <tr><td>3.</td><td>Mail Access</td><td></td></tr>
                <tr><td>4.</td><td>Internet Access</td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </Paper>

      {/* Page 2 Content */}
      <Paper sx={{ mb: 3 }}>
        <div ref={formRef2} className="form-container page2-layout">
          <div className="page2-section">
            <div className="table-wrapper">
              <table className="form-table">
                <tbody>
                  <tr>
                    <td style={{width: '60px'}}>5.</td>
                    <td>Other Applications</td>
                    <td style={{width: '150px'}}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="signature-box">
              <span className="signature-label">Signature : <span className="signature-line"></span></span>
              <span className="signature-label">Date: <span className="date-line"></span></span>
            </div>
          </div>
          <div className="page2-section">
            <div className="section-title">CLEARANCE FROM FINANCE</div>
            <div className="table-wrapper">
              <table className="form-table">
                <thead><tr><th style={{width: '60px'}}>Sr. No</th><th>Item Name</th><th>Remarks</th><th>Signature</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td>Loans/Advance</td><td></td><td></td></tr>
                  <tr><td>2</td><td>Travel Advance</td><td></td><td></td></tr>
                </tbody>
              </table>
            </div>
            <div className="signature-box">
              <span className="signature-label">Signatures: (Finance)<span className="signature-line"></span></span>
              <span className="signature-label">Date: <span className="date-line"></span></span>
            </div>
          </div>
          <div className="page2-section">
            <div className="section-title">NOC (No Objection Certificate)</div>
            <div className="table-wrapper">
              <table className="form-table">
                <thead><tr><th style={{width: '60px'}}>Sr. No</th><th>Name of NOC</th><th>Status (Received /Not received)</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td>All Distributors NOC</td><td></td></tr>
                  <tr><td>2</td><td>C & F NOC</td><td></td></tr>
                  <tr><td>3</td><td>VetZone NOC</td><td></td></tr>
                </tbody>
              </table>
            </div>
            <div className="signature-box">
              <span className="signature-label">Signatures: (Finance)<span className="signature-line"></span></span>
              <span className="signature-label">Date: <span className="date-line"></span></span>
            </div>
          </div>
          <div className="page2-section">
            <b className="signature-label">Address for further Correspondence:</b>
            <div className="correspondence-box"></div>
          </div>
        </div>
      </Paper>
      
      {/* Download Button Section */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleDownloadPDF}
          sx={{
            backgroundColor: '#8A2BE2', // Electric Purple
            '&:hover': {
              backgroundColor: '#7B1FA2', // Darker purple on hover
            },
          }}
        >
          Download PDF
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeClearanceForm;