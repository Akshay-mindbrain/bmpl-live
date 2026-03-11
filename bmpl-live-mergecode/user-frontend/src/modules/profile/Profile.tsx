import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Box, Button, Container, Grid } from "@mui/material";

import PageHeader from "../../components/common/PageHeader";
import designConfig from "../../config/designConfig";
import { AgentCard } from "./components/AgentCard";
import { MenuSection } from "./components/MenuSection";
import { ProfileHeader } from "./components/ProfileHeader";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogout } from "../../hooks/auth/useLogout";

const Profile = () => {
    const navigate = useNavigate();

    const { mutate: logout, isPending } = useLogout();

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                navigate("/login");
                toast.success("Logout Successfully");
            },
            onError: (err) => {
                console.error("Logout failed:", err);
            },
        });
    };

    const menuItems1 = [
        { icon: <PersonOutlineIcon />, text: "Personal Information", path: "/personal-info", color: "#2196f3" },
        { icon: <Inventory2OutlinedIcon />, text: "My Orders", path: "/orders", color: "#4caf50" },
        // { icon: <NotificationsOutlinedIcon />, text: "Notifications", path: "/notifications", color: "#ff9800" },
        // { icon: <HomeOutlinedIcon />, text: "Saved Address", path: "/address-selection", color: "#2196f3" },
        // { icon: <TranslateOutlinedIcon />, text: "Language", path: "#", color: "#9c27b0" },
    ];

    const menuItems2 = [
        { icon: <ReceiptLongIcon />, text: "Payouts", path: "/payouts", color: "#4caf50" },
        { icon: <AccountTreeOutlinedIcon />, text: "Genealogy", path: "/genealogy", color: "#2196f3" },
        // { icon: <GroupAddOutlinedIcon />, text: "Place New Member", path: "/place-new-member", color: "#4caf50" },
        { icon: <ShareOutlinedIcon />, text: "Invite & Earn", path: "/invite-earn", color: "#2196f3" },
        // { icon: <VerifiedUserOutlinedIcon />, text: "KYC Status", path: "/kyc-status", color: "#ff9800" },
        // { icon: <AccountBalanceOutlinedIcon />, text: "Bank Account Details", path: "/bank-account", color: "#9c27b0" },
        // { icon: <SettingsOutlinedIcon />, text: "Settings", path: "#", color: "#607d8b" },
        { icon: <HelpOutlineOutlinedIcon />, text: "FAQs", path: "/faqs", color: "#00bcd4" },
        { icon: <HeadsetMicOutlinedIcon />, text: "Contact Support", path: "/contact", color: "#e91e63" },
    ];

    return (
        <Box sx={{ bgcolor: designConfig.colors.background.light, minHeight: "100vh", pb: 10 }}>
            <PageHeader title="My Profile" />

            {/* Profile Header */}
            <ProfileHeader />

            <Container maxWidth="lg" sx={{ mt: 2 }}>
                <Grid container spacing={4}>
                    {/* Agent Card */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <AgentCard />
                    </Grid>

                    {/* Menu Section */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                            <MenuSection items={menuItems1} />
                            <MenuSection items={menuItems2} />

                            {/* Logout Button */}
                            <Button
                                variant="outlined"
                                color="error"
                                fullWidth
                                size="large"
                                startIcon={<LogoutIcon />}
                                onClick={handleLogout}
                                disabled={isPending}
                                sx={{
                                    mt: 1,
                                    fontWeight: 700,
                                    borderRadius: "16px",
                                    py: 1.5,
                                    borderWidth: "2px",
                                    "&:hover": {
                                        borderWidth: "2px",
                                        bgcolor: designConfig.colors.error.background,
                                    },
                                }}
                            >
                                {isPending ? "Logging out..." : "Log Out"}
                            </Button>

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Profile;