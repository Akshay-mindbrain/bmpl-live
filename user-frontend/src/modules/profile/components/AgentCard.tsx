
import { Box, Typography, Paper, Button } from "@mui/material";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import designConfig from '../../../config/designConfig';

export const AgentCard = () => {
    return (
        <Paper sx={{
            p: 3,
            borderRadius: "24px",
            background: (designConfig.colors as any).gradients.primary,
            color: "white",
            boxShadow: designConfig.shadows.primary,
            position: "sticky",
            top: 100
        }}>
            <Box display="flex" alignItems="center" mb={1.5}>
                <Box sx={{ p: 1, bgcolor: "rgba(255,255,255,0.2)", borderRadius: "12px", mr: 2, color: "white" }}>
                    <TranslateOutlinedIcon />
                </Box>
                <Typography variant="h6" fontWeight={700} color="inherit">
                    Become an Agent
                </Typography>
            </Box>
            <Typography variant="body2" color="inherit" mb={3} sx={{ lineHeight: 1.6, opacity: 0.9 }}>
                Build your network and earn massive commissions on every successful referral.
            </Typography>
            <Button
                variant="contained"
                fullWidth
                sx={{
                    bgcolor: "white",
                    color: designConfig.colors.primary.main,
                    borderRadius: "12px",
                    fontWeight: 800,
                    textTransform: "none",
                    py: 1.5,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    "&:hover": { bgcolor: "#f8f8f8" }
                }}
            >
                Join Network Now
            </Button>
        </Paper>
    );
};
