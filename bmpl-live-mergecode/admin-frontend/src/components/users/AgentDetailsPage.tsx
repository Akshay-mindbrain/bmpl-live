import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import type { Agent, AgentTab } from "./types";

// BV Hooks
import { useLastMonthTeamBV } from "../../hooks/Bv/useLastMonthTeamBV";
import { useSelfBV } from "../../hooks/Bv/useSelfBV";
import { useTotalFirstPurchaseBV } from "../../hooks/Bv/useTotalFirstPurchaseBV";
import { useTotalRepurchaseBV } from "../../hooks/Bv/useTotalRepurchaseBV";
import { useUserTotalBV } from "../../hooks/Bv/useUserTotalBV";

interface Props {
  agent: Agent;
  onClose: () => void;
  // onKYCView: () => void;
  // onTeamView: () => void;
  // onEarningsView: () => void;
  // onHistoryView: () => void;
  // onUpgrade: () => void;
}

const BLUE = "#26619A"; 

const AgentDetailsPage: React.FC<Props> = ({
  agent,
  onClose,
  // onKYCView,
  // onTeamView,
  // onEarningsView,
  // onHistoryView,
  // onUpgrade,
}) => {
  const [activeTab, setActiveTab] = useState<AgentTab>("overview");

  // BV Queries
  const { data: totalBVData, isLoading: totalBVLoading } = useUserTotalBV(agent.id);
  const { data: selfBVData, isLoading: selfBVLoading } = useSelfBV(agent.id);
  const { data: firstPurchaseBVData, isLoading: firstPurchaseLoading } = useTotalFirstPurchaseBV(agent.id);
  const { data: repurchaseBVData, isLoading: repurchaseLoading } = useTotalRepurchaseBV(agent.id);
  const { data: lastMonthTeamBVData, isLoading: lastMonthLoading } = useLastMonthTeamBV(agent.id);

  const handleTabClick = (tab: AgentTab) => {
    setActiveTab(tab);
    // if (tab === "kyc") return onKYCView();
    // if (tab === "team") return onTeamView();
    // if (tab === "earnings") return onEarningsView();
    // if (tab === "history") return onHistoryView();
  };

  // Helper to extract BV values safely
  const getBVValue = (apiData: any, leftKey: string, rightKey: string, defaultValue = "0/0") => {
    if (!apiData?.success || !apiData?.data) return defaultValue;
    
    if (typeof apiData.data === 'number') {
      return apiData.data.toLocaleString();
    }
    
    const left = apiData.data[leftKey] || 0;
    const right = apiData.data[rightKey] || 0;
    return `${left.toLocaleString()}/${right.toLocaleString()}`;
  };

  const getSingleBVValue = (apiData: any, defaultValue = "0") => {
    if (!apiData?.success || !apiData?.data) return defaultValue;
    return (apiData.data as number).toLocaleString();
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: "90%",
        maxWidth: "1100px",
        maxHeight: "92vh",
        borderRadius: "12px",
        overflow: "hidden",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        background: "#F9FAFC",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 3,
          "::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        }}
      >
        {/* HEADER */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar src={agent.avatar} sx={{ width: 56, height: 56 }} />
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
            {(
              ["overview", "kyc", "team", "earnings", "history"] as AgentTab[]
            ).map((tab) => (
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

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <Box>
            {/* TOP BV STATS - Smaller & Clean */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              {[
                {
                  title: "Total BV (L/R)",
                  value: totalBVLoading ? "—" : getBVValue(totalBVData, "leftBV", "rightBV"),
                  border: "#9121E0",
                  titleColor: "#9121E0",
                  bg: "#9121E0",
                },
                {
                  title: "Self BV",
                  value: selfBVLoading ? "—" : getSingleBVValue(selfBVData),
                  border: "#70BF45",
                  titleColor: "#70BF45",
                  bg: "#70BF45",
                },
                {
                  title: "Last Month (L/R)",
                  value: lastMonthLoading ? "—" : getBVValue(lastMonthTeamBVData, "lastMonthLeftBV", "lastMonthRightBV"),
                  border: "#DC7751",
                  titleColor: "#DC7751",
                  bg: "#DC7751",
                },
              ].map((s) => (
                <Box
                  key={s.title}
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: "12px",
                    border: `1.5px solid ${s.border}`,
                    textAlign: "center",
                    background: `linear-gradient(135deg, ${s.bg}1A 0%, ${s.bg}33 100%)`,
                  }}
                >
                  <Typography fontSize={22} fontWeight={700} color="#000000">
                    {s.value}
                  </Typography>
                  <Typography
                    fontSize={12}
                    fontWeight={600}
                    color={s.titleColor}
                  >
                    {s.title}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* BV BREAKDOWN - Matching small cards */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: "12px", background: "#F9FAFC" }}>
              <Typography fontWeight={700} mb={3} sx={{ fontSize: "18px", color: BLUE }}>
                BV Breakdown (Left/Right)
              </Typography>
              
              <Box sx={{ display: "flex", gap: 2 }}>
                {[
                  {
                    title: "First Purchase",
                    value: firstPurchaseLoading 
                      ? "—" 
                      : getBVValue(firstPurchaseBVData, "totalFirstPurchaseLeftBV", "totalFirstPurchaseRightBV"),
                    border: "#3D42DF",
                    titleColor: "#3D42DF",
                    bg: "#3D42DF",
                  },
                  {
                    title: "Repurchase",
                    value: repurchaseLoading 
                      ? "—" 
                      : getBVValue(repurchaseBVData, "totalRepurchaseLeftBV", "totalRepurchaseRightBV"),
                    border: "#FF6B6B",
                    titleColor: "#FF6B6B",
                    bg: "#FF6B6B",
                  },
                ].map((s) => (
                  <Box
                    key={s.title}
                    sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: "12px",
                      border: `1.5px solid ${s.border}`,
                      textAlign: "center",
                      background: `linear-gradient(135deg, ${s.bg}1A 0%, ${s.bg}33 100%)`,
                    }}
                  >
                    <Typography fontSize={22} fontWeight={700} color="#000000">
                      {s.value}
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight={600}
                      color={s.titleColor}
                    >
                      {s.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* CONTACT INFO */}
            {/* <Box
              sx={{
                p: 2,
                mb: 2,
                borderRadius: "12px",
                border: `2px solid ${BLUE}`,
                background: "#ffffff",
              }}
            >
              <Typography fontWeight={600} mb={2} color={BLUE}>
                Contact Information
              </Typography>

              {[
                ["Phone", agent.phone || "+91 98765 43210"],
                ["Email", agent.email || "rajesh.kumar@email.com"],
                ["Join Date", agent.joinDate],
                ["Last Active", agent.lastActive || "2025-10-28 14:32"],
              ].map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography fontWeight={500}>{label}</Typography>
                  <Typography>{value}</Typography>
                </Box>
              ))}
            </Box> */}

            {/* PACKAGE INFO */}
            {/* <Box
              sx={{
                p: 3,
                mb: 2,
                borderRadius: "12px",
                border: `2px solid ${BLUE}`,
                background: "#ffffff",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight={600} color={BLUE}>
                  Package Information
                </Typography>
                <Button
                  variant="contained"
                  onClick={onUpgrade}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    bgcolor: "#70BF45",
                    "&:hover": { bgcolor: "#70BF45" },
                  }}
                >
                  Upgrade
                </Button>
              </Box>
              <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography fontWeight={500}>Silver Package</Typography>
                  <Typography fontSize={13} color="text.secondary">
                    Package Value: ₹5,000
                  </Typography>
                </Box>
                <Typography fontWeight={500}>Purchased on 15/8/2024</Typography>
              </Box>
            </Box> */}

            {/* NETWORK POSITION */}
            {/* <Box
              sx={{
                p: 2,
                mb: 2,
                borderRadius: "12px",
                border: `2px solid ${BLUE}`,
              }}
            >
              <Typography fontWeight={600} mb={2} color={BLUE}>
                Network Position
              </Typography>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Box
                  sx={{
                    flex: 1,
                    maxWidth: 320,
                    p: 2,
                    borderRadius: 2,
                    background: "#F9FAFB",
                    border: "1px solid #e0e0e0",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={12} color="text.secondary" mb={1}>
                    Sponsor
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid #d5dae3",
                      borderRadius: 2,
                      py: 0.6,
                      px: 1,
                      fontSize: 13,
                      textAlign: "center",
                      maxWidth: 140,
                      mx: "auto",
                    }}
                  >
                    AGT-0023
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    maxWidth: 320,
                    p: 2,
                    borderRadius: 2,
                    background: "#F9FAFB",
                    border: "1px solid #e0e0e0",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={12} color="text.secondary" mb={1}>
                    Position
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid #d5dae3",
                      borderRadius: 2,
                      py: 0.6,
                      px: 1,
                      fontSize: 13,
                      textAlign: "center",
                      maxWidth: 140,
                      mx: "auto",
                    }}
                  >
                    Left Leg
                  </Box>
                </Box>
              </Box>
            </Box> */}
          </Box>
        )}

        {/* {activeTab === "earnings" && (
          <EarningPage agent={agent} onTabChange={handleTabClick} />
        )} */}
{/* 
        {activeTab === "history" && (
          <HistoryPage
            agent={agent}
            onBack={onClose}
            onTabChange={handleTabClick}
          />
        )} */}
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #A3AED0",
          display: "flex",
          justifyContent: "center",
          gap: 2,
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
                onClose();
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
                onClose();
              }}
            >
              Reject
            </Button>
          </>
        )}
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
    </Paper>
  );
};

export default AgentDetailsPage;
