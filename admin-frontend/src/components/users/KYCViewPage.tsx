import React, { useState } from "react";
import { Box, Avatar, Typography, Button, Paper } from "@mui/material";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

import type { Agent } from "./types";

interface Props {
  agent: Agent;
  onBack: () => void;
  onTeamView: () => void;
  onEarningsView: () => void;
  onHistoryView: () => void;
  onVerificationView: () => void;
}

const BLUE = "#26619A";

const KYCViewPage: React.FC<Props> = ({
  agent,
  onBack,
  onTeamView,
  onEarningsView,
  onHistoryView,
  onVerificationView,
}) => {
  const [activeTab, setActiveTab] = useState<string>("kyc");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "overview") onBack();
    if (tab === "team") onTeamView();
    if (tab === "earnings") onEarningsView();
    if (tab === "history") onHistoryView();
  };

  const tabs = ["overview", "kyc", "team", "earnings", "history"];

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        height: "95vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#F9FAFC",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ flexGrow: 1, overflowX: "auto" }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar src={agent.avatar} sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography sx={{ fontWeight: 700 }}>{agent.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {agent.code} • Joined {agent.joinDate}
            </Typography>
          </Box>
        </Box>

        {/* Tabs */}
        <Paper
          sx={{
            p: 1.5,
            mb: 3,
            overflowX: "auto",
            borderRadius: "12px",
            background: "#F9FAFC",
          }}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            {tabs.map((tab) => (
              <Button
                key={tab}
                onClick={() => handleTabClick(tab)}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  textTransform: "none",
                  fontWeight: 500,
                  color: activeTab === tab ? "#fff" : "#000",
                  bgcolor: activeTab === tab ? BLUE : "transparent",
                  "&:hover": {
                    bgcolor: activeTab === tab ? BLUE : "transparent",
                  },
                  borderRadius: activeTab === tab ? "3px" : "2px",
                  py: 0.6,
                  minHeight: "38px",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {tab === "overview"
                  ? "Overview"
                  : tab === "kyc"
                    ? "KYC & Bank"
                    : tab === "team"
                      ? "Team"
                      : tab === "earnings"
                        ? "Earnings"
                        : "History"}
              </Button>
            ))}
          </Box>
        </Paper>

        {/* KYC Section */}
        {activeTab === "kyc" && (
          <Box
            sx={{
              border: `2px solid ${BLUE}`,
              borderRadius: "12px",
              p: 2,
              mt: 1,
              background: "#ffffff",
            }}
          >
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight={700} color={BLUE}>
                KYC Verification
              </Typography>

              <Button
                variant="outlined"
                startIcon={<VerifiedOutlinedIcon sx={{ color: "#70BF45" }} />}
                sx={{
                  borderColor: "#70BF45",
                  color: "#70BF45",
                  fontWeight: 600,
                  borderRadius: "8px",
                  px: 2,
                  py: "2px",
                  fontSize: "13px",
                }}
                onClick={onVerificationView}
              >
                Verified
              </Button>
            </Box>

            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1.5}>
              <Box p={2} borderRadius={2} bgcolor="#f5f5f5">
                <Typography variant="body2">Aadhaar Number</Typography>
                <Typography fontWeight="bold">XXXX XXXX 4521</Typography>
              </Box>

              <Box p={2} borderRadius={2} bgcolor="#f5f5f5">
                <Typography variant="body2">PAN Number</Typography>
                <Typography fontWeight="bold">ABCDE1234F</Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Bank Section */}
        {activeTab === "kyc" && (
          <Box
            sx={{
              border: `2px solid ${BLUE}`,
              borderRadius: "12px",
              p: 2,
              mt: 1.5,
              background: "#ffffff",
            }}
          >
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight={700} color={BLUE}>
                Bank Account Verification
              </Typography>

              <Button
                variant="outlined"
                startIcon={<VerifiedOutlinedIcon sx={{ color: "#70BF45" }} />}
                sx={{
                  borderColor: "#70BF45",
                  color: "#70BF45",
                  fontWeight: 600,
                  borderRadius: "8px",
                  px: 2,
                  py: "2px",
                  fontSize: "13px",
                }}
                onClick={onVerificationView}
              >
                Verified
              </Button>
            </Box>

            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1.5}>
              <Box p={2} borderRadius={2} bgcolor="#f5f5f5">
                <Typography variant="body2">Account Holder</Typography>
                <Typography fontWeight="bold">Rajesh Kumar</Typography>
              </Box>

              <Box p={2} borderRadius={2} bgcolor="#f5f5f5">
                <Typography variant="body2">Bank Name</Typography>
                <Typography fontWeight="bold">State Bank of India</Typography>
              </Box>

              <Box p={2} borderRadius={2} bgcolor="#f5f5f5">
                <Typography variant="body2">Account Number</Typography>
                <Typography fontWeight="bold">XXXXXXXX4521</Typography>
              </Box>

              <Box p={2} borderRadius={2} bgcolor="#f5f5f5">
                <Typography variant="body2">IFSC Code</Typography>
                <Typography fontWeight="bold">SBIN0001234</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          borderTop: "1px solid #A3AED0",
          pt: 2,
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 1,
        }}
      >
        {activeTab === "kyc" && agent.kyc === "Pending" && (
          <>
            <Button
              variant="contained"
              sx={{
                background: "#70BF45",
                color: "white",
                px: 3,
                textTransform: "none",
                fontSize: "13px",
                "&:hover": { background: "#5fa33a" },
              }}
              onClick={() => {
                console.log("Approved");
                onBack();
              }}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "#FF5252",
                color: "white",
                px: 3,
                textTransform: "none",
                fontSize: "13px",
                "&:hover": { background: "#e53935" },
              }}
              onClick={() => {
                console.log("Rejected");
                onBack();
              }}
            >
              Reject
            </Button>
          </>
        )}
        <Button
          variant="contained"
          onClick={onBack}
          sx={{
            textTransform: "none",
            bgcolor: "#A3AED0",
            color: "#ffffff",
            "&:hover": { bgcolor: "#A3AED0" },
          }}
        >
          Close
        </Button>
      </Box>
    </Paper>
  );
};

export default KYCViewPage;

