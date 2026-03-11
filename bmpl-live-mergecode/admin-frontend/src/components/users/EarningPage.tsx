import React, { useState } from "react";
import { Box, Avatar, Typography, Button, Paper } from "@mui/material";
import type { Agent } from "./types";

export type AgentTab = "overview" | "kyc" | "team" | "earnings" | "history";

interface EarningPageProps {
  agent: Agent;
  onTabChange: (tab: AgentTab) => void;
  onClose?: () => void;
}

const BLUE = "#26619A";
const GRAY = "#A3AED0";

const EarningPage: React.FC<EarningPageProps> = ({
  agent,
  onTabChange,
  onClose = () => { },
}) => {
  const tabs: { label: string; value: AgentTab }[] = [
    { label: "Overview", value: "overview" },
    { label: "KYC & Bank", value: "kyc" },
    { label: "Team", value: "team" },
    { label: "Earnings", value: "earnings" },
    { label: "History", value: "history" },
  ];

  const [activeTab, setActiveTab] = useState<AgentTab>("earnings");

  const handleTabClick = (tab: AgentTab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <Box
      sx={{
        width: "100%",
        mt: 1,
        background: "transparent",
        borderRadius: 2,
        p: 1.5,
        boxShadow: "none",
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Avatar src={agent.avatar} sx={{ width: 50, height: 50 }} />
        <Box>
          <Typography fontWeight={700}>{agent.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {agent.code} • Joined {agent.joinDate}
          </Typography>
        </Box>
      </Box>

      {/* TABS */}
      <Paper sx={{ p: 1, mb: 3, borderRadius: "12px", background: "#F9FAFC" }}>
        <Box sx={{ display: "flex", width: "100%" }}>
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              sx={{
                flex: 1,
                minWidth: 0,
                textTransform: "none",
                fontWeight: 500,
                color: activeTab === tab.value ? "#fff" : "#000",
                bgcolor: activeTab === tab.value ? BLUE : "transparent",
                "&:hover": {
                  bgcolor: activeTab === tab.value ? BLUE : "transparent",
                },
                borderRadius: activeTab === tab.value ? "4px" : "0px",
                py: 0.5,
                minHeight: "38px",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* CONTENT */}
      <Box
        sx={{
          border: `2px solid ${BLUE}`,
          borderRadius: "12px",
          p: 3,
          background: "#fff",
        }}
      >
        <Typography fontWeight={700} color={BLUE} mb={2}>
          Earnings Summary
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "repeat(2,1fr)" }}
          gap={1}
        >
          {[
            ["Total Earnings", "₹1,45,600"],
            ["Current Month", "₹23,400"],
            ["Last Payout", "₹12,450"],
            ["Pending Payout", "₹8,300"],
          ].map(([label, value]) => (
            <Box key={label} p={2} borderRadius={2} bgcolor="#f5f5f5">
              <Typography variant="body2">{label}</Typography>
              <Typography fontWeight="bold">{value}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          borderTop: "1px solid #A3AED0",
          pt: 2,
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 2,
        }}
      >
        {/* UPDATED CLOSE BUTTON */}
        <Button
          variant="contained"
          size="small"
          onClick={onClose}
          sx={{
            textTransform: "none",
            bgcolor: GRAY,
            color: "#fff",
            minWidth: 80,
            py: 0.6,
            "&:hover": { bgcolor: GRAY },
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default EarningPage;
