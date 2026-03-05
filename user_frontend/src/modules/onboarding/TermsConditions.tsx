
import { Box, Typography, Button, Container, Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import designConfig from '../../config/designConfig';


const TermsConditions = () => {
    const [agreed, setAgreed] = useState(false);

    return (
        <Container
            maxWidth="sm"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                py: 4,
                bgcolor: "#fcfcfc",
            }}
        >
            <Box sx={{ mt: 2 }}>
                {/* Title */}
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: designConfig.colors.primary.main, mb: 2 }}
                >
                    Terms & Conditions
                </Typography>

                {/* Content Box */}
                <Box
                    sx={{
                        border: `1px solid ${designConfig.colors.primary.main}`,
                        borderRadius: "16px",
                        p: 3,
                        bgcolor: "white",
                        mb: 3,
                        maxHeight: "60vh",
                        overflowY: "auto",
                    }}
                >
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#000" }}>
                            1. Agreement to Terms
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#757575", fontSize: "0.85rem", mt: 0.5 }}>
                            By registering as an Independent Business Owner (IBO), you agree to abide by all company policies and procedures.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#000" }}>
                            2. Income Disclosure
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#757575", fontSize: "0.85rem", mt: 0.5 }}>
                            Earnings are based on performance and are not guaranteed. Past performance does not guarantee future results.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#000" }}>
                            3. Code of Ethics
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#757575", fontSize: "0.85rem", mt: 0.5 }}>
                            You agree to conduct business ethically and in compliance with all applicable laws.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#000" }}>
                            4. Payment Terms
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#757575", fontSize: "0.85rem", mt: 0.5 }}>
                            Payouts are processed weekly with applicable deductions (TDS 5%, Repurchase 10%).
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#000" }}>
                            5. Termination
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#757575", fontSize: "0.85rem", mt: 0.5 }}>
                            Either party may terminate this agreement with written notice.
                        </Typography>
                    </Box>
                </Box>

                {/* Checkbox */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            sx={{
                                color: designConfig.colors.primary.main,
                                "&.Mui-checked": {
                                    color: designConfig.colors.primary.main,
                                },
                            }}
                        />
                    }
                    label={
                        <Typography variant="body2" sx={{ color: "#2d2d2d", fontSize: "0.85rem", lineHeight: 1.3 }}>
                            I have read and agree to the Terms & Conditions, Privacy Policy, and Income Disclosure Statement
                        </Typography>
                    }
                    sx={{ alignItems: "flex-start", ml: 0 }}
                />
            </Box>

            {/* Button */}
            <Button
                component={Link}
                to="/choose-package" // Go to package selection
                fullWidth
                variant="contained"
                disabled={!agreed} // Enforce agreement
                sx={{
                    bgcolor: designConfig.colors.primary.main,
                    color: "white",
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 700,
                    boxShadow: "0 4px 12px rgba(123, 176, 59, 0.4)",
                    "&:hover": {
                        bgcolor: designConfig.colors.primary.dark,
                    },
                    "&.Mui-disabled": {
                        bgcolor: "#bdbdbd",
                        color: "#eeeeee"
                    },
                    mb: 2,
                }}
            >
                Complete
            </Button>
        </Container>
    );
};

export default TermsConditions;
