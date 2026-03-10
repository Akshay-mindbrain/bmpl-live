import { Box, Typography, Card, Stack, Divider, LinearProgress, Button } from "@mui/material";
import { ArrowUpIcon } from "../../assets/Icons";
import designConfig, { alpha } from "../../config/designConfig";
import { useNavigate } from "react-router-dom";

const EarningTab = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Todays Earnings Card */}
      <Card sx={{
        p: 3,
        background: designConfig.colors.gradients.primary, // Using the new 3-color vibrant gradient
        color: designConfig.colors.primary.contrastText,
        borderRadius: designConfig.borderRadius.lg,
        boxShadow: designConfig.shadows.primary,
        mb: 3,
        position: 'relative',
        overflow: 'hidden',
        "&::after": {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-100%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }
      }}>
        <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 600, letterSpacing: '0.5px' }}>DISTRIBUTED EARNINGS</Typography>

        <Typography variant="h3" fontWeight={900} sx={{ mt: 1, letterSpacing: '-1px' }}>
          ₹1,250
        </Typography>

        {/* Creative Shaped BV Section */}
        <Box sx={{
          mt: 3.5,
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
          position: 'relative',
          height: 80, // Slightly taller for more presence
        }}>
          {/* Left Wing */}
          <Box sx={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(8px)',
            borderRadius: `${designConfig.borderRadius.md} 0 0 ${designConfig.borderRadius.md}`,
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            borderRight: 'none',
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            clipPath: 'polygon(0% 0%, 100% 0%, 92% 100%, 0% 100%)',
            transition: 'all 0.3s ease',
            "&:hover": { bgcolor: 'rgba(255, 255, 255, 0.12)' }
          }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.65rem', letterSpacing: '1px', mb: 0.2 }}>LEFT TEAM</Typography>
            <Typography variant="h5" sx={{ fontWeight: 950, color: 'white', lineHeight: 1 }}>450</Typography>
          </Box>

          {/* Center Shield/Badge */}
          <Box sx={{
            width: 52,
            height: 52,
            bgcolor: designConfig.colors.surfaces.white,
            color: designConfig.colors.primary.main,
            borderRadius: '12px', // Slight rounding for the diamond
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            zIndex: 10,
            boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
            border: `1px solid rgba(255, 255, 255, 0.8)`
          }}>
            <Typography sx={{
              transform: 'rotate(-45deg)',
              fontSize: '0.85rem',
              fontWeight: 900,
              background: designConfig.colors.gradients.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>BV</Typography>
          </Box>

          {/* Right Wing */}
          <Box sx={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(8px)',
            borderRadius: `0 ${designConfig.borderRadius.md} ${designConfig.borderRadius.md} 0`,
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            borderLeft: 'none',
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)',
            transition: 'all 0.3s ease',
            "&:hover": { bgcolor: 'rgba(255, 255, 255, 0.12)' }
          }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.65rem', letterSpacing: '1px', mb: 0.2 }}>RIGHT TEAM</Typography>
            <Typography variant="h5" sx={{ fontWeight: 950, color: 'white', lineHeight: 1 }}>450</Typography>
          </Box>
        </Box>

        {/* Progress bar */}
        <Box sx={{ mt: 3 }}>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>MATCHING PROGRESS</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>45%</Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={45}
            sx={{
              height: 10,
              borderRadius: designConfig.borderRadius.md,
              background: alpha(designConfig.colors.primary.contrastText, 0.2),
              "& .MuiLinearProgress-bar": {
                background: designConfig.colors.primary.contrastText,
                borderRadius: designConfig.borderRadius.md
              },
            }}
          />
          <Typography textAlign="center" mt={1.5} sx={{ fontSize: "0.75rem", opacity: 0.8, fontWeight: 500 }}>
            Daily Matching Potential: ₹2,500
          </Typography>
        </Box>

        <Button
          onClick={() => navigate('/payouts')}
          fullWidth
          sx={{
            mt: 3,
            bgcolor: designConfig.colors.surfaces.white,
            color: designConfig.colors.primary.main,
            py: 1.5,
            borderRadius: designConfig.borderRadius.md,
            fontWeight: 800,
            textTransform: "none",
            "&:hover": { bgcolor: alpha(designConfig.colors.surfaces.white, 0.9) }
          }}
        >
          Withdrawal Details
        </Button>
      </Card>

      {/* Week & Month Buttons */}
      <Stack direction="row" spacing={2} mb={3}>
        <Card
          sx={{
            p: 2,
            borderRadius: designConfig.borderRadius.lg,
            border: `1px solid ${designConfig.colors.background.border}`,
            flex: 1,
            textAlign: "center",
            boxShadow: designConfig.shadows.sm,
            bgcolor: designConfig.colors.surfaces.white
          }}
        >
          <Box sx={{ bgcolor: designConfig.colors.success.background, width: 32, height: 32, borderRadius: designConfig.borderRadius.sm, display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 1 }}>
            <ArrowUpIcon color={designConfig.colors.success.main} size={18} />
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: designConfig.colors.text.secondary }}>THIS WEEK</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: designConfig.colors.primary.main }}>₹8,750</Typography>
        </Card>

        <Card
          sx={{
            p: 2,
            borderRadius: designConfig.borderRadius.lg,
            border: `1px solid ${designConfig.colors.background.border}`,
            flex: 1,
            textAlign: "center",
            boxShadow: designConfig.shadows.sm,
            bgcolor: designConfig.colors.surfaces.white
          }}
        >
          <Box sx={{ bgcolor: designConfig.colors.success.background, width: 32, height: 32, borderRadius: designConfig.borderRadius.sm, display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 1 }}>
            <ArrowUpIcon color={designConfig.colors.success.main} size={18} />
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: designConfig.colors.text.secondary }}>THIS MONTH</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: designConfig.colors.primary.main }}>₹32,500</Typography>
        </Card>
      </Stack>

      {/* Binary Income Section */}
      <Card sx={{
        p: 2.5,
        borderRadius: designConfig.borderRadius.lg,
        border: `1px solid ${designConfig.colors.background.border}`,
        boxShadow: designConfig.shadows.sm,
        bgcolor: designConfig.colors.surfaces.white,
        mb: 3
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography fontWeight={800} color={designConfig.colors.text.primary}>Binary Commission</Typography>
          <Typography variant="caption" sx={{
            fontWeight: 700,
            bgcolor: alpha(designConfig.colors.primary.main, 0.1),
            px: 1,
            py: 0.5,
            borderRadius: designConfig.borderRadius.xs,
            color: designConfig.colors.primary.main
          }}>10% MATCH</Typography>
        </Stack>

        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary" fontWeight={500}>Matched Volume (BV)</Typography>
            <Typography variant="body2" fontWeight={700}>450</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary" fontWeight={500}>Capped Income</Typography>
            <Typography variant="body2" fontWeight={700}>₹1,250</Typography>
          </Stack>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary" fontWeight={500}>Forwarding Volume</Typography>
            <Typography variant="body2" fontWeight={700} color={designConfig.colors.success.main}>0 BV</Typography>
          </Stack>
        </Stack>
      </Card>

      {/* Generation Income */}
      <Card
        sx={{
          p: 2.5,
          borderRadius: designConfig.borderRadius.lg,
          border: `1px solid ${alpha(designConfig.colors.primary.main, 0.2)}`,
          background: alpha(designConfig.colors.primary.main, 0.05),
          boxShadow: designConfig.shadows.sm,
        }}
      >
        <Typography fontWeight={800} color={designConfig.colors.text.primary} mb={2}>Team Performance Bonus</Typography>

        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary" fontWeight={500}>Direct Referrals (5%)</Typography>
            <Typography variant="body2" fontWeight={700}>₹450</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary" fontWeight={500}>Direct's Directs (3%)</Typography>
            <Typography variant="body2" fontWeight={700}>₹320</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary" fontWeight={500}>Level 3 Network (2%)</Typography>
            <Typography variant="body2" fontWeight={700}>₹180</Typography>
          </Stack>

          <Divider sx={{ my: 1, borderColor: alpha(designConfig.colors.primary.main, 0.2) }} />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" fontWeight={800} color={designConfig.colors.text.primary}>Total bonus</Typography>
            <Typography variant="h6" fontWeight={900} color={designConfig.colors.primary.main}>
              ₹950
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default EarningTab;
