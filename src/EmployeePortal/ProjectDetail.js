import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Slider,
  MenuItem,
  Select,
  Card,
  CardContent,
  Grid,
  Avatar,
} from "@mui/material";

const ProjectDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [progress, setProgress] = useState(10);
  const [status, setStatus] = useState("Not Started");
  const [priority, setPriority] = useState("Normal");
  const [discussionInput, setDiscussionInput] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [username, setUsername] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [attachments, setAttachments] = useState([]);

  const statuses = ["Not Started", "In Progress", "Cancelled", "On Hold", "Completed"];
  const teamAvatars = ["/avatars/1.png", "/avatars/2.png", "/avatars/3.png", "/avatars/4.png", "/avatars/5.png"];

  useEffect(() => {
    const storedUser = localStorage.getItem("userRole");
    if (storedUser) setUsername(storedUser);
  }, []);

  const addDiscussion = () => {
    if (!discussionInput.trim()) return;
    const now = new Date();
    const newDiscussion = {
      text: discussionInput.trim(),
      user: username || "Anonymous",
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setDiscussions([...discussions, newDiscussion]);
    setDiscussionInput("");
  };

  const removeDiscussion = (index) => {
    setDiscussions((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadAttachment = () => {
    if (fileTitle.trim() && selectedFile) {
      const newAttachment = {
        title: fileTitle,
        name: selectedFile.name,
      };
      setAttachments([...attachments, newAttachment]);
      setFileTitle("");
      setSelectedFile(null);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f4f4", color: "#000", minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {/* Left Panel */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#fff", borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Project Details</Typography>

              {/* Progress */}
              <Typography variant="body2">Progress</Typography>
              <Slider
                value={progress}
                onChange={(e, newValue) => setProgress(newValue)}
                min={0}
                max={100}
                step={1}
                valueLabelDisplay="on"
                sx={{
                  color: "#d32f2f",
                  height: 10,
                  mb: 2,
                  "& .MuiSlider-track": { backgroundColor: "#d32f2f" },
                  "& .MuiSlider-rail": { backgroundColor: "#e0e0e0" },
                  "& .MuiSlider-thumb": { backgroundColor: "#fff", border: "2px solid #d32f2f" },
                }}
              />

              {/* Status */}
              <Typography variant="body2">Status *</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {statuses.map((s) => (
                  <Box
                    key={s}
                    onClick={() => setStatus(s)}
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      cursor: "pointer",
                      backgroundColor: status === s ? "#ffb74d" : "#e0e0e0",
                      color: status === s ? "#000" : "#555",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </Box>
                ))}
              </Box>

              {/* Priority */}
              <Typography variant="body2">Priority *</Typography>
              <Select
                fullWidth
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                sx={{ mt: 1 }}
              >
                <MenuItem value="Highest">Highest</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel */}
        <Grid item xs={12} md={8}>
          {/* Tabs */}
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 1.5,
              borderRadius: 2,
              mb: 2,
              display: "flex",
              gap: 3,
              boxShadow: 1,
            }}
          >
            {["overview", "discussion", "attachments"].map((tab) => (
              <Box
                key={tab}
                onClick={() => setActiveTab(tab)}
                sx={{
                  ...(activeTab === tab
                    ? {
                        backgroundColor: "#6f42c1",
                        color: "#fff",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: 14,
                        fontWeight: 500,
                      }
                    : {
                        color: "#6f42c1",
                        fontSize: 14,
                      }),
                  cursor: "pointer",
                }}
              >
                {tab === "overview" ? "Overview" : tab === "discussion" ? "Discussion" : "Attach files"}
              </Box>
            ))}
          </Box>

          {/* Content */}
          <Card sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              {activeTab === "overview" && (
                <>
                  <Typography variant="h6" gutterBottom>
                    🔒 <b>Project :</b> HRMS
                  </Typography>

                  {[["Title", "HRMS"], ["Client", "Imran Mulla"], ["Estimated Hour", "600"], ["Priority", "Highest"], ["Start Date", "2024-11-01"], ["End Date", "2025-05-10"]].map(
                    ([label, value]) => (
                      <Grid container spacing={1} key={label} sx={{ mb: 1 }}>
                        <Grid item xs={4}><Typography sx={{ color: "#555" }}>{label}</Typography></Grid>
                        <Grid item xs={8}><Typography>{value}</Typography></Grid>
                      </Grid>
                    )
                  )}

                  <Grid container spacing={1} sx={{ mb: 1 }}>
                    <Grid item xs={4}><Typography sx={{ color: "#555" }}>Team</Typography></Grid>
                    <Grid item xs={8}>
                      <Box sx={{ display: "flex" }}>
                        {teamAvatars.map((src, idx) => (
                          <Avatar key={idx} alt={`User ${idx + 1}`} src={src} sx={{ mr: 1 }} />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} sx={{ mb: 1 }}>
                    <Grid item xs={4}><Typography sx={{ color: "#555" }}>Total Hours</Typography></Grid>
                    <Grid item xs={8}><Typography>00:00</Typography></Grid>
                  </Grid>

                  <Typography variant="subtitle1" sx={{ mt: 2 }}>Summary</Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>Human resource management system</Typography>
                </>
              )}

              {activeTab === "discussion" && (
                <>
                  <Typography variant="h6" gutterBottom>🗣️ Discussion</Typography>

                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <input
                      type="text"
                      placeholder="Enter your comment..."
                      value={discussionInput}
                      onChange={(e) => setDiscussionInput(e.target.value)}
                      style={{
                        flexGrow: 1,
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "14px",
                      }}
                    />
                    <button
                      onClick={addDiscussion}
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "#6f42c1",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Add
                    </button>
                  </Box>

                  {discussions.length === 0 ? (
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      No discussions yet.
                    </Typography>
                  ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      {discussions.map((item, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            backgroundColor: "#f5f5f5",
                            p: 1,
                            borderRadius: 1,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {item.user} <span style={{ color: "#999", fontWeight: 400 }}>at {item.time}</span>
                            </Typography>
                            <Typography variant="body2">{item.text}</Typography>
                          </Box>
                          <button
                            onClick={() => removeDiscussion(idx)}
                            style={{
                              marginLeft: 10,
                              background: "none",
                              border: "none",
                              color: "#d32f2f",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                          >
                            ✕
                          </button>
                        </Box>
                      ))}
                    </Box>
                  )}
                </>
              )}

              {activeTab === "attachments" && (
                <>
                  <Typography variant="h6" gutterBottom>📎 Attach Files</Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <input
                      type="text"
                      placeholder="Enter file title"
                      value={fileTitle}
                      onChange={(e) => setFileTitle(e.target.value)}
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "14px",
                      }}
                    />

                    <input
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      style={{ fontSize: "14px" }}
                    />

                    <button
                      onClick={uploadAttachment}
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "#6f42c1",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        width: "fit-content",
                      }}
                    >
                      Upload
                    </button>

                    {attachments.length > 0 && (
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
                          Uploaded Files
                        </Typography>
                        <ul>
                          {attachments.map((file, index) => (
                            <li key={index}>
                              <Typography variant="body2">
                                <strong>{file.title}:</strong> {file.name}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDetail;
