import type { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { ShoppingBag, TrendingUp } from "@mui/icons-material";
import SalesImage from "../../assets/Sales.png";
import OrderImage from "../../assets/Order.png";
import PendingImage from "../../assets/Pending.png";

type StatCardData = {
  id: string;
  label: string;
  value: string;
  change: string;
  changeLabel: string;
  changeColor: string;
  icon?: ReactNode;
  iconColor?: string;
  image?: string;
  iconBg: string;
};

const statCards: StatCardData[] = [
  {
    id: "total-sales",
    label: "Total Sales",
    value: "₹2,84,750",
    change: "8.5%",
    changeLabel: "from last week",
    changeColor: "success.main",
    icon: <ShoppingBag fontSize="small" />,
    iconColor: "#1565c0",
    iconBg: "#e3f2fd",
  },
  {
    id: "total-bv",
    label: "Total BV Generated",
    value: "18,420",
    change: "8.3%",
    changeLabel: "from last week",
    changeColor: "success.main",
    image: SalesImage,
    iconBg: "#e8f5e9",
  },
  {
    id: "orders",
    label: "Orders This Week",
    value: "1,248",
    change: "5.5%",
    changeLabel: "from last week",
    changeColor: "success.main",
    image: OrderImage,
    iconBg: "rgba(254, 197, 61, 0.2)",
  },
  {
    id: "pending-kyc",
    label: "Pending KYC",
    value: "23",
    change: "8.5%",
    changeLabel: "from last week",
    changeColor: "success.main",
    image: PendingImage,
    iconBg: "rgba(255, 144, 102, 0.2)",
  },
];

function DashboardSummaryCards() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(auto-fit, minmax(240px, 1fr))",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 3.5,
        mb: 3,
      }}
    >
      {statCards.map((stat) => (
        <Paper
          key={stat.id}
          sx={{
            p: 3.5,
            borderRadius: 2.5,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 2.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.25,
                flex: 1,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {stat.label}
              </Typography>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                {stat.value}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <TrendingUp sx={{ fontSize: 16, color: "#4caf50" }} />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={stat.changeColor}
                >
                  {stat.change}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.changeLabel}
                </Typography>
              </Box>
            </Box>
            {stat.icon ? (
              <Box
                sx={{
                  bgcolor: stat.iconBg,
                  color: stat.iconColor,
                  width: 48,
                  height: 48,
                  borderRadius: 3.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </Box>
            ) : (
              <Box
                sx={{
                  bgcolor: stat.iconBg,
                  width: 48,
                  height: 48,
                  borderRadius: 3.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1.25,
                  flexShrink: 0,
                }}
              >
                <img
                  src={stat.image}
                  alt={stat.label}
                  style={{
                    width: "28px",
                    height: "28px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default DashboardSummaryCards;
