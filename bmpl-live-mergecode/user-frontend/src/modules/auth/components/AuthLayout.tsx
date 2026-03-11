
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import designConfig from '../../../config/designConfig';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: designConfig.colors.background.light,
            }}
        >
            <Paper
                sx={{
                    p: 4,
                    width: 450,
                    borderRadius: 3,
                    boxShadow: designConfig.shadows.md,
                }}
            >
                {/* Logo */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <img
                        src="/assets/images/Logo.png"
                        alt="BMPL Logo"
                        style={{ width: "140px", marginBottom: "8px", objectFit: "contain" }}
                    />
                </Box>

                {/* Title */}
                <Typography
                    variant="h4"
                    sx={{
                        color: designConfig.colors.primary.main,
                        fontWeight: 700,
                        mb: 1,
                        textAlign: "center",
                        fontFamily: designConfig.typography.fontFamily.heading
                    }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: designConfig.colors.text.secondary,
                            mb: 3,
                            textAlign: "center",
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}

                {children}
            </Paper>
        </Box>
    );
};
