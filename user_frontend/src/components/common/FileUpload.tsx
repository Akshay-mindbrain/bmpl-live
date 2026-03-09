import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { styled } from "@mui/material/styles";
import { useState, type ChangeEvent } from "react";
import designConfig from '../../config/designConfig';


const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

interface FileUploadProps {
    label: string;
    id: string; // Unique ID for the input
    onChange?: (file: File | null) => void;
    error?: string;
}

const FileUpload = ({ label, id, onChange, error }: FileUploadProps) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setFileName(file.name);
            if (onChange) onChange(file);
        }
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#2d2d2d", mb: 1, fontSize: "0.95rem" }}
            >
                {label}
            </Typography>
            <Box
                component="label"
                htmlFor={id} // Links to the input
                sx={{
                    border: `2px dashed ${error ? "#d32f2f" : "#e0e0e0"}`,
                    borderRadius: "12px",
                    bgcolor: "#f9f9f9",
                    height: 120, // Check height consistency
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                        borderColor: designConfig.colors.primary.main,
                        bgcolor: designConfig.colors.background.green,
                    },
                }}
            >
                {fileName ? (
                    <Box sx={{ textAlign: "center", p: 2 }}>
                        <CheckCircleOutlineIcon sx={{ color: designConfig.colors.primary.main, fontSize: 32, mb: 1 }} />
                        <Typography variant="body2" sx={{ color: "#2d2d2d", wordBreak: "break-all" }}>
                            {fileName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: designConfig.colors.primary.main, fontWeight: 600 }}>
                            Click to change
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <CloudUploadIcon sx={{ color: "#bdbdbd", fontSize: 32, mb: 1 }} />
                        <Typography variant="body2" sx={{ color: "#757575", fontWeight: 500 }}>
                            Tap to upload
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                            SVG, PNG, JPG or GIF
                        </Typography>
                    </>
                )}
                <VisuallyHiddenInput
                    type="file"
                    id={id}
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                />
            </Box>
            {error && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};



export default FileUpload;
