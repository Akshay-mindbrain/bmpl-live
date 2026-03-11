import React, { useState, useMemo } from "react";
import { Box, Typography, Button, Paper, RadioGroup } from "@mui/material";
import type { Agent } from "./types";

interface UpgradePackagePageProps {
  agent?: Agent;
  packageName?: string;
  selectedPkg?: string;
  onCancel: () => void;
  onConfirm: (pkg: string) => void;
}

const PACKAGE_DATA: Record<
  string,
  { name: string; price: number; bv: number }
> = {
  gold: { name: "Gold Partner", price: 10000, bv: 3000 },
  platinum: { name: "Platinum", price: 15000, bv: 5000 },
};

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

const UpgradeSummaryPage: React.FC<UpgradePackagePageProps> = ({
  agent,
  packageName,
  selectedPkg,
  onCancel,
  onConfirm,
}) => {
  const [selected, setSelected] = useState(selectedPkg || packageName || "");

  const currentPackage = agent?.currentPackageName || "Silver";
  const currentAmount = currentPackage === "Silver" ? 5000 : 0;
  const currentBV = agent?.currentBV || 500;

  const { newPackage, newAmount, upgradeCost, additionalBV } = useMemo(() => {
    if (!selected)
      return { newPackage: "-", newAmount: 0, upgradeCost: 0, additionalBV: 0 };

    const pkg = PACKAGE_DATA[selected];
    return {
      newPackage: pkg.name,
      newAmount: pkg.price,
      upgradeCost: pkg.price - currentAmount,
      additionalBV: pkg.bv - currentBV,
    };
  }, [selected, currentAmount, currentBV]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "650px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            p: 3,
            pb: 1,
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "18px" }}>
            Package Upgrade
          </Typography>

          <Typography sx={{ fontSize: "12px", color: "#6b7280", mt: 0.5 }}>
            Upgrade package for {agent?.fullName || "Rajesh Kumar"} (
            {agent?.agentCode || "AGT-1045"})
          </Typography>
        </Box>

        {/* SCROLL CONTENT */}
        <Box
          sx={{
            overflowY: "auto",
            px: 3,
            pb: 2,
            /* INVISIBLE SCROLLBAR */
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {/* CURRENT PACKAGE */}
          <Paper
            sx={{
              p: 1.5,
              mt: 1,
              borderRadius: "12px",
              border: `2px solid #26619A`,
              background: "#ffffff",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                  Current Package
                </Typography>
                <Typography sx={{ fontSize: "12px", mt: 0.3 }}>
                  {currentPackage}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Typography
                  sx={{ fontWeight: 600, color: "#1976d2", fontSize: "16px" }}
                >
                  {currentBV}
                </Typography>
                <Typography sx={{ fontSize: "11px", color: "#555" }}>
                  BV Earned
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* SELECT PACKAGE */}
          <Typography
            sx={{ fontWeight: 700, fontSize: "15px", mt: 3, mb: 1.5 }}
          >
            Select Upgrade Package
          </Typography>

          <RadioGroup
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <PackageCard
              selected={selected === "gold"}
              title="Gold Partner"
              price="₹10,000"
              bv="3000 BV"
              onSelect={() => setSelected("gold")}
              items={[
                "Premium commission",
                "10 referral coupons",
                "300 coins/month",
                "₹5,000 daily cap",
              ]}
            />

            <PackageCard
              selected={selected === "platinum"}
              title="Platinum"
              price="₹15,000"
              bv="5000 BV"
              onSelect={() => setSelected("platinum")}
              items={[
                "Maximum commission",
                "20 referral coupons",
                "500 coins/month",
                "₹10,000 daily cap",
              ]}
            />
          </RadioGroup>

          {/* SUMMARY BOX */}
          <Box
            sx={{
              background: "#F9FAFC",
              borderRadius: "10px",
              p: 2,
              border: "1px solid #E5E5E5",
              mt: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#2F80ED",
                mb: 2,
              }}
            >
              Upgrade Summary
            </Typography>

            <Row
              label="Current Package"
              value={`${currentPackage} (₹${currentAmount})`}
            />
            <Row
              label="New Package"
              value={`${newPackage} ${newAmount ? `(₹${newAmount})` : ""}`}
            />
            <Row label="Upgrade Cost" value={`₹${upgradeCost}`} bold />
            <Row label="Additional BV" value={`+${additionalBV} BV`} green />
          </Box>
        </Box>

        {/* FOOTER */}
        <Box
          sx={{
            p: 2,
            px: 3,
            borderTop: "1px solid #A3AED0",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            flexShrink: 0,
            background: "white",
          }}
        >
          <Button
            variant="contained"
            onClick={onCancel}
            sx={{
              width: 120,
              backgroundColor: "#979797", // updated background color
              color: "#fff", // white text
              "&:hover": { backgroundColor: "#979797" },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={!selected}
            onClick={() => onConfirm(selected)}
          >
            Confirm Upgrade
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

type PackageCardProps = {
  selected: boolean;
  title: string;
  price: string;
  bv: string;
  onSelect: () => void;
  items: string[];
};

const PackageCard: React.FC<PackageCardProps> = ({
  selected,
  title,
  price,
  bv,
  onSelect,
  items,
}) => (
  <Paper
    onClick={onSelect}
    sx={{
      border: selected ? "2px solid #1976d2" : "1px solid #e4e7ec",
      borderRadius: "8px",
      overflow: "hidden",
      mb: 1.5,
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
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {title}
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: "13px", mt: 0.3 }}>
          {price}
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>{bv}</Typography>
    </Box>

    <Box sx={{ p: 1.5 }}>
      {items.map((item: string) => (
        <TickItem key={item} text={item} />
      ))}
    </Box>
  </Paper>
);

type RowProps = {
  label: string;
  value: string | number;
  bold?: boolean;
  green?: boolean;
};

const Row: React.FC<RowProps> = ({ label, value, bold, green }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
    <Typography>{label}</Typography>
    <Typography
      sx={{
        fontWeight: bold ? 600 : 500,
        color: green ? "green" : "inherit",
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default UpgradeSummaryPage;
