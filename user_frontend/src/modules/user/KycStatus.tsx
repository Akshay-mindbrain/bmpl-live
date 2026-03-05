import { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  Card,
  Button,
} from "@mui/material";
import { KycStatus } from "../../assets/Icons";
import designConfig from "../../config/designConfig";

export default function KycStatusPage() {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          textAlign: "center",
          bgcolor: designConfig.colors.background.default
        }
      }}
    >
      <Box sx={{ p: 1 }}>
        {/* ICON */}
        <Box
          sx={{
            width: 60,
            height: 60,
            bgcolor: designConfig.colors.success.background,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
            boxShadow: "none",
          }}
        >
          <KycStatus />
        </Box>

        {/* TITLE TEXT */}
        <Typography variant="h6" fontWeight={700} gutterBottom color={designConfig.colors.text.primary}>
          KYC Verified
        </Typography>

        {/* SUBTEXT */}
        <Typography variant="body2" color="text.secondary" mb={3}>
          Your identity has been successfully verified
        </Typography>

        {/* DOCUMENTS CARD */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px dashed ${designConfig.colors.primary.main}`,
            bgcolor: designConfig.colors.background.paper,
            p: 2,
            mb: 3,
            textAlign: 'left'
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 14,
              color: designConfig.colors.success.main,
              mb: 1.5,
            }}
          >
            Submitted Documents
          </Typography>

          {[
            { label: "PAN Card", status: "Verified" },
            { label: "Aadhaar Card", status: "Verified" },
            { label: "Selfie", status: "Verified" },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 0.8,
                fontSize: 14,
                borderBottom: `1px solid ${designConfig.colors.background.border}`,
                '&:last-child': { borderBottom: 'none' }
              }}
            >
              <span style={{ color: designConfig.colors.text.secondary }}>{item.label}</span>
              <span style={{ color: designConfig.colors.primary.main, fontWeight: 700, fontSize: '0.85rem' }}>
                {item.status}
              </span>
            </Box>
          ))}
        </Card>

        {/* CLOSE BUTTON */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleClose}
          sx={{
            bgcolor: designConfig.colors.primary.main,
            color: "white",
            textTransform: "none",
            fontWeight: 700,
            fontSize: '1rem',
            borderRadius: "12px",
            py: 1.2,
            boxShadow: designConfig.shadows.primary,
            "&:hover": { bgcolor: designConfig.colors.primary.dark },
          }}
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
}
