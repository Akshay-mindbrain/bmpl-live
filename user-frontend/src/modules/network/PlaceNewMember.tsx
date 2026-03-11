import {
  Box,
  Card,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Chip,

} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import designConfig from "../../config/designConfig";
import PageHeader from "../../components/common/PageHeader";

export default function PlaceNewMember() {
  const navigate = useNavigate();
  const members = [
    { name: "Vikram Shah", id: "PENDING001", type: "Silver", invited: "14 Oct", status: "done" },
    { name: "Vikram Shah", id: "PENDING001", type: "Silver", invited: "14 Oct", status: "done" },
    { name: "Vikram Shah", id: "PENDING001", type: "Silver", invited: "14 Oct", status: "pending" },
  ];

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: designConfig.colors.background.light, pb: 4 }}>

      {/* Header */}
      <PageHeader title="Place New Member" />

      <Box sx={{ p: 4 }}>
        {/* Search Bar */}
        <TextField
          placeholder="Search by ID or name"
          fullWidth
          sx={{
            mb: 2,
            bgcolor: "white",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#9E9E9E" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Alert text */}
        <Typography
          variant="body2"
          sx={{
            bgcolor: designConfig.colors.warning.background || "#FFF8E1",
            borderRadius: 2,
            p: 1.5,
            mb: 2,
            color: designConfig.colors.warning.main,
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <InfoIcon sx={{ fontSize: 20 }} />
          Select a member from your pending invites who has completed KYC verification.
        </Typography>

        {/* Section Title */}
        <Typography
          variant="h6"
          sx={{ color: designConfig.colors.primary.main, fontWeight: 700, mb: 1, fontSize: "18px" }}
        >
          Pending Members ({members.length})
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Member Cards */}
        {members.map((m, i) => (
          <Card
            key={i}
            onClick={() => m.status === "done" && navigate('/choose-position')}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
              border: `1px solid ${designConfig.colors.primary.light}44`,
              backgroundColor: m.status === "pending" ? designConfig.colors.warning.background || "#FFF8E1" : "white",
              cursor: m.status === "done" ? "pointer" : "default",
              boxShadow: designConfig.shadows.sm,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: m.status === "done" ? "translateY(-4px)" : "none",
                boxShadow: m.status === "done" ? designConfig.shadows.md : designConfig.shadows.sm,
                borderColor: m.status === "done" ? designConfig.colors.primary.main : "inherit"
              }
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: 2,
                    bgcolor: designConfig.colors.primary.light + "22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AccountCircleIcon style={{ color: designConfig.colors.primary.main, fontSize: 30 }} />
                </Box>

                <Box>
                  <Typography fontWeight={700} color={designConfig.colors.text.primary}>{m.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {m.id}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    • {m.type} &nbsp;&nbsp; • Invited: {m.invited}
                  </Typography>
                </Box>
              </Box>

              {/* Status Chip */}
              {m.status === "done" ? (
                <Chip
                  label="✓ KYC Done"
                  variant="outlined"
                  icon={<CheckCircleIcon sx={{ color: "#4CAF50" }} />}
                  sx={{
                    color: "#4CAF50",
                    borderColor: "#4CAF50",
                    fontWeight: 600,
                  }}
                />
              ) : (
                <Chip
                  label="KYC Pending"
                  variant="outlined"
                  icon={<HourglassEmptyIcon sx={{ color: "#FF9800" }} />}
                  sx={{
                    color: "#FF9800",
                    borderColor: "#FF9800",
                    fontWeight: 600,
                  }}
                />
              )}
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
