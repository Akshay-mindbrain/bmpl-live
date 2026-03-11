import React, { useState } from "react";
import { Box, Typography, Button, Paper, RadioGroup } from "@mui/material";
import type { Agent } from "./types";

interface UpgradePackagePageProps {
  agent?: Agent;
  onCancel: () => void;
  onConfirm: (pkg: string) => void;
}

const TickItem = ({ text }: { text: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
    <Box
      sx={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        backgroundColor: "#1976d2",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        mr: 1,
      }}
    >
      ✓
    </Box>
    <Typography sx={{ fontSize: "12px" }}>{text}</Typography>
  </Box>
);

const UpgradePackagePage: React.FC<UpgradePackagePageProps> = ({
  agent,
  onCancel,
  onConfirm,
}) => {
  const [selected, setSelected] = useState("");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "650px",
        margin: "0 auto",
        p: 3,
      }}
    >
      {/* HEADER */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "18px" }}>
          Package Upgrade
        </Typography>

        <Typography sx={{ fontSize: "12px", color: "#6b7280", mt: 0.5 }}>
          Upgrade package for {agent?.fullName || "Rajesh Kumar"} (
          {agent?.agentCode || "AGT-1045"})
        </Typography>

        <Paper
          sx={{
            p: 1.5,
            mt: 1.5,
            borderRadius: "12px",
            border: `2px solid #26619A`,
            background: "#EFF6FF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                Current Package
              </Typography>
              <Typography sx={{ fontSize: "12px", mt: 0.3 }}>
                {agent?.currentPackageName || "Silver"}
              </Typography>
            </Box>

            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{ fontWeight: 600, color: "#1976d2", fontSize: "16px" }}
              >
                {agent?.currentBV || 500}
              </Typography>
              <Typography sx={{ fontSize: "11px", color: "#555" }}>
                BV Earned
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* SELECT PACKAGE */}
      <Typography
        sx={{ fontWeight: 700, fontSize: "15px", mb: 1.5, color: "#26619A" }}
      >
        Select Upgrade Package
      </Typography>

      <RadioGroup
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {/* GOLD PACKAGE */}
        <Paper
          onClick={() => setSelected("gold")}
          sx={{
            border:
              selected === "gold" ? "2px solid #26619A" : "1px solid #e4e7ec",
            borderRadius: "8px",
            overflow: "hidden",
            mb: 1.5,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              background: "#26619A",
              color: "white",
              py: 1.2,
              px: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                Gold Partner
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: "13px", mt: 0.3 }}>
                ₹5999
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "13px",
                opacity: 0.9,
              }}
            >
              3000 BV
            </Typography>
          </Box>

          <Box sx={{ p: 1.5 }}>
            <TickItem text="Premium commission" />
            <TickItem text="10 referral coupons" />
            <TickItem text="300 coins/month" />
            <TickItem text="₹5,000 daily cap" />
          </Box>
        </Paper>

        {/* PLATINUM PACKAGE */}
        <Paper
          onClick={() => setSelected("platinum")}
          sx={{
            border:
              selected === "platinum"
                ? "2px solid #1976d2"
                : "1px solid #e4e7ec",
            borderRadius: "8px",
            overflow: "hidden",
            mb: 2,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              background: "#1E569C",
              color: "white",
              py: 1.2,
              px: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                Platinum
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: "13px", mt: 0.3 }}>
                ₹9999
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "13px",
                opacity: 0.9,
              }}
            >
              5000 BV
            </Typography>
          </Box>

          <Box sx={{ p: 1.5 }}>
            <TickItem text="Maximum commission" />
            <TickItem text="20 referral coupons" />
            <TickItem text="500 coins/month" />
            <TickItem text="₹10,000 daily cap" />
          </Box>
        </Paper>
      </RadioGroup>

      {/* FOOTER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          pt: 2.5,
          mt: 1,
          borderTop: "1px solid #A3AED0",
        }}
      >
        <Button
          variant="contained"
          onClick={onCancel}
          sx={{
            minWidth: "110px",
            textTransform: "none",
            backgroundColor: "#979797", // Gray background
            color: "#fff", // White text
            "&:hover": { backgroundColor: "#979797" },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={!selected}
          onClick={() => onConfirm(selected)}
          sx={{
            textTransform: "none",
            backgroundColor: "#26619A", // Updated blue color
            "&:hover": { backgroundColor: "#26619A" },
          }}
        >
          Confirm Upgrade
        </Button>
      </Box>
    </Box>
  );
};

export default UpgradePackagePage;
