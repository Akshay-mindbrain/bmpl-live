import React, { useState } from "react";
import { Box, Avatar, Typography, Button, Paper } from "@mui/material";
import ReviewKyc from "./ReviewKyc";

interface Agent {
  fullName?: string;
  agentCode?: string;
  photo?: string;
  joinDate?: string;
}

interface Props {
  agent?: Agent;
  onClose: () => void;
  onBack?: () => void;
  onNavigate?: (
    page: "overview" | "kyc" | "team" | "earnings" | "history"
  ) => void;
}

const BLUE = "#26619A";

const VerificationPage: React.FC<Props> = ({ agent, onClose, onNavigate }) => {
  // Default tab = 1 to show KYC & Bank on load
  const [tab, setTab] = useState<number>(1);
  const [openReview, setOpenReview] = useState<boolean>(false);

  const tabs = ["Overview", "KYC & Bank", "Team", "Earnings", "History"];

  const handleTabClick = (index: number) => {
    setTab(index);
    const mapping: ("overview" | "kyc" | "team" | "earnings" | "history")[] = [
      "overview",
      "kyc",
      "team",
      "earnings",
      "history",
    ];
    if (onNavigate) onNavigate(mapping[index]);
  };

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return (
          <Typography sx={{ fontSize: "14px", color: "#555" }}>
            Overview content for {agent?.fullName ?? "the agent"}.
          </Typography>
        );
      case 1:
        return (
          <>
            {/* KYC Section */}
            <Paper
              sx={{
                borderRadius: "12px",
                p: 1.5,
                border: `2px solid ${BLUE}`,
                mb: 1.5,
                background: "#ffffff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.8,
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                  KYC Verification
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    background: "#FFF4E5",
                    border: "1px solid #FFBF70",
                    px: 0.8,
                    py: "2px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#E67E22",
                  }}
                >
                  ⓘ PENDING
                </Box>
              </Box>
              <Button
                variant="contained"
                onClick={() => setOpenReview(true)}
                sx={{
                  textTransform: "none",
                  mt: 0.8,
                  background: BLUE,
                  "&:hover": { background: "#1b4a78" },
                  fontSize: "13px",
                  py: 0.5,
                }}
              >
                Review KYC Documents
              </Button>
            </Paper>

            {/* Bank Section */}
            <Paper
              sx={{
                borderRadius: "12px",
                p: 1.5,
                border: `2px solid ${BLUE}`,
                background: "#ffffff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.8,
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                  Bank Account Verification
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    background: "#FFF4E5",
                    border: "1px solid #FFBF70",
                    px: 0.8,
                    py: "2px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#E67E22",
                  }}
                >
                  ⓘ PENDING
                </Box>
              </Box>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  mt: 0.8,
                  background: BLUE,
                  "&:hover": { background: "#1b4a78" },
                  fontSize: "13px",
                  py: 0.5,
                }}
              >
                Verify Bank Account
              </Button>
            </Paper>
          </>
        );
      case 2:
        return (
          <Typography sx={{ fontSize: "14px", color: "#555" }}>
            Team information for {agent?.fullName ?? "the agent"} will appear
            here.
          </Typography>
        );
      case 3:
        return (
          <Typography sx={{ fontSize: "14px", color: "#555" }}>
            Earnings data for {agent?.fullName ?? "the agent"} will appear here.
          </Typography>
        );
      case 4:
        return (
          <Typography sx={{ fontSize: "14px", color: "#555" }}>
            History logs for {agent?.fullName ?? "the agent"} will appear here.
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* KYC Review Modal */}
      <ReviewKyc
        open={openReview}
        onClose={() => setOpenReview(false)}
        onApprove={() => {
          console.log("KYC APPROVED");
          setOpenReview(false);
        }}
        onReject={(reason) => {
          console.log("KYC REJECTED:", reason);
          setOpenReview(false);
        }}
        agentName={agent?.fullName}
        agentCode={agent?.agentCode}
      />

      {/* Main Container */}
      <Box
        sx={{
          maxWidth: "560px",
          width: "100%",
          background: "white",
          borderRadius: "12px",
          border: "2px solid #1E569C",
          p: 2,
          mx: "auto",
          my: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <Avatar
            src={agent?.photo}
            sx={{ width: 50, height: 50, border: "2px solid #eee" }}
          />
          <Box sx={{ ml: 1.5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "15px" }}>
              {agent?.fullName ?? "Rajesh Kumar"}
            </Typography>
            <Typography sx={{ fontSize: "11px", color: "#6b7280" }}>
              {agent?.agentCode ?? "AGT-1045"} • Joined{" "}
              {agent?.joinDate ?? "15/8/2024"}
            </Typography>
          </Box>
        </Box>

        {/* Tabs */}
        <Paper
          sx={{ p: 1, mb: 2, borderRadius: "12px", background: "#F9FAFC" }}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            {tabs.map((label, index) => (
              <Button
                key={label}
                variant="text"
                onClick={() => handleTabClick(index)}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  textTransform: "none",
                  fontWeight: 500,
                  color: tab === index ? "#fff" : "#000",
                  bgcolor: tab === index ? BLUE : "transparent !important",
                  "&:hover": {
                    bgcolor: tab === index ? BLUE : "transparent !important",
                  },
                  borderRadius: tab === index ? "4px" : "0px",
                  py: 1,
                  minHeight: "38px",
                  fontSize: "13px",
                  boxShadow: "none",
                  textAlign: "center",
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Paper>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Footer */}
        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              background: "#A3AED0",
              color: "white",
              px: 3,
              textTransform: "none",
              fontSize: "13px",
              "&:hover": { background: "#CACFE1" },
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default VerificationPage;
