import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Divider,
  Typography,
} from "@mui/material";

interface EditProfileInfoProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const EditProfileInfo: React.FC<EditProfileInfoProps> = ({
  open,
  onClose,
  onSave,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle>Edit Personal Information</DialogTitle>

      <Divider />

      <DialogContent>
        <Box mt={2}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 2,
            }}
          >
            {/* First Name */}
            <Box>
              <Typography fontSize={12} color="text.secondary" mb={0.5}>
                First Name
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="Moni"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input": {
                    color: "#667085",
                  },
                }}
              />
            </Box>

            {/* Last Name */}
            <Box>
              <Typography fontSize={12} color="text.secondary" mb={0.5}>
                Last Name
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="Roy"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input": {
                    color: "#667085",
                  },
                }}
              />
            </Box>

            {/* Email */}
            <Box>
              <Typography fontSize={12} color="text.secondary" mb={0.5}>
                Email Address
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="moniroy123@gmail.com"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input": {
                    color: "#667085",
                  },
                }}
              />
            </Box>

            {/* Phone */}
            <Box>
              <Typography fontSize={12} color="text.secondary" mb={0.5}>
                Phone
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="+09 363 398 46"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input": {
                    color: "#667085",
                  },
                }}
              />
            </Box>

            {/* BIO — FULL WIDTH BELOW */}
            <Box sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}>
              <Typography fontSize={12} color="text.secondary" mb={0.5}>
                Bio
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="Admin"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input": {
                    color: "#667085",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "#979797",
            borderColor: "#979797",
            borderRadius: "10px",
            textTransform: "none",
            px: 3,
            "&:hover": { borderColor: "#979797" },
          }}
        >
          Close
        </Button>

        <Button
          onClick={onSave}
          variant="contained"
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            px: 3,
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileInfo;
