
import { styled } from "@mui/material/styles";
import { LinearProgress, linearProgressClasses } from "@mui/material";
import designConfig, { alpha } from '../../config/designConfig';

// Custom Styled Linear Progress for thicker, subtle rounded bars
export const CustomLinearProgress = styled(LinearProgress)(({ color }: { color?: string }) => ({
    height: 10,
    borderRadius: designConfig.borderRadius.sm,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: alpha(designConfig.colors.text.primary, 0.08),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: designConfig.borderRadius.sm,
        backgroundColor: color === "warning" ? designConfig.colors.warning.main : designConfig.colors.primary.main,
    },
}));
