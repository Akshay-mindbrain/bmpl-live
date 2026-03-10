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

interface EditAddressInfoProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const EditAddressInfo: React.FC<EditAddressInfoProps> = ({
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
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "12px",
        },
      }}
    >
      <DialogTitle>Edit Address</DialogTitle>

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
            {/* Country */}
            <Box>
              <Typography fontSize={12} color="text.secondary" mb={0.5}>
                Country
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="United States"
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

            {/* City */}
            <Box>
              <Typography fontSize={12} color="text.secondary" mb={0.5}>
                City
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="Phoenix"
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

            {/* State */}
            <Box>
              <Typography fontSize={12} color="text.secondary" mb={0.5}>
                State
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="Arizona"
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

            {/* Postal Code */}
            <Box>
              <Typography fontSize={12} color="text.secondary" mb={0.5}>
                Postal Code
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="ERT 2489"
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

      {/* ACTION BUTTONS */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            color: "#A3AED0",
            borderColor: "#A3AED0",
            borderRadius: "10px",
            textTransform: "none",
            px: 3,
            "&:hover": { borderColor: "#A3AED0" },
          }}
        >
          Close
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
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

export default EditAddressInfo;
