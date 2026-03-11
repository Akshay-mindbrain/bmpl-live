import {
  Box,
  Card,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import designConfig from "../../config/designConfig";
import PageHeader from "../../components/common/PageHeader";

export default function ChoosePosition() {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: designConfig.colors.background.light }}>
      {/* Header */}
      <PageHeader title="Choose Position" />

      <Box sx={{ p: 3 }}>
        {/* Selected Member Card */}
        <Card
          sx={{
            p: 2,
            borderRadius: 3,
            border: `1px solid ${designConfig.colors.primary.light}44`,
            mb: 3,
            boxShadow: designConfig.shadows.sm
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                width: 45,
                height: 45,
                borderRadius: 2,
                bgcolor: designConfig.colors.primary.light + "22",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PersonIcon sx={{ color: designConfig.colors.primary.main, fontSize: 28 }} />
            </Box>

            <Box>
              <Typography fontWeight={700}>Vikram Shah</Typography>
              <Typography variant="body2" color="text.secondary">
                PENDING001
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Silver &nbsp; • Invited: 14 Oct
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Section Title */}
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{ color: designConfig.colors.primary.main, mb: 2 }}
        >
          Select Placement Position
        </Typography>

        {/* Left Leg */}
        <Card
          sx={{
            p: 2,
            borderRadius: 3,
            border: `1px solid ${designConfig.colors.primary.light}44`,
            mb: 2,
            cursor: "pointer",
            boxShadow: designConfig.shadows.sm,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: designConfig.shadows.md,
              borderColor: designConfig.colors.primary.main
            }
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: designConfig.colors.primary.light + "22",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <KeyboardArrowLeftIcon sx={{ color: designConfig.colors.primary.main }} />
            </Box>
            <Box>
              <Typography fontWeight={600}>Left Leg</Typography>
              <Typography variant="body2" color="text.secondary">
                Place new member in your left leg
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Right Leg */}
        <Card
          sx={{
            p: 2,
            borderRadius: 3,
            border: `1px solid ${designConfig.colors.primary.light}44`,
            cursor: "pointer",
            boxShadow: designConfig.shadows.sm,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: designConfig.shadows.md,
              borderColor: designConfig.colors.primary.main
            }
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: designConfig.colors.primary.light + "22",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <KeyboardArrowRightIcon sx={{ color: designConfig.colors.primary.main }} />
            </Box>
            <Box>
              <Typography fontWeight={600}>Right Leg</Typography>
              <Typography variant="body2" color="text.secondary">
                Place new member in your right leg
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Spacer */}
        <Divider sx={{ my: 4, opacity: 0 }} />

        {/* Confirm Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: designConfig.colors.primary.main,
            height: 52,
            borderRadius: "12px",
            fontSize: 16,
            fontWeight: 700,
            textTransform: "none",
            boxShadow: designConfig.shadows.primary,
            "&:hover": { bgcolor: designConfig.colors.primary.dark },
          }}
        >
          Confirm placement
        </Button>
      </Box>
    </Box>
  );
}
