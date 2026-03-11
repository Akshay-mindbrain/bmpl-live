
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import designConfig, { alpha } from '../../../config/designConfig';
import { useNavigate } from "react-router-dom";

export const InviteEarnCard = () => {
    const navigate = useNavigate();

    return (
        <Box px={2}>
            <Card
                sx={{
                    background: designConfig.colors.gradients.primary,
                    borderRadius: designConfig.borderRadius.lg,
                    color: designConfig.colors.primary.contrastText,
                    boxShadow: designConfig.shadows.primary,
                    position: 'relative',
                    overflow: 'hidden',
                    "&::after": {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '200%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                        animation: 'shimmer 12s infinite linear',
                        pointerEvents: 'none',
                    }
                }}
            >
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        Invite & Earn
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                        Share your unique referral link and grow your network
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => navigate("/invite-earn")}
                        sx={{
                            bgcolor: designConfig.colors.surfaces.white,
                            color: designConfig.colors.primary.main,
                            borderRadius: designConfig.borderRadius.md,
                            fontWeight: 700,
                            textTransform: "none",
                            py: 1,
                            "&:hover": {
                                bgcolor: alpha(designConfig.colors.surfaces.white, 0.9)
                            }
                        }}
                    >
                        Share Referral Link
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};
