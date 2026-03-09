import { Box, Typography, Card, CardContent, Grid, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Using for "Right Leg" icon, mirrored for Left
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import designConfig from "../../config/designConfig";
import PageHeader from "../../components/common/PageHeader";

// Mock Data
const transactions = [
    { id: 1, leg: "Left Leg", type: "Join", date: "Oct 15, 2025", amount: "₹5,000", status: "Completed" },
    { id: 2, leg: "Right Leg", type: "Repurchase", date: "Oct 15, 2025", amount: "₹5,000", status: "Completed" },
    { id: 3, leg: "Left Leg", type: "Join", date: "Oct 15, 2025", amount: "₹5,000", status: "Completed" },
    { id: 4, leg: "Right Leg", type: "Repurchase", date: "Oct 15, 2025", amount: "₹5,000", status: "Completed" },
    { id: 5, leg: "Left Leg", type: "Join", date: "Oct 15, 2025", amount: "₹5,000", status: "Completed" },
    { id: 6, leg: "Right Leg", type: "Repurchase", date: "Oct 15, 2025", amount: "₹5,000", status: "Completed" },
    { id: 7, leg: "Left Leg", type: "Join", date: "Oct 15, 2025", amount: "₹5,000", status: "Completed" },
    { id: 8, leg: "Right Leg", type: "Repurchase", date: "Oct 15, 2025", amount: "₹5,000", status: "Completed" },
];

export default function BvLedger() {
    return (
        <Box sx={{ bgcolor: designConfig.colors.background.light, minHeight: "100vh", pb: 4 }}>
            {/* Sticky Header */}
            <PageHeader title="Total BV Volume" />

            <Box sx={{ p: 3 }}>
                {/* Top Summary Cards */}
                <Grid container spacing={2} mb={3}>
                    <Grid size={{ xs: 6 }}>
                        <Card
                            sx={{
                                border: `1px solid ${designConfig.colors.primary.main}`,
                                borderRadius: 3,
                                boxShadow: "none",
                                bgcolor: "#fff",
                            }}
                        >
                            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                    <Box
                                        sx={{
                                            bgcolor: designConfig.colors.success.background,
                                            p: 0.5,
                                            borderRadius: 1,
                                            display: "flex",
                                        }}
                                    >
                                        <ArrowBackIcon sx={{ fontSize: 18, color: designConfig.colors.success.main }} />
                                    </Box>
                                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                                        Left Leg
                                    </Typography>
                                </Box>
                                <Typography variant="h6" fontWeight={700} color="#2d2d2d">
                                    ₹12,000
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Card
                            sx={{
                                border: `1px solid ${designConfig.colors.primary.main}`,
                                borderRadius: 3,
                                boxShadow: "none",
                                bgcolor: "#fff",
                            }}
                        >
                            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                    <Box
                                        sx={{
                                            bgcolor: "#e8f5e9",
                                            p: 0.5,
                                            borderRadius: 1,
                                            display: "flex",
                                        }}
                                    >
                                        <ArrowForwardIcon sx={{ fontSize: 18, color: designConfig.colors.primary.main }} />
                                    </Box>
                                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                                        Right Leg
                                    </Typography>
                                </Box>
                                <Typography variant="h6" fontWeight={700} color="#2d2d2d">
                                    ₹9,500
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Transaction List */}
                <Box display="flex" flexDirection="column" gap={2}>
                    {transactions.map((txn) => (
                        <Card
                            key={txn.id}
                            sx={{
                                border: `1px solid ${designConfig.colors.background.border}`,
                                borderRadius: 4,
                                boxShadow: designConfig.shadows.sm,
                                bgcolor: "white",
                            }}
                        >
                            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                    {/* Left Side: Icon + Details */}
                                    <Box display="flex" gap={2}>
                                        <Box
                                            sx={{
                                                bgcolor: txn.leg === "Left Leg" ? designConfig.colors.success.background : designConfig.colors.primary.light + "11",
                                                width: 48,
                                                height: 48,
                                                borderRadius: 2.5,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {txn.leg === "Left Leg" ? (
                                                <ArrowBackIcon sx={{ color: designConfig.colors.success.main }} />
                                            ) : (
                                                <ArrowForwardIcon sx={{ color: designConfig.colors.primary.main }} />
                                            )}
                                        </Box>

                                        <Box>
                                            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                                <Typography variant="body1" fontWeight={600}>
                                                    {txn.leg}
                                                </Typography>
                                                <Chip
                                                    label={txn.type}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        height: 20,
                                                        fontSize: "0.65rem",
                                                        fontWeight: 600,
                                                        borderColor: txn.type === "Join" ? designConfig.colors.primary.main : "orange",
                                                        color: txn.type === "Join" ? designConfig.colors.primary.main : "orange",
                                                        borderRadius: 1,
                                                    }}
                                                />
                                            </Box>
                                            <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
                                                <CalendarMonthIcon sx={{ fontSize: 14 }} />
                                                <Typography variant="caption">{txn.date}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {/* Right Side: Amount + Status */}
                                    <Box textAlign="right">
                                        <Typography variant="body2" fontWeight={700} mb={0.5}>
                                            {txn.amount}
                                        </Typography>
                                        <Chip
                                            label={txn.status}
                                            size="small"
                                            sx={{
                                                height: 20,
                                                fontSize: "0.65rem",
                                                bgcolor: designConfig.colors.success.background,
                                                color: designConfig.colors.success.main,
                                                fontWeight: 700,
                                                borderRadius: 1,
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
