
import { Box, Typography, Container, Button, Card, CardContent, Stack, Divider, Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";
import designConfig, { alpha } from '../../config/designConfig';


const RegistrationSuccess = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: designConfig.colors.background.light,
            }}
        >
            <Container maxWidth="xs" sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                py: 6
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexGrow: 1,
                    justifyContent: "center",
                    width: "100%"
                }}>
                    {/* Success Icon */}
                    <Box
                        sx={{
                            bgcolor: designConfig.colors.primary.main,
                            width: 90,
                            height: 90,
                            borderRadius: designConfig.borderRadius.lg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 4,
                            boxShadow: designConfig.shadows.primary,
                            transform: "rotate(-10deg)"
                        }}
                    >
                        <CheckCircleOutlineIcon sx={{ color: designConfig.colors.primary.contrastText, fontSize: 50 }} />
                    </Box>

                    {/* Title and Subtitle */}
                    <Typography variant="h4" sx={{ fontWeight: 800, color: designConfig.colors.text.primary, mb: 1, textAlign: "center" }}>
                        Registration Successful!
                    </Typography>
                    <Typography variant="body1" sx={{ color: designConfig.colors.text.secondary, mb: 5, textAlign: "center", fontWeight: 500 }}>
                        Welcome to the network. Your agent account is now fully active.
                    </Typography>

                    {/* Details Card */}
                    <Card
                        sx={{
                            width: "100%",
                            border: `1px solid ${alpha(designConfig.colors.primary.main, 0.1)}`,
                            borderRadius: designConfig.borderRadius.lg,
                            boxShadow: designConfig.shadows.md,
                            bgcolor: designConfig.colors.surfaces.white,
                            overflow: "hidden"
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="subtitle2" sx={{ color: designConfig.colors.primary.main, fontWeight: 700, mb: 2, textTransform: "uppercase", letterSpacing: "1px" }}>
                                Account Summary
                            </Typography>

                            <Stack spacing={2.5}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body2" sx={{ color: designConfig.colors.text.secondary, fontWeight: 500 }}>
                                        Agent ID
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 700, color: designConfig.colors.text.primary }}>
                                        AG509199
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body2" sx={{ color: designConfig.colors.text.secondary, fontWeight: 500 }}>
                                        Joined On
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 700, color: designConfig.colors.text.primary }}>
                                        13 Oct, 2025
                                    </Typography>
                                </Box>

                                <Divider sx={{ borderStyle: "dashed", opacity: 0.6 }} />

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body2" sx={{ color: designConfig.colors.text.secondary, fontWeight: 500 }}>
                                        Selected Package
                                    </Typography>
                                    <Chip
                                        label="Silver Partner"
                                        size="small"
                                        sx={{
                                            bgcolor: alpha(designConfig.colors.primary.main, 0.1),
                                            color: designConfig.colors.primary.main,
                                            fontWeight: 800,
                                            borderRadius: designConfig.borderRadius.xs
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body2" sx={{ color: designConfig.colors.text.secondary, fontWeight: 500 }}>
                                        Account Status
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 700, color: designConfig.colors.primary.main }}>
                                        ACTIVE
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>

                {/* Button */}
                <Button
                    component={Link}
                    to="/home"
                    fullWidth
                    variant="contained"
                    sx={{
                        bgcolor: designConfig.colors.primary.main,
                        color: designConfig.colors.primary.contrastText,
                        py: 2,
                        borderRadius: designConfig.borderRadius.md,
                        textTransform: "none",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        boxShadow: designConfig.shadows.primary,
                        "&:hover": {
                            bgcolor: designConfig.colors.primary.dark,
                            transform: "translateY(-2px)"
                        },
                        transition: "all 0.2s ease"
                    }}
                >
                    Launch Dashboard
                </Button>
            </Container>
        </Box>
    );
};

export default RegistrationSuccess;
