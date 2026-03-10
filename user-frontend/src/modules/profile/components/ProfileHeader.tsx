import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { Avatar, Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import designConfig from "../../../config/designConfig";
import { useUserProfile } from "../../../hooks/profile/useProfile";

export const ProfileHeader = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useUserProfile();

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    const user = data?.data;

    const stats = [
        {
            label: "Agent ID",
            value: user?.memberId,
            icon: (
                <FingerprintIcon
                    sx={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}
                />
            ),
        },
        {
            label: "Leg Position",
            value: user?.legPosition,
            icon: (
                <AccountTreeIcon
                    sx={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}
                />
            ),
        },
    ];

    return (
        <Box
            sx={{
                background:
                    designConfig.colors.gradients.primary ||
                    designConfig.colors.primary.main,
                color: "white",
                p: 3,
                pt: 4,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                position: "relative",
                mb: 2,
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={3}
            >
                {/* Profile Identity */}
                <Box display="flex" alignItems="center" gap={2}>
                    <Box sx={{ position: "relative" }}>
                        <Avatar
                            src="https://loremflickr.com/150/150/portrait,man?lock=1"
                            sx={{
                                width: 65,
                                height: 65,
                                border: "2px solid rgba(255,255,255,0.35)",
                                boxShadow: designConfig.shadows.md,
                            }}
                        />

                        <IconButton
                            size="small"
                            sx={{
                                position: "absolute",
                                bottom: -2,
                                right: -2,
                                bgcolor: "white",
                                color: designConfig.colors.primary.main,
                                boxShadow: designConfig.shadows.sm,
                                "&:hover": { bgcolor: "#f5f5f5" },
                                p: 0.4,
                            }}
                        >
                            <CameraAltIcon sx={{ fontSize: 13 }} />
                        </IconButton>
                    </Box>

                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={800}
                            sx={{ lineHeight: 1.2 }}
                        >
                            {user?.firstName} {user?.lastName}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ opacity: 0.8, fontWeight: 500 }}
                        >
                            {user?.email}
                        </Typography>
                    </Box>
                </Box>

                {/* Edit Button */}
                <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
                    <IconButton
                        sx={{
                            bgcolor: "rgba(255,255,255,0.12)",
                            color: "white",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                            p: 0.8,
                        }}
                        onClick={() => navigate("/personal-info")}
                    >
                        <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            {/* Stats Card */}
            <Box
                sx={{
                    bgcolor: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    p: 2,
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                {stats.map((stat, index) => (
                    <Box
                        key={index}
                        textAlign="center"
                        sx={{ flex: 1, position: "relative" }}
                    >
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Box sx={{ mb: 0.4, opacity: 0.8 }}>{stat.icon}</Box>

                            <Typography
                                variant="body1"
                                fontWeight={900}
                                sx={{
                                    color: "white",
                                    lineHeight: 1.1,
                                    fontSize: "1.1rem",
                                }}
                            >
                                {stat.value}
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{
                                    color: "rgba(255,255,255,0.65)",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: 0.8,
                                    fontSize: "0.6rem",
                                    mt: 0.4,
                                }}
                            >
                                {stat.label}
                            </Typography>
                        </Box>

                        {index < stats.length - 1 && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    top: "15%",
                                    bottom: "15%",
                                    width: "1px",
                                    bgcolor: "rgba(255,255,255,0.12)",
                                }}
                            />
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};