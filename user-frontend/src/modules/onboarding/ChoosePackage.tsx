
import { Box, Typography, Container, Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import designConfig from '../../config/designConfig';


const PackageCard = ({
    title,
    price,
    bv,
    features,
    onClick,
}: {
    title: string;
    price: string;
    bv: string;
    features: string[];
    onClick: () => void;
}) => (
    <Box
        onClick={onClick}
        sx={{
            border: `1px solid ${designConfig.colors.primary.light}44`,
            borderRadius: "16px",
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 0.2s ease-out",
            bgcolor: "white",
            boxShadow: designConfig.shadows.sm,
            "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: designConfig.shadows.md,
                borderColor: designConfig.colors.primary.main
            },
        }}
    >
        {/* Header */}
        <Box
            sx={{
                bgcolor: designConfig.colors.primary.main,
                color: "white",
                p: 2.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, opacity: 0.9, textTransform: "uppercase", letterSpacing: "1px" }}>
                    {title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {price}
                </Typography>
            </Box>
            <Typography variant="caption" sx={{
                fontWeight: 700,
                bgcolor: "rgba(255,255,255,0.25)",
                px: 1.5,
                py: 0.5,
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.3)"
            }}>
                {bv}
            </Typography>
        </Box>

        {/* Body */}
        <Box sx={{ p: 2.5 }}>
            {features.map((feature, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <CheckCircleOutlineIcon sx={{ color: designConfig.colors.primary.main, fontSize: 18, mr: 1.5 }} />
                    <Typography variant="body2" sx={{ color: designConfig.colors.text.secondary, fontSize: "0.85rem", fontWeight: 500 }}>
                        {feature}
                    </Typography>
                </Box>
            ))}
        </Box>
    </Box>
);

const ChoosePackage = () => {
    const navigate = useNavigate();

    const handlePackageSelect = () => {
        navigate("/registration-success");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: 4,
                bgcolor: designConfig.colors.background.light,
            }}
        >
            <Container maxWidth="xs">
                <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{ fontWeight: 800, color: designConfig.colors.text.primary, mb: 1 }}
                >
                    Choose Your Package
                </Typography>
                <Typography
                    variant="body2"
                    textAlign="center"
                    sx={{ color: designConfig.colors.text.secondary, mb: 4 }}
                >
                    Select a business package to start your journey
                </Typography>

                <Stack spacing={2.5}>
                    <PackageCard
                        title="Starter Pack"
                        price="₹999"
                        bv="500 BV"
                        features={[
                            "Basic commission structure",
                            "2 referral coupons",
                            "50 coins/month",
                            "₹500 daily cap",
                        ]}
                        onClick={handlePackageSelect}
                    />

                    <PackageCard
                        title="Silver Partner"
                        price="₹2,999"
                        bv="1500 BV"
                        features={[
                            "Enhanced commission",
                            "5 referral coupons",
                            "150 coins/month",
                            "₹2,000 daily cap",
                        ]}
                        onClick={handlePackageSelect}
                    />

                    <PackageCard
                        title="Gold Partner"
                        price="₹5,999"
                        bv="3000 BV"
                        features={[
                            "Premium commission",
                            "10 referral coupons",
                            "300 coins/month",
                            "₹5,000 daily cap",
                        ]}
                        onClick={handlePackageSelect}
                    />

                    <PackageCard
                        title="Star Partner"
                        price="₹9,999"
                        bv="5000 BV"
                        features={[
                            "Maximum commission",
                            "20 referral coupons",
                            "500 coins/month",
                            "₹10,000 daily cap",
                        ]}
                        onClick={handlePackageSelect}
                    />
                </Stack>
            </Container>
        </Box>
    );
};

export default ChoosePackage;
