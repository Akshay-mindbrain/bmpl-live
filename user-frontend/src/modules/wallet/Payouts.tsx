import { Box, Typography, Card, Stack, Button, Chip, Divider } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import designConfig from "../../config/designConfig";
import dayjs from "dayjs";
import PageHeader from "../../components/common/PageHeader";

const Payouts = () => {

    // Helper to get next Saturday
    const getNextSaturday = () => {
        const today = dayjs();
        const dayOfWeek = today.day(); // 0 (Sun) to 6 (Sat)
        const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7; // If today is Sat, show next Sat
        const nextSaturday = today.add(daysUntilSaturday, "day");
        return nextSaturday;
    };

    const nextPayoutDate = getNextSaturday();

    // Diverse Mock Data
    const payoutHistory = [
        {
            id: "PO001",
            weekEnding: "12 Oct 2025",
            status: "Processing",
            netPayout: 1443.30,
            binaryIncome: 1240,
            generationIncome: 458,
            grossIncome: 1698,
            tds: 84.90,
            repurchase: 169.80,
        },
        {
            id: "PO002",
            weekEnding: "5 Oct 2025",
            status: "Paid",
            netPayout: 1334.30,
            binaryIncome: 1150,
            generationIncome: 458,
            grossIncome: 1570,
            tds: 78.50,
            repurchase: 157.00,
            paidOn: "8/10/2025",
            utr: "81234567"
        },
        {
            id: "PO004",
            weekEnding: "21 Sep 2025",
            status: "Failed",
            netPayout: 2100.00,
            binaryIncome: 2000,
            generationIncome: 100,
            grossIncome: 2100,
            tds: 105.00,
            repurchase: 210.00,
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Paid": return designConfig.colors.success.background;
            case "Processing": return designConfig.colors.info.background;
            case "Unpaid": return designConfig.colors.warning.background;
            case "Failed": return designConfig.colors.error.background;
            default: return designConfig.colors.background.light;
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case "Paid": return designConfig.colors.success.main;
            case "Processing": return designConfig.colors.info.main;
            case "Unpaid": return designConfig.colors.warning.main;
            case "Failed": return designConfig.colors.error.main;
            default: return designConfig.colors.text.secondary;
        }
    };

    return (
        <Box sx={{ pb: 4, bgcolor: designConfig.colors.background.light, minHeight: "100vh" }}>

            {/* Sticky Header */}
            <PageHeader title="Payout History" />

            <Box sx={{ p: 3 }}>
                {/* Total Paid Out */}
                <Card sx={{
                    p: 3,
                    bgcolor: designConfig.colors.primary.main,
                    color: "#fff",
                    borderRadius: 3,
                    mb: 2,
                    boxShadow: designConfig.shadows.primary
                }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1.5, borderRadius: "12px" }}>
                            <AccountBalanceWalletIcon fontSize="large" />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>Total Life-time Payout</Typography>
                            <Typography variant="h4" fontWeight={800}>₹38,000</Typography>
                        </Box>
                    </Stack>
                </Card>

                {/* Next Payout */}
                <Card sx={{
                    p: 2,
                    borderRadius: 3,
                    border: `1px solid ${designConfig.colors.primary.light}44`,
                    mb: 3,
                    bgcolor: designConfig.colors.background.default
                }}>
                    <Typography variant="body2" color={designConfig.colors.primary.main} fontWeight={700}>Upcoming Payout</Typography>
                    <Typography variant="h6" fontWeight={800} sx={{ mt: 0.5 }}>
                        {nextPayoutDate.format("dddd, MMM D, YYYY")}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Payout processing for week ending {nextPayoutDate.subtract(2, 'day').format("MMM D")}
                    </Typography>
                </Card>

                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2, color: designConfig.colors.text.primary, ml: 0.5 }}>
                    Detailed Transactions
                </Typography>

                {/* History List */}
                <Stack spacing={2}>
                    {payoutHistory.map((item) => (
                        <Card key={item.id} sx={{
                            p: 2,
                            borderRadius: 3,
                            border: `1px solid ${designConfig.colors.background.border}`,
                            boxShadow: designConfig.shadows.sm,
                            bgcolor: "white"
                        }}>
                            {/* Card Header */}
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                <Box>
                                    <Typography fontWeight={700} color={designConfig.colors.text.primary}>Week ending {item.weekEnding}</Typography>
                                    <Typography variant="caption" color="text.secondary" fontWeight={500}>{item.id}</Typography>
                                </Box>
                                <Chip
                                    label={item.status}
                                    size="small"
                                    sx={{
                                        bgcolor: getStatusColor(item.status),
                                        color: getStatusTextColor(item.status),
                                        fontWeight: 700,
                                        borderRadius: "6px",
                                        fontSize: "0.7rem",
                                        border: `1px solid ${getStatusTextColor(item.status)}22`
                                    }}
                                />
                            </Stack>

                            {/* Net Payout Box */}
                            <Box sx={{ bgcolor: designConfig.colors.primary.light + "11", p: 1.5, borderRadius: 2, mb: 2, border: `1px solid ${designConfig.colors.primary.light}22` }}>
                                <Typography variant="caption" color={designConfig.colors.primary.main} fontWeight={700}>Net Distributed Amount</Typography>
                                <Typography variant="h6" color={designConfig.colors.primary.main} fontWeight={800}>₹ {item.netPayout.toLocaleString()}</Typography>
                            </Box>

                            {/* Breakdown */}
                            <Stack spacing={1.5} mb={2} px={0.5}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">Binary Commission</Typography>
                                    <Typography variant="body2" fontWeight={700} color={designConfig.colors.text.primary}>₹ {item.binaryIncome.toLocaleString()}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">Generation Bonus</Typography>
                                    <Typography variant="body2" fontWeight={700} color={designConfig.colors.text.primary}>₹ {item.generationIncome.toLocaleString()}</Typography>
                                </Stack>
                                <Divider sx={{ borderStyle: "dashed", my: 0.5 }} />
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2" fontWeight={600} color={designConfig.colors.text.secondary}>Gross Total</Typography>
                                    <Typography variant="body2" fontWeight={800} color={designConfig.colors.text.primary}>₹ {item.grossIncome.toLocaleString()}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2" color={designConfig.colors.error.main} fontSize={13}>TDS Deduction (5%)</Typography>
                                    <Typography variant="body2" color={designConfig.colors.error.main} fontWeight={600}>-₹{item.tds.toFixed(2)}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2" color={designConfig.colors.error.main} fontSize={13}>Admin Charges (10%)</Typography>
                                    <Typography variant="body2" color={designConfig.colors.error.main} fontWeight={600}>-₹{item.repurchase.toFixed(2)}</Typography>
                                </Stack>
                            </Stack>

                            {/* Footer Actions Based on Status */}
                            {item.status === "Paid" && (
                                <>
                                    <Divider sx={{ mb: 2 }} />
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} px={0.5}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" display="block">Payment Date</Typography>
                                            <Typography variant="body2" fontWeight={700} color={designConfig.colors.text.primary}>{item.paidOn}</Typography>
                                        </Box>
                                        <Box textAlign="right">
                                            <Typography variant="caption" color="text.secondary" display="block">Transaction UTR</Typography>
                                            <Typography variant="body2" fontWeight={700} color={designConfig.colors.text.primary}>{item.utr}</Typography>
                                        </Box>
                                    </Stack>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            bgcolor: designConfig.colors.primary.main,
                                            color: "#fff",
                                            textTransform: "none",
                                            fontWeight: 700,
                                            borderRadius: "10px",
                                            py: 1,
                                            boxShadow: designConfig.shadows.sm,
                                            "&:hover": { bgcolor: designConfig.colors.primary.dark }
                                        }}
                                    >
                                        Download Statement
                                    </Button>
                                </>
                            )}

                            {item.status === "Failed" && (
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 700,
                                        borderRadius: "10px",
                                        color: designConfig.colors.error.main,
                                        borderColor: designConfig.colors.error.main,
                                        "&:hover": { borderColor: designConfig.colors.error.dark, bgcolor: designConfig.colors.error.background }
                                    }}
                                >
                                    Raise Support Ticket
                                </Button>
                            )}

                        </Card>
                    ))}
                </Stack>

            </Box>
        </Box>
    );
};

export default Payouts;
