
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PercentIcon from "@mui/icons-material/Percent";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BarChartIcon from "@mui/icons-material/BarChart";
import designConfig, { alpha } from '../../config/designConfig';
import { InfoCard } from "./components/InfoCard";

const Welcome = () => {
    return (
        <Container
            maxWidth="sm"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                py: 4,
                bgcolor: designConfig.colors.background.light,
            }}
        >
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
                {/* Header Icon */}
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        bgcolor: designConfig.colors.primary.main,
                        borderRadius: designConfig.borderRadius.md,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: designConfig.colors.primary.contrastText,
                        mb: 2,
                        boxShadow: designConfig.shadows.primary,
                    }}
                >
                    <RocketLaunchIcon sx={{ fontSize: 40 }} />
                </Box>

                {/* Title */}
                <Typography
                    variant="h5"
                    align="center"
                    sx={{ fontWeight: 700, color: designConfig.colors.primary.main, mb: 1 }}
                >
                    Start Your Success Journey
                </Typography>

                {/* Subtitle */}
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ color: designConfig.colors.text.secondary, maxWidth: "80%", mb: 4 }}
                >
                    Join thousands of successful agents and start earning with BMPL
                </Typography>

                {/* Info Cards Stack */}
                <Stack spacing={2} sx={{ width: "100%" }}>
                    <InfoCard
                        icon={<PercentIcon />}
                        title="Earn Commission"
                        description="Get 10% on binary matching"
                        iconColor={designConfig.colors.success.main}
                        iconBg={designConfig.colors.success.background}
                    />
                    <InfoCard
                        icon={<TrackChangesIcon />}
                        title="Build Your Network"
                        description="Grow your team on left & right legs"
                        iconColor={designConfig.colors.error.main}
                        iconBg={designConfig.colors.error.background}
                    />
                    <InfoCard
                        icon={<CardGiftcardIcon />}
                        title="Exclusive Rewards"
                        description="Unlock gifts and bonuses"
                        iconColor={designConfig.colors.warning.main}
                        iconBg={designConfig.colors.warning.background}
                    />
                    <InfoCard
                        icon={<BarChartIcon />}
                        title="Weekly Payouts"
                        description="Transparent earnings every week"
                        iconColor={designConfig.colors.info.main}
                        iconBg={designConfig.colors.info.background}
                    />
                </Stack>
            </Box>

            {/* Button */}
            <Button
                component={Link}
                to="/onboarding/basic-info"
                fullWidth
                variant="contained"
                sx={{
                    bgcolor: designConfig.colors.primary.main,
                    color: designConfig.colors.primary.contrastText,
                    py: 1.5,
                    borderRadius: designConfig.borderRadius.lg,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 700,
                    boxShadow: designConfig.shadows.primary,
                    transition: designConfig.transitions.default,
                    "&:hover": {
                        bgcolor: designConfig.colors.primary.dark,
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 20px ${alpha(designConfig.colors.primary.main, 0.4)}`
                    },
                    mb: 2, // Bottom spacing for safe area
                }}
            >
                Choose Your Package
            </Button>
        </Container>
    );
};

export default Welcome;
