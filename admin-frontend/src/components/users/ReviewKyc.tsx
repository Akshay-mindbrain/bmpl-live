import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";

interface ReviewKycProps {
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: (reason: string) => void;
  agentName?: string;
  agentCode?: string;
}

const ReviewKyc: React.FC<ReviewKycProps> = ({
  open,
  onClose,
  onApprove,
  onReject,
  agentName,
  agentCode,
}) => {
  const [reason, setReason] = useState("");

  const checkerBg = {
    mt: 1,
    height: 130,
    borderRadius: "12px",
    border: `2px solid #26619A`,
    backgroundColor: "#f8f8f8",
    backgroundImage:
      "linear-gradient(45deg, #d0d0d0 25%, transparent 25%), \
       linear-gradient(-45deg, #d0d0d0 25%, transparent 25%), \
       linear-gradient(45deg, transparent 75%, #d0d0d0 75%), \
       linear-gradient(-45deg, transparent 75%, #d0d0d0 75%)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="body"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "visible",
          p: 0,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{ px: 3, pt: 3, pb: 1, fontSize: "20px", fontWeight: 700 }}
      >
        KYC Document Review
      </DialogTitle>

      <Typography sx={{ px: 3, color: "grey.600", mb: 2 }}>
        Review and verify KYC documents for {agentName} ({agentCode})
      </Typography>

      {/* Content */}
      <DialogContent sx={{ px: 3, pb: 1, overflow: "visible" }}>
        {/* Aadhaar Card Section */}
        <Paper
          sx={{
            border: `2px solid #26619A`,
            borderRadius: "12px",
            p: 2,
            mb: 3,
            background: "#ffffff",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ fontSize: "18px", fontWeight: 700, color: "#0066cc" }}
            >
              Aadhaar Card
            </Typography>

            <Box
              sx={{
                background: "#f1f1f1",
                borderRadius: "6px",
                px: 1.5,
                py: 0.5,
                fontSize: "14px",
              }}
            >
              XXXX XXXX 4521
            </Box>
          </Box>

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography>Front Side</Typography>
              <Box sx={checkerBg} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography>Back Side</Typography>
              <Box sx={checkerBg} />
            </Box>
          </Box>
        </Paper>

        {/* PAN Card Section */}
        <Paper
          sx={{
            border: `2px solid #26619A`,
            borderRadius: "12px",
            p: 2,
            mb: 3,
            background: "#ffffff",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ fontSize: "18px", fontWeight: 700, color: "#0066cc" }}
            >
              PAN Card
            </Typography>

            <Box
              sx={{
                background: "#f1f1f1",
                borderRadius: "6px",
                px: 1.5,
                py: 0.5,
                fontSize: "14px",
              }}
            >
              ABCDE1234F
            </Box>
          </Box>

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography>Front Side</Typography>
              <Box sx={checkerBg} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography>Back Side</Typography>
              <Box sx={checkerBg} />
            </Box>
          </Box>
        </Paper>

        {/* Rejection Reason */}
        <Typography sx={{ mb: 1, fontWeight: 600 }}>
          Rejection Reason (if Rejecting)
        </Typography>

        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Provide detailed reason for rejection..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ borderRadius: 2, background: "#fafafa" }}
        />
      </DialogContent>

      {/* Action Buttons */}
      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            textTransform: "none",
            width: 120,
            backgroundColor: "#A3AED0",
            color: "#fff",
            "&:hover": { backgroundColor: "#A3AED0" },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => onReject(reason)}
          sx={{ width: 140, textTransform: "none", backgroundColor: "#FF0000" }}
        >
          Reject KYC
        </Button>

        <Button
          variant="contained"
          onClick={onApprove}
          sx={{
            textTransform: "none",
            width: 150,
            backgroundColor: "#26619A",
            "&:hover": { backgroundColor: "#26619A" },
          }}
        >
          Approve KYC
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewKyc;
