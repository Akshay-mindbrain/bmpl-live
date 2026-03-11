
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import GroupIcon from "@mui/icons-material/Group";
import designConfig from '../../../config/designConfig';
import { useNavigate } from "react-router-dom";

export const QuickStatsGrid = () => {
    const navigate = useNavigate();

    return (
        <Box px={2} mb={2}>
            <Grid container spacing={2}>
                {[
                    {
                        icon: <ShowChartIcon sx={{ fontSize: 28, color: designConfig.colors.primary.main }} />,
                        label: "This Week",
                        value: "₹8,450",
                        path: "/my-wallet"
                    },
                    {
                        icon: <GroupIcon sx={{ fontSize: 28, color: designConfig.colors.primary.main }} />,
                        label: "Total Team",
                        value: "23 Members",
                        path: "/genealogy"
                    },
                ].map((stat, index) => (
                    <Grid key={index} size={{ xs: 6, sm: 6, md: 6 }}>
                        <Card
                            onClick={() => navigate(stat.path)}
                            sx={{
                                borderRadius: designConfig.borderRadius.lg,
                                boxShadow: designConfig.shadows.md,
                                border: `1.5px solid ${designConfig.colors.background.border}`,
                                transition: designConfig.transitions.default,
                                cursor: 'pointer', // Highlighting clickability
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: designConfig.shadows.primary,
                                    borderColor: designConfig.colors.primary.main,
                                },
                                height: "100%",
                            }}
                        >
                            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                                <Box
                                    sx={{
                                        bgcolor: designConfig.colors.background.paper,
                                        width: 48,
                                        height: 48,
                                        borderRadius: designConfig.borderRadius.md,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 2,
                                    }}
                                >
                                    {stat.icon}
                                </Box>
                                <Typography variant="body2" color="text.secondary" fontWeight={500} mb={0.5}>
                                    {stat.label}
                                </Typography>
                                <Typography variant="h6" fontWeight={800} sx={{ color: designConfig.colors.text.primary, fontSize: "1.1rem" }}>
                                    {stat.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
