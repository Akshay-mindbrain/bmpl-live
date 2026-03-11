// src/pages/Dashboard/Dashboard.tsx
import { Box } from "@mui/material";
import SalesBVTrend from "../components/dashboard/SalesBVTrend";
import AtCapAgents from "../components/dashboard/AtCapAgents";
import PendingKYCApprovals from "../components/dashboard/PendingKYCApprovals";
import RecentOrders from "../components/dashboard/RecentOrders";
import PayoutStatus from "../components/dashboard/PayoutStatus";
import Card from "../components/dashboard/Card";
const DashboardPage = () => {
  return (
    <Box>
      {/* <Typography variant="h5" fontWeight={600} mb={3}>
        Dashboard Overview
      </Typography> */}
      <Card />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          "@media (min-width: 900px)": {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          }
        }}
      >
        {/* Top Row */}
        <SalesBVTrend />
        <AtCapAgents />

        {/* Middle Row */}
        <Box sx={{ mt: 5, height: "100%", width: "100%" }}>
          <PendingKYCApprovals />
        </Box>
        <Box sx={{ mt: 5, height: "100%", width: "100%" }}>
          <RecentOrders />
        </Box>
      </Box>

      {/* Bottom Row - Full Width */}
      <Box sx={{ mt: 9 }}>
        <PayoutStatus />
      </Box>
    </Box>
  );
};

export default DashboardPage;
