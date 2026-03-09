import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import EditProfileInfo from "../components/profile/EditProfileInfo";
import EditAddressInfo from "../components/profile/EditAddressInfo";

const ProfilePage: React.FC = () => {
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [openAddressEdit, setOpenAddressEdit] = useState(false);

  return (
    <Box sx={{ p: 3, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      {/* PAGE TITLE */}
      <Typography fontSize={18} fontWeight={600} mb={2} color="#26619A">
        Profile
      </Typography>

      {/* USER CARD */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src="https://i.pravatar.cc/100"
            alt="Moni Roy"
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography fontWeight={600}>Moni Roy</Typography>
            <Typography fontSize={13} color="text.secondary">
              Admin
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* PERSONAL INFORMATION */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography fontSize={18} fontWeight={600} mb={2} color="#26619A">
            Personal Information
          </Typography>
          <Button
            size="small"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setOpenProfileEdit(true)}
          >
            Edit
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
          }}
        >
          <Box display="flex" flexDirection="column" gap={3}>
            <Box>
              <Typography fontSize={12} color="#26619A">
                First Name
              </Typography>
              <Typography fontWeight={500}>Moni</Typography>
            </Box>

            <Box>
              <Typography fontSize={12} color="#26619A">
                Email Address
              </Typography>
              <Typography fontWeight={500}>moniroy123@gmail.com</Typography>
            </Box>

            <Box>
              <Typography fontSize={12} color="#26619A">
                Bio
              </Typography>
              <Typography fontWeight={500}>Admin</Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={3}>
            <Box>
              <Typography fontSize={12} color="#26619A">
                Last Name
              </Typography>
              <Typography fontWeight={500}>Roy</Typography>
            </Box>

            <Box>
              <Typography fontSize={12} color="#26619A">
                Phone
              </Typography>
              <Typography fontWeight={500}>+09 363 398 46</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* ADDRESS */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography fontSize={18} fontWeight={600} mb={2} color="#26619A">
            Address
          </Typography>
          <Button
            size="small"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setOpenAddressEdit(true)}
          >
            Edit
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ borderBottom: "none", pl: 0 }}>
                  <Typography fontSize={12} color="#26619A">
                    Country
                  </Typography>
                  <Typography fontWeight={500}>United States</Typography>
                </TableCell>

                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography fontSize={12} color="#26619A">
                    City
                  </Typography>
                  <Typography fontWeight={500}>Phoenix</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderBottom: "none", pl: 0 }}>
                  <Typography fontSize={12} color="#26619A">
                    State
                  </Typography>
                  <Typography fontWeight={500}>Arizona</Typography>
                </TableCell>

                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography fontSize={12} color="#26619A">
                    Postal Code
                  </Typography>
                  <Typography fontWeight={500}>ERT 2489</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* MODALS */}
      <EditProfileInfo
        open={openProfileEdit}
        onClose={() => setOpenProfileEdit(false)}
        onSave={() => setOpenProfileEdit(false)}
      />

      <EditAddressInfo
        open={openAddressEdit}
        onClose={() => setOpenAddressEdit(false)}
        onSave={() => setOpenAddressEdit(false)}
      />
    </Box>
  );
};

export default ProfilePage;
