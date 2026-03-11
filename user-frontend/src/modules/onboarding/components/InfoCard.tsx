
import { Box, Typography } from "@mui/material";
import designConfig from "../../../config/designConfig";
import React from "react";

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    iconColor: string;
    iconBg: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
    icon,
    title,
    description,
    iconColor,
    iconBg,
}) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            border: `1px solid ${designConfig.colors.background.border}`,
            borderRadius: designConfig.borderRadius.lg,
            bgcolor: designConfig.colors.surfaces.white,
            boxShadow: designConfig.shadows.sm,
            transition: designConfig.transitions.default,
            "&:hover": {
                boxShadow: designConfig.shadows.md,
                transform: "translateY(-2px)"
            }
        }}
    >
        <Box
            sx={{
                width: 48,
                height: 48,
                borderRadius: designConfig.borderRadius.md,
                bgcolor: iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: iconColor,
                mr: 2,
                flexShrink: 0,
            }}
        >
            {icon}
        </Box>
        <Box>
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: designConfig.colors.primary.main, lineHeight: 1.2, mb: 0.5 }}
            >
                {title}
            </Typography>
            <Typography variant="body2" sx={{ color: designConfig.colors.text.secondary, fontSize: "0.75rem" }}>
                {description}
            </Typography>
        </Box>
    </Box>
);
