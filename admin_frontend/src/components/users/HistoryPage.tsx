import React from "react";
import { Box, Typography, Paper, Button, Avatar } from "@mui/material";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Groups, Person, Verified } from "@mui/icons-material";

import type { Agent, AgentTab } from "./types";

interface HistoryItem {
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
}

interface HistoryPageProps {
  agent: Agent;
  onBack: () => void;
  onTabChange: (tab: AgentTab) => void;
}

const BLUE = "#26619A";

/* ---------- Timeline Icon Wrapper ---------- */
const TimelineIcon: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      backgroundColor: "#E9F7EF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </Box>
);

const HistoryPage: React.FC<HistoryPageProps> = ({
  agent,
  onBack,
  onTabChange,
}) => {
  const historyData: HistoryItem[] = [
    {
      title: "Commission Payout",
      description:
        "Weekly commission of ₹12,450 credited to wallet successfully",
      date: "2025-10-28 18:30",
      icon: <CurrencyRupeeIcon sx={{ color: "#2e7d32" }} />,
      tag: "commission",
      tagColor: "#2e7d32",
    },
    {
      title: "New Team Member",
      description: "AGT-8901 joined under left leg",
      date: "2025-10-27 14:20",
      icon: <Groups sx={{ color: "#2e7d32" }} />,
      tag: "team",
      tagColor: "#2e7d32",
    },
    {
      title: "Profile Updated",
      description: "Phone number and email address updated",
      date: "2025-10-26 16:30",
      icon: <Person sx={{ color: "#2e7d32" }} />,
      tag: "profile",
      tagColor: "#2e7d32",
    },
    {
      title: "Bank Account Verified",
      description: "Bank account verification completed successfully",
      date: "2025-10-25 12:10",
      icon: <Verified sx={{ color: "#2e7d32" }} />,
      tag: "bank",
      tagColor: "#2e7d32",
    },
  ];

  const tabs: { label: string; value: AgentTab }[] = [
    { label: "Overview", value: "overview" },
    { label: "KYC & Bank", value: "kyc" },
    { label: "Team", value: "team" },
    { label: "Earnings", value: "earnings" },
    { label: "History", value: "history" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        height: "750px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src={agent?.avatar} sx={{ width: 60, height: 60, mr: 1.5 }} />
        <Box>
          <Typography fontWeight={700}>{agent?.name}</Typography>
          <Typography fontSize={12} color="#666">
            {agent?.id} • Joined {agent?.joinDate}
          </Typography>
        </Box>
      </Box>

      {/* TABS */}
      <Paper sx={{ p: 1, borderRadius: 2, background: "#F9FAFC" }}>
        <Box sx={{ display: "flex" }}>
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              sx={{
                flex: 1,
                textTransform: "none",
                bgcolor: tab.value === "history" ? BLUE : "transparent",
                color: tab.value === "history" ? "#fff" : "#000",
                "&:hover": {
                  bgcolor: tab.value === "history" ? BLUE : "transparent",
                },
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* CONTENT */}
      <Paper
        sx={{ p: 3, borderRadius: 2, border: `2px solid ${BLUE}`, flexGrow: 1 }}
      >
        <Typography color={BLUE} fontWeight={700} mb={3}>
          Activity History
        </Typography>

        {/* TIMELINE */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {historyData.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: "48px 1fr 120px",
                gap: 2,
              }}
            >
              {/* ICON + LINE */}
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TimelineIcon>{item.icon}</TimelineIcon>

                {index < historyData.length - 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 40,
                      width: "2px",
                      height: "100%",
                      backgroundImage:
                        "linear-gradient(to bottom, #cfcfcf 40%, rgba(0,0,0,0) 0%)",
                      backgroundSize: "2px 8px",
                      backgroundRepeat: "repeat-y",
                    }}
                  />
                )}
              </Box>

              {/* TEXT */}
              <Box>
                <Typography fontWeight={700} fontSize={15} color="#0b5cad">
                  {item.title}
                </Typography>
                <Typography fontSize={13} color="#444">
                  {item.description}
                </Typography>
                <Typography
                  fontSize={12}
                  fontWeight={500}
                  color={item.tagColor}
                >
                  {item.tag}
                </Typography>
              </Box>

              {/* DATE */}
              <Typography fontSize={12} color="#777" textAlign="right">
                {item.date}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
      {/* Solid Separator Line */}
      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "#A3AED0",
          mt: 0,
          mb: 1.5,
        }}
      />

      {/* FOOTER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1.5,
          mt: "auto",
          mb: 1.5,
        }}
      >
        <Button
          variant="contained"
          sx={{ bgcolor: "#A3AED0" }}
          onClick={onBack}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default HistoryPage;
