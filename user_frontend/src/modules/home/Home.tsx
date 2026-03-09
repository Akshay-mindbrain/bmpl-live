
import { Box } from "@mui/material";
import designConfig from '../../config/designConfig';
import { BvOverviewCard } from "./components/BvOverviewCard";
import DashboardHeader from "./components/HeaderSection";
import { InviteEarnCard } from "./components/InviteEarnCard";
import { QuickStatsGrid } from "./components/QuickStatsGrid";

export default function Home() {
    return (
        <Box sx={{ bgcolor: designConfig.colors.background.light, minHeight: "100vh", pb: 10 }}>
            {/* 1. Header Section */}
            <DashboardHeader />

            {/* 2. Quick Stats Grid */}
            <QuickStatsGrid />

            {/* 3. BV Overview Card */}
            <BvOverviewCard />

            {/* 4. Invite & Earn Card */}
            <InviteEarnCard />
        </Box>
    );
}
