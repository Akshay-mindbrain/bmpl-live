import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
// import Congrats from "../../../assets/congarts.png";
// import Congrats from "../../../assets/Congrats.png";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
 
import { useEffect, useState } from "react";
 
export default function DashboardHeader() {
  const [confetti, setConfetti] = useState<any[]>([]);
  const [showConfetti, setShowConfetti] = useState(true);
 
 useEffect(() => {
  const colors = [
    "#f59e0b",
    "#1e293b",
    "#22c55e",
    "#3b82f6",
    "#ef4444",
    "#a855f7",
  ];
 
  const pieces = Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2.5 + Math.random() * 1.5,
    size: 6 + Math.random() * 8,
  }));
 
  setConfetti(pieces);
 
  // Stop animation after 4 seconds
  const timer = setTimeout(() => {
    setShowConfetti(false);
  }, 8000);
 
  return () => clearTimeout(timer);
}, []);
 
  return (
    <Box px={2} mb={2} mt={4}>
      {/* CSS Animation defined locally */}
      <style>
        {`
          @keyframes flyConfetti {
            0% {
              transform: translateY(150%) rotate(0deg);
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              transform: translateY(-250px) rotate(720deg) translateX(40px);
              opacity: 0;
            }
          }
        `}
      </style>
 
      <Grid container spacing={2}>
        {/* LEFT CARD (Congratulations Section) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 3,
              textAlign: "center",
              height: "100%",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative", // Needed to contain the confetti
              overflow: "hidden", // Keeps papers inside the card boundary
              backgroundColor: "#F1F7FF", // Your requested background color
            }}
          >
            {/* Flying Party Paper Elements */}
            {showConfetti &&
  confetti.map((p) => (
              <Box
                key={p.id}
                sx={{
                  position: "absolute",
                  bottom: "-10%",
                  left: `${p.left}%`,
                  width: p.size,
                  height: p.size * 0.7, // Rectangular shape
                  backgroundColor: p.color,
                  zIndex: 1,
                  borderRadius: "2px",
                  animation: `flyConfetti ${p.duration}s linear ${p.delay}s`,
                  opacity: 0,
                }}
              />
            ))}
 
            <CardContent sx={{ p: 2, "&:last-child": { pb: 3 }, zIndex: 2 }}>
              <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    mb: 2,
  }}
>
  <Box
    sx={{
      width: 120,
      height: 120,
      borderRadius: "50%",
      background: "linear-gradient(145deg, #facc15, #f59e0b)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    }}
  >
    <EmojiEventsIcon
      sx={{
        fontSize: 70,
        color: "#fff",
      }}
    />
  </Box>
</Box>
 
              <Typography
                variant="h5"
                fontWeight={800}
                mb={0.5}
                sx={{ color: "#1e293b" }}
              >
                Congratulations 🎉
              </Typography>
 
              <Typography variant="body1" sx={{ color: "#475569", mb: 0.5 }}>
                You have successfully become a Member of BMPL
              </Typography>
 
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{
                  color: "#f59e0b",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                BMPL
              </Typography>
            </CardContent>
          </Card>
        </Grid>
 
        {/* RIGHT CARDS */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={2}>
            {["Today", "Last Day", "This Week", "This Month"].map(
              (title, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                  <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={700} mb={1.5}>
                        {title}
                      </Typography>
 
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        mb={0.5}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Income
                        </Typography>
                        <Typography fontWeight={600}>₹0</Typography>
                      </Box>
 
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        mb={0.5}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Self BV
                        </Typography>
                        <Typography fontWeight={600}>0</Typography>
                      </Box>
 
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Team BV
                        </Typography>
                        <Typography fontWeight={600}>0</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ),
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
