import React, { useState } from "react";
import { Box, Avatar, Typography, Paper, Button } from "@mui/material";
import type { Agent } from "./types";

interface Props {
  agent: Agent;
  onBack: () => void;
  onTabChange: (tab: number | string) => void; // number or string
}

const BLUE = "#26619A";

const TeamViewPage: React.FC<Props> = ({ agent, onBack, onTabChange }) => {
  const [tab, setTab] = useState(2); // Team tab by default

  const handleTabClick = (index: number) => {
    setTab(index);
    onTabChange(index);
  };

  const tabs = ["Overview", "KYC & Bank", "Team", "Earnings", "History"];

  return (
    <Box sx={{ p: 2 }}>
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
      <Paper sx={{ p: 1, mb: 2, borderRadius: "12px", background: "#F9FAFC" }}>
        <Box sx={{ display: "flex", width: "100%" }}>
          {tabs.map((label, index) => (
            <Button
              key={label}
              onClick={() => handleTabClick(index)}
              sx={{
                flex: 1,
                minWidth: 0,
                textTransform: "none",
                fontWeight: 500,
                color: tab === index ? "#fff" : "#000",
                bgcolor: tab === index ? BLUE : "transparent",
                "&:hover": { bgcolor: tab === index ? BLUE : "transparent" },
                borderRadius: tab === index ? "4px" : "0px",
                py: 0.6,
                minHeight: "38px",
                fontSize: "14px",
                boxShadow: "none",
                textAlign: "center",
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Team Content */}
      <Paper
        sx={{
          p: 2,
          border: `2px solid ${BLUE}`,
          mb: 2,
          borderRadius: "12px",
          background: "#ffffff",
        }}
      >
        <Typography sx={{ fontWeight: 600, mb: 1 }}>Team Structure</Typography>

        <Box sx={{ border: `2px solid ${BLUE}`, p: 2, borderRadius: "12px" }}>
          <Paper sx={{ p: 2, mb: 2, background: "#EFF6FF" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography fontWeight={600}>Left Leg</Typography>
                <Typography color="text.secondary">23 members</Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography fontWeight={700} color={BLUE}>
                  6,240 BV
                </Typography>
                <Typography variant="caption">Total BV</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, background: "#EFF6FF" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography fontWeight={600}>Right Leg</Typography>
                <Typography color="text.secondary">22 members</Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography fontWeight={700} color={BLUE}>
                  6,210 BV
                </Typography>
                <Typography variant="caption">Total BV</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Paper>

      {/* Footer */}
      <Box
        sx={{
          borderTop: "1px solid #A3AED0",
          pt: 2,
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 3,
        }}
      >
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
    </Box>
  );
};

export default TeamViewPage;
