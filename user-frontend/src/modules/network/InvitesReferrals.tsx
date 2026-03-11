import LinkIcon from "@mui/icons-material/Link";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import PageHeader from "../../components/common/PageHeader";
import designConfig from "../../config/designConfig";
import { REFERRAL_LINK } from "../../config/copyurl.config";
import { toast } from "sonner";

export default function InvitesReferrals() {
  // 🔹 Get current user memId from localStorage
  const userdata = localStorage.getItem("data"); // ensure memId is saved as string
  const sponsorId = userdata ? JSON.parse(userdata)?.id : null;
  const baseRegisterUrl = `${REFERRAL_LINK}/signup`; // e.g. https://healthhub.com/signup

  if (!sponsorId) {
    console.warn("User memId not found in localStorage!");
  }

  // 🔹 Generate referral link for LEFT or RIGHT
  const referralUrl = (leg: "LEFT" | "RIGHT") =>
    `${baseRegisterUrl}?sponsorId=${sponsorId}&leg=${leg}`;

  // 🔹 Copy to clipboard
  const copyLink = (leg: "LEFT" | "RIGHT") => {
    const url = referralUrl(leg);
    navigator.clipboard.writeText(url)
      .then(() => toast.info(`Referral link copied: ${url}`))
      .catch(() => toast.error("Failed to copy link"));
  };

  // 🔹 Share via native share API if supported
  const shareLink = (leg: "LEFT" | "RIGHT") => {
    const url = referralUrl(leg);
    if (navigator.share) {
      navigator.share({
        title: "Join HealthHub",
        text: "Sign up using my referral link!",
        url,
      }).catch((err) => console.log("Share failed:", err));
    } else {
      copyLink(leg); // fallback: copy to clipboard
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: designConfig.colors.background.light }}>
      {/* Header */}
      <PageHeader title="Invite & Earn" />

      <Box sx={{ p: 3 }}>
        <Card
          sx={{
            border: `1px solid ${designConfig.colors.primary.light}44`,
            borderRadius: 3,
            p: 2,
            mb: 4,
            boxShadow: designConfig.shadows.sm,
          }}
        >
          <Typography
            sx={{
              color: designConfig.colors.primary.main,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <LinkIcon sx={{ mr: 1 }} />
            Your Referral Links
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            Share with friends and family to earn commissions
          </Typography>

          {/* TextField showing LEFT referral */}
          <TextField
            fullWidth
            value={referralUrl("LEFT")}
            InputProps={{
              readOnly: true,
              sx: { borderRadius: "12px", bgcolor: designConfig.colors.background.paper },
            }}
            sx={{ mb: 2 }}
          />

          {/* Copy Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: designConfig.colors.primary.main,
                color: "white",
                borderRadius: "12px",
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: designConfig.shadows.primary,
                "&:hover": { bgcolor: designConfig.colors.primary.dark },
              }}
              onClick={() => copyLink("LEFT")}
            >
              Copy LEFT
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: designConfig.colors.secondary.main,
                color: "white",
                borderRadius: "12px",
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: designConfig.shadows.primary,
                "&:hover": { bgcolor: designConfig.colors.secondary.dark },
              }}
              onClick={() => copyLink("RIGHT")}
            >
              Copy RIGHT
            </Button>
          </Stack>

          {/* Share Buttons */}
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => shareLink("LEFT")}
            >
              Share LEFT
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => shareLink("RIGHT")}
            >
              Share RIGHT
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}