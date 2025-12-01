import React, { useState, useCallback, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    ThemeProvider,
    createTheme,
    CssBaseline,
    LinearProgress,
    Divider,
    Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// 1. Define the custom theme (no changes here)
const theme = createTheme({
    palette: {
        primary: {
            main: '#8C257C', // Purple
        },
        secondary: {
            main: '#F58E35', // Orange
        },
        background: {
            default: '#f4f6f8'
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h4: {
            fontWeight: 700,
        },
    },
});

// 2. Styled components (no changes here)
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const DropZone = styled('div')(({ theme, isDragging }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    border: `2px dashed ${isDragging ? theme.palette.secondary.main : theme.palette.grey[400]}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: isDragging ? '#fff8f0' : '#fafafa',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s, background-color 0.3s',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
}));

const ModernSignatureUploader = () => {
    // 3. State management hooks
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true); // For initial GET request
    const [uploadStatus, setUploadStatus] = useState({ message: '', type: '' });
    const [existingSignatureUrl, setExistingSignatureUrl] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    // This should be dynamic in a real application (from props, context, etc.)
    const userId = 'V0176';
    const apiUrl = `https://tdtlworld.com/hrms-backend/upload-sign/${userId}/`;

    // 4. NEW: useEffect to fetch existing signature on component mount
    useEffect(() => {
        const fetchSignature = async () => {
            setIsFetching(true);
            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const data = await response.json();
                    if (data.sign) {
                        setExistingSignatureUrl(data.sign);
                    }
                } else {
                    // Handle cases where user has no signature yet (e.g., 404 Not Found)
                    console.log('No existing signature found or API error.');
                }
            } catch (error) {
                console.error('Error fetching signature:', error);
                setUploadStatus({ message: 'Could not load existing signature.', type: 'error' });
            } finally {
                setIsFetching(false);
            }
        };

        fetchSignature();
    }, [apiUrl]); // Dependency array ensures this runs once when apiUrl is set


    // 5. File handling and drag-and-drop logic (no changes here)
    const resetState = () => {
        setUploadStatus({ message: '', type: '' });
    };

    const handleFileSelect = (file) => {
        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            setSelectedFile(file);
            resetState();
        } else {
            setUploadStatus({ message: 'Invalid file type. Please select a PNG or JPG file.', type: 'error' });
        }
    };

    const handleFileChange = (event) => {
        handleFileSelect(event.target.files[0]);
    };

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            handleFileSelect(event.dataTransfer.files[0]);
            event.dataTransfer.clearData();
        }
    }, []);

    const handleDragEvents = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "dragenter" || event.type === "dragover") {
            setIsDragging(true);
        } else if (event.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);


    // 6. API Upload Logic (PATCH)
    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus({ message: 'Please select a file first.', type: 'error' });
            return;
        }

        setIsLoading(true);
        resetState();

        const formData = new FormData();
        formData.append('sign', selectedFile);

        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setUploadStatus({ message: result.message || 'Signature uploaded successfully!', type: 'success' });
                // UPDATE: On successful upload, update the existing signature URL to the new one
                setExistingSignatureUrl(result.sign);
                setSelectedFile(null); // Clear the selected file
            } else {
                setUploadStatus({ message: result.message || 'An error occurred during upload.', type: 'error' });
            }
        } catch (error) {
            console.error('Upload Error:', error);
            setUploadStatus({ message: 'A network error occurred. Please try again.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Card sx={{ boxShadow: '0 8px 32px 0 rgba(140, 37, 124, 0.2)', borderRadius: '12px', width: '100%', maxWidth: '500px' }}>
                    {isLoading && <LinearProgress color="secondary" />}
                    <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Typography variant="h4" component="h1" color="primary">
                                Upload Signature
                            </Typography>
                        </Box>

                        <label htmlFor="file-upload">
                            <DropZone
                                onDrop={handleDrop}
                                onDragEnter={handleDragEvents}
                                onDragLeave={handleDragEvents}
                                onDragOver={handleDragEvents}
                                isDragging={isDragging}
                            >
                                <CloudUploadIcon sx={{ fontSize: 60, color: 'primary.light' }} />
                                <Typography>Drag & drop image here</Typography>
                                <Typography variant="body2" color="text.secondary">or</Typography>
                                <Button component="span" variant="text" color="secondary">
                                    Click to select
                                </Button>
                                <VisuallyHiddenInput id="file-upload" type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
                            </DropZone>
                        </label>

                        {selectedFile && !uploadStatus.message && (
                            <Alert icon={<CheckCircleOutlineIcon fontSize="inherit" />} severity="info" sx={{ mt: 2 }}>
                                File selected: <strong>{selectedFile.name}</strong>. Ready to upload.
                            </Alert>
                        )}
                        
                        {uploadStatus.message && (
                            <Alert severity={uploadStatus.type} sx={{ mt: 2, width: '100%' }}>
                                {uploadStatus.message}
                            </Alert>
                        )}

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={handleUpload}
                                disabled={!selectedFile || isLoading}
                                size="large"
                                sx={{ py: 1.5, color: 'white', textTransform: 'none', fontSize: '1rem' }}
                                startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
                            >
                                {isLoading ? 'Uploading...' : 'Upload Signature'}
                            </Button>
                        </Box>
                        
                        {/* 7. NEW: Section to display existing signature */}
                        <Divider sx={{ my: 4 }}>Current Signature</Divider>
                        
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            {isFetching ? (
                                <Skeleton variant="rectangular" width={250} height={100} sx={{ mx: 'auto', borderRadius: 2 }} />
                            ) : existingSignatureUrl ? (
                                <Box
                                    component="img"
                                    src={existingSignatureUrl}
                                    alt="Current Signature"
                                    sx={{
                                        maxWidth: '80%',
                                        height: 'auto',
                                        border: '2px solid',
                                        borderColor: 'primary.main',
                                        borderRadius: 2,
                                        p: 1
                                    }}
                                />
                            ) : (
                                <Typography color="text.secondary">No signature on file.</Typography>
                            )}
                        </Box>

                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
};

export default ModernSignatureUploader;