import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import designConfig from "../../config/designConfig";

interface PageHeaderProps {
    title: string;
    onBack?: () => void;
    rightAction?: React.ReactNode;
}

const PageHeader = ({ title, onBack, rightAction }: PageHeaderProps) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                bgcolor: designConfig.colors.background.light,
                width: '100%',
                px: 2,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                // Match the "Category" page style exactly
                boxShadow: "0 4px 6px -4px rgba(0,0,0,0.05)",
                borderBottom: `1px solid ${designConfig.colors.background.border}`
            }}
        >
            <IconButton
                onClick={handleBack}
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    color: designConfig.colors.primary.main,
                    bgcolor: designConfig.colors.background.paper,
                    '&:hover': { bgcolor: designConfig.colors.background.border },
                    width: 40,
                    height: 40,
                    borderRadius: designConfig.borderRadius.md,
                    boxShadow: designConfig.shadows.sm
                }}
            >
                <KeyboardArrowLeftIcon />
            </IconButton>

            <Typography
                variant="h5"
                fontWeight={900}
                sx={{
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    flexGrow: 1,
                    background: designConfig.colors.gradients.primary,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px'
                }}
            >
                {title}
            </Typography>

            {rightAction && (
                <Box>
                    {rightAction}
                </Box>
            )}
        </Box>
    );
};

export default PageHeader;
