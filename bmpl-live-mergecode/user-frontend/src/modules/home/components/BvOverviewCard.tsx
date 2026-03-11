
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import designConfig from '../../../config/designConfig';
import { useNavigate } from "react-router-dom";
import { CustomLinearProgress } from "../styles";

export const BvOverviewCard = () => {
    const navigate = useNavigate();

    return (
        <Box px={2} mb={3}>
            <Card sx={{ borderRadius: designConfig.borderRadius.md, boxShadow: designConfig.shadows.sm, border: `1px solid ${designConfig.colors.primary.light}`, overflow: "visible" }}>
                <CardContent sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="subtitle1" fontWeight={600}>
                            Today's BV Overview
                        </Typography>
                        <Button
                            size="small"
                            onClick={() => navigate("/bv-ledger")}
                            sx={{
                                minWidth: "auto",
                                padding: "4px 8px",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: designConfig.colors.primary.main,
                                bgcolor: designConfig.colors.background.paper,
                                border: `1px solid ${designConfig.colors.primary.light}`,
                                borderRadius: designConfig.borderRadius.sm,
                                "&:hover": {
                                    bgcolor: designConfig.colors.primary.main,
                                    color: designConfig.colors.primary.contrastText
                                }
                            }}
                        >
                            View Ledger
                        </Button>
                    </Box>

                    {/* Left Leg */}
                    <Box mb={3}>
                        <Box display="flex" justifyContent="space-between" mb={1} alignItems="center">
                            <Box display="flex" alignItems="center" gap={1}>
                                <Box sx={{ width: 12, height: 12, borderRadius: designConfig.borderRadius.xs, bgcolor: designConfig.colors.primary.main }} />
                                <Typography variant="body2" fontWeight={500}>Left Leg</Typography>
                            </Box>
                            <Typography variant="body2" fontWeight={600}>1,250 BV</Typography>
                        </Box>
                        <CustomLinearProgress variant="determinate" value={80} color="primary" />
                    </Box>

                    {/* Right Leg */}
                    <Box mb={4}>
                        <Box display="flex" justifyContent="space-between" mb={1} alignItems="center">
                            <Box display="flex" alignItems="center" gap={1}>
                                <Box sx={{ width: 12, height: 12, borderRadius: designConfig.borderRadius.full, bgcolor: designConfig.colors.warning.main }} />
                                <Typography variant="body2" fontWeight={500}>Right Leg</Typography>
                            </Box>
                            <Typography variant="body2" fontWeight={600}>980 BV</Typography>
                        </Box>
                        <CustomLinearProgress variant="determinate" value={60} color="warning" />
                    </Box>

                    {/* Matched BV Box */}
                    <Box sx={{ bgcolor: designConfig.colors.background.paper, borderRadius: designConfig.borderRadius.lg, p: 2, border: `1px solid ${designConfig.colors.primary.light}` }}>
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                            <Typography variant="body2" fontWeight={600} color={designConfig.colors.primary.main}>
                                Matched BV (1:1)
                            </Typography>
                            <Typography variant="body2" fontWeight={700} color={designConfig.colors.primary.main}>
                                980 BV
                            </Typography>
                        </Box>
                        <Typography variant="caption" color={designConfig.colors.text.secondary}>
                            Estimated Income: <strong>₹98</strong> (10% of 980 BV)
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};
