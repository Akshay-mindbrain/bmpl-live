
import { Box, Typography, Button, Grid, Container, Paper, Stack, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import designConfig, { alpha } from "../../config/designConfig";
import { ShieldCheck, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';


const LandingPage = () => {
    const navigate = useNavigate();

    // Animation Variants - Premium Easing
    const transition: any = { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }; // Apple-style ease

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };



    // Custom Keyframes for Animations
    const keyframes = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(1deg); }
      }
      @keyframes float-subtle {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes float-long {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(15px, -25px) rotate(1deg); }
        66% { transform: translate(-10px, -15px) rotate(-1deg); }
      }
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
      }
      @keyframes shine {
        0% { left: -100%; transition-property: left; }
        100% { left: 100%; transition-property: left; }
      }
      .bento-card {
        transition: ${designConfig.transitions.default};
        border: 1px solid ${alpha(designConfig.colors.text.primary, 0.05)};
        position: relative;
        overflow: hidden;
      }
      .bento-card:hover {
        transform: translateY(-8px);
        box-shadow: ${designConfig.shadows.xl};
      }
      .bento-card::after {
        content: "";
        position: absolute;
        top: -50%;
        left: -100%;
        width: 100%;
        height: 200%;
        background: linear-gradient(
          to right,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        transform: rotate(35deg);
        transition: 0.7s;
      }
      .bento-card:hover::after {
        left: 100%;
      }
    `;

    return (
        <Box sx={{
            minHeight: "100vh",
            fontStyle: "normal",
            overflowX: "hidden",
            position: "relative",
            background: `
                radial-gradient(circle at 100% 0%, ${alpha(designConfig.colors.primary.light, 0.18)} 0%, transparent 50%),
                radial-gradient(circle at 0% 100%, ${alpha(designConfig.colors.secondary.main, 0.15)} 0%, transparent 50%),
                linear-gradient(180deg, ${alpha(designConfig.colors.primary.light, 0.05)} 0%, ${designConfig.colors.surfaces.white} 100%)
            `,
            "&::before": {
                content: '""',
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0.03,
                pointerEvents: "none",
                zIndex: 9999,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }
        }}>
            {/* Animated Background Shapes - Moved to Global */}
            <Box sx={{
                position: "absolute",
                top: "15%",
                right: "10%",
                width: "350px",
                height: "350px",
                borderRadius: designConfig.borderRadius.full,
                background: `linear-gradient(135deg, ${alpha(designConfig.colors.primary.main, 0.2)}, ${alpha(designConfig.colors.secondary.main, 0.2)})`,
                filter: "blur(70px)",
                animation: "float 8s ease-in-out infinite",
                zIndex: 0
            }} />
            <Box sx={{
                position: "absolute",
                bottom: "20%",
                left: "5%",
                width: "300px",
                height: "300px",
                borderRadius: designConfig.borderRadius.full,
                background: `linear-gradient(135deg, ${alpha(designConfig.colors.secondary.main, 0.15)}, ${alpha(designConfig.colors.primary.main, 0.15)})`,
                filter: "blur(60px)",
                animation: "float-delay 7s ease-in-out infinite",
                animationDelay: "1s",
                zIndex: 0
            }} />

            {/* Liquid Orbs (Global) */}
            <Box sx={{
                position: "absolute",
                top: "40%",
                left: "20%",
                width: "400px",
                height: "400px",
                borderRadius: designConfig.borderRadius.full,
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, ${alpha(designConfig.colors.primary.light, 0.12)} 40%, ${alpha(designConfig.colors.primary.main, 0.25)} 100%)`,
                boxShadow: `inset -20px -20px 50px rgba(0,0,0,0.1), inset 20px 20px 50px rgba(255,255,255,0.9)`,
                opacity: 0.4,
                animation: "float-long 12s ease-in-out infinite",
                filter: "blur(40px)",
                zIndex: 0,
                mixBlendMode: "multiply"
            }} />

            <style>{keyframes}</style>

            {/* 1. Navbar */}
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    background: `linear-gradient(90deg, ${alpha(designConfig.colors.primary.main, 0.15)}, ${designConfig.colors.surfaces.white} 40%, ${designConfig.colors.surfaces.white} 60%, ${alpha(designConfig.colors.primary.main, 0.15)})`,
                    backdropFilter: "blur(20px)",
                    borderBottom: `1px solid ${alpha(designConfig.colors.primary.main, 0.2)}`,
                    boxShadow: `0 4px 20px ${alpha(designConfig.colors.primary.main, 0.08)}`,
                    py: 0,
                }}
            >
                <Container maxWidth="lg">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }} onClick={() => navigate('/')}>
                            <img src="/assets/images/Logo.png" alt="BMPL" style={{ width: "120px", height: "120px", objectFit: "contain" }} />


                        </Box>

                        <Button
                            variant="contained"
                            onClick={() => navigate('/login')}
                            sx={{
                                background: designConfig.colors.gradients.primary,
                                color: designConfig.colors.primary.contrastText,
                                border: "none",
                                px: 5,
                                py: 1.2,
                                borderRadius: designConfig.borderRadius.md,
                                fontWeight: 700,
                                textTransform: "none",
                                boxShadow: designConfig.shadows.primary,
                                transition: designConfig.transitions.default,
                                position: "relative",
                                overflow: "hidden",
                                "&:hover": {
                                    transform: "translateY(-2px) scale(1.02)",
                                    boxShadow: `0 15px 30px -5px ${alpha(designConfig.colors.primary.main, 0.4)}`,
                                },
                                "&:active": {
                                    transform: "translateY(0) scale(0.98)",
                                }
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* 2. Hero Section */}
            <Box sx={{ position: "relative", pt: { xs: 8, md: 16 }, pb: { xs: 8, md: 12 } }}>

                {/* 2. Hero Section */}
                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pt: { xs: 4, md: 0 }, mt: { md: -12 }, pb: { xs: 4, md: 4 } }}>
                    <Grid container spacing={8} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                                style={{ textAlign: "left" }}
                            >
                                <Box
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        px: 2.5,
                                        py: 1,
                                        bgcolor: designConfig.colors.surfaces.white,
                                        border: `1px solid ${alpha(designConfig.colors.primary.main, 0.2)}`,
                                        boxShadow: `0 8px 20px ${alpha(designConfig.colors.primary.main, 0.1)}`,
                                        color: designConfig.colors.primary.main,
                                        borderRadius: designConfig.borderRadius.md,
                                        mb: 4,
                                        fontWeight: 700,
                                        fontSize: "0.9rem"
                                    }}
                                >
                                    <Zap size={18} fill="currentColor" /> #1 Network Marketing Platform
                                </Box>

                                <Typography variant="h1" fontWeight={900} sx={{
                                    lineHeight: 1.05,
                                    mb: 3,
                                    fontSize: { xs: "3.5rem", md: "5.5rem" },
                                    letterSpacing: "-0.04em",
                                    color: designConfig.colors.text.primary,
                                    textShadow: `0 2px 15px ${alpha(designConfig.colors.text.primary, 0.08)}`
                                }}>
                                    The Future of <br />
                                    <span style={{
                                        color: "transparent",
                                        backgroundImage: designConfig.colors.gradients.primary,
                                        WebkitBackgroundClip: "text",
                                        position: "relative",
                                        display: "inline-block"
                                    }}>Networking</span>
                                </Typography>

                                <Typography variant="h6" color="text.secondary" sx={{
                                    mb: 5,
                                    fontWeight: 400,
                                    opacity: 0.9,
                                    lineHeight: 1.6,
                                    fontSize: "1.2rem",
                                    maxWidth: "550px",
                                    mx: { xs: "auto", md: 0 }
                                }}>
                                    Join the fastest-growing community of entrepreneurs.
                                    Simplified binary management, real-time analytics, and instant payouts.
                                </Typography>

                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={2}
                                    justifyContent={{ xs: "center", md: "flex-start" }}
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => navigate('/welcome')}
                                        sx={{
                                            bgcolor: designConfig.colors.primary.main,
                                            fontSize: "1.1rem",
                                            fontWeight: 700,
                                            px: 5,
                                            py: 2,
                                            borderRadius: designConfig.borderRadius.md,
                                            textTransform: "none",
                                            background: designConfig.colors.gradients.primary,
                                            boxShadow: designConfig.shadows.primary,
                                            position: "relative",
                                            overflow: "hidden",
                                            "&::after": {
                                                content: '""',
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                background: "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                                                animation: "pulse-glow 3s infinite"
                                            },
                                            "&:hover": {
                                                bgcolor: designConfig.colors.primary.dark,
                                                transform: "translateY(-2px)",
                                                boxShadow: `0 15px 40px ${alpha(designConfig.colors.primary.main, 0.4)}`,
                                            }
                                        }}
                                    >
                                        Start Your Journey
                                    </Button>

                                    <Button
                                        variant="text"
                                        size="large"
                                        sx={{
                                            color: designConfig.colors.text.secondary,
                                            fontSize: "1.1rem",
                                            fontWeight: 700,
                                            px: 4,
                                            py: 2,
                                            borderRadius: designConfig.borderRadius.md,
                                            textTransform: "none",
                                            "&:hover": {
                                                bgcolor: alpha(designConfig.colors.text.primary, 0.05),
                                                color: designConfig.colors.text.primary
                                            }
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </Stack>
                            </motion.div>
                        </Grid>

                        {/* Hero Graphic - Interactive Folded Mockup */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <motion.div
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ ...transition, duration: 1, delay: 0.2 }}
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                {/* Decorative Ring */}
                                <Box sx={{
                                    position: "absolute",
                                    width: "120%",
                                    height: "120%",
                                    borderRadius: designConfig.borderRadius.full,
                                    border: `1px dashed ${alpha(designConfig.colors.primary.main, 0.2)}`,
                                    animation: "morph 20s linear infinite",
                                    zIndex: 0
                                }} />

                                <Box sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: "450px",
                                    perspective: "2000px",
                                    zIndex: 1
                                }}>
                                    {/* App Mockup 1 (Back) */}
                                    <Box sx={{
                                        position: "absolute",
                                        top: "10%",
                                        right: "10%",
                                        width: "80%",
                                        height: "80%",
                                        background: alpha(designConfig.colors.surfaces.white, 0.4),
                                        backdropFilter: "blur(10px)",
                                        borderRadius: designConfig.borderRadius.lg,
                                        border: `1px solid ${alpha(designConfig.colors.surfaces.white, 0.6)}`,
                                        boxShadow: `0 20px 40px ${alpha(designConfig.colors.text.primary, 0.1)}`,
                                        transform: "rotateY(-25deg) rotateX(10deg) translateZ(-50px)",
                                        overflow: "hidden",
                                        transition: designConfig.transitions.default,
                                        "&:hover": { transform: "rotateY(-15deg) rotateX(5deg) translateZ(-20px)" }
                                    }}>
                                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" style={{ width: "100%", opacity: 0.6 }} />
                                    </Box>

                                    {/* App Mockup 2 (Front) */}
                                    <Box sx={{
                                        position: "absolute",
                                        top: "20%",
                                        left: "5%",
                                        width: "85%",
                                        height: "85%",
                                        background: designConfig.colors.surfaces.white,
                                        borderRadius: designConfig.borderRadius.lg,
                                        p: 1,
                                        boxShadow: designConfig.shadows.xl,
                                        transform: "rotateY(15deg) rotateX(5deg) translateZ(50px)",
                                        zIndex: 2,
                                        transition: designConfig.transitions.default,
                                        "&:hover": { transform: "rotateY(5deg) rotateX(0deg) translateZ(80px)" }
                                    }}>
                                        <Box sx={{ overflow: "hidden", borderRadius: designConfig.borderRadius.md, height: "100%" }}>
                                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </Box>
                                    </Box>

                                    {/* Ambient Mini-Card 1: Earnings */}
                                    <Box sx={{
                                        position: "absolute",
                                        bottom: "10%",
                                        right: "-5%",
                                        bgcolor: designConfig.colors.surfaces.white,
                                        p: 1.5,
                                        borderRadius: designConfig.borderRadius.md,
                                        boxShadow: `0 20px 40px ${alpha(designConfig.colors.text.primary, 0.15)}`,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        zIndex: 3,
                                        animation: "float-subtle 4s ease-in-out infinite",
                                        border: `1px solid ${alpha(designConfig.colors.text.primary, 0.05)}`
                                    }}>
                                        <Box sx={{ p: 1, borderRadius: designConfig.borderRadius.sm, bgcolor: alpha(designConfig.colors.success.main, 0.15), color: designConfig.colors.success.main }}>
                                            <Zap size={20} fill="currentColor" />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ display: "block", color: "text.secondary", fontWeight: 700, fontSize: "10px", textTransform: "uppercase" }}>New Payout</Typography>
                                            <Typography variant="body2" fontWeight={900} color="text.primary">+₹45,200.00</Typography>
                                        </Box>
                                    </Box>

                                    {/* Ambient Mini-Card 2: Team */}
                                    <Box sx={{
                                        position: "absolute",
                                        top: "15%",
                                        left: "-10%",
                                        bgcolor: designConfig.colors.surfaces.white,
                                        px: 2,
                                        py: 1,
                                        borderRadius: designConfig.borderRadius.md,
                                        boxShadow: `0 20px 40px ${alpha(designConfig.colors.text.primary, 0.12)}`,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        zIndex: 3,
                                        animation: "float-subtle 4s ease-in-out infinite",
                                        animationDelay: "1s",
                                        border: `1px solid ${alpha(designConfig.colors.text.primary, 0.05)}`
                                    }}>
                                        <Avatar src="https://i.pravatar.cc/150?u=4" sx={{ width: 30, height: 30 }} />
                                        <Box>
                                            <Typography variant="body2" fontWeight={800} sx={{ fontSize: "12px" }}>Sarah joined team</Typography>
                                            <Typography variant="caption" sx={{ color: designConfig.colors.primary.main, fontWeight: 700 }}>Diamond Rank</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* 2.5 stats Section */}
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, mt: 0, mb: 6 }}>
                <Box
                    sx={{
                        p: 4,
                        borderRadius: designConfig.borderRadius.lg,
                        background: alpha(designConfig.colors.surfaces.white, 0.6),
                        backdropFilter: "blur(24px)",
                        border: `1px solid ${alpha(designConfig.colors.surfaces.white, 0.6)}`,
                        boxShadow: `0 20px 60px -15px ${alpha(designConfig.colors.text.primary, 0.08)}`,
                        mx: { md: 8 },
                        position: "relative",
                        overflow: "hidden"
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={transition}
                    >
                        <Grid container spacing={0} justifyContent="space-around" alignItems="center">
                            {[
                                { label: "Active Members", value: "10K+", color: designConfig.colors.primary.main },
                                { label: "Total Payouts", value: "₹5Cr+", color: "#F59E0B" },
                                { label: "Cities Covered", value: "50+", color: designConfig.colors.secondary.main },
                            ].map((stat, index) => (
                                <Grid size={{ xs: 12, md: 4 }} key={index} sx={{
                                    textAlign: "center",
                                    borderRight: { md: index !== 2 ? `1px solid ${alpha(designConfig.colors.text.primary, 0.05)}` : "none" },
                                    borderBottom: { xs: index !== 2 ? `1px solid ${alpha(designConfig.colors.text.primary, 0.05)}` : "none", md: "none" },
                                    py: { xs: 2, md: 0 }
                                }}>
                                    <Typography variant="h3" fontWeight={800} sx={{
                                        background: `linear-gradient(135deg, ${stat.color}, ${alpha(stat.color, 0.85)})`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        mb: 0.5,
                                        letterSpacing: "-2px"
                                    }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600} color="text.secondary" sx={{ letterSpacing: "0.5px", textTransform: "uppercase", fontSize: "0.8rem", opacity: 0.7 }}>
                                        {stat.label}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Box>
            </Container>

            {/* 4. How It Works Section */}
            <Box sx={{ py: 6, bgcolor: "transparent", position: "relative", overflow: "hidden" }}>
                {/* Bg decorative */}
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: alpha(designConfig.colors.surfaces.light, 0.5),
                    zIndex: 0
                }} />

                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                    <Box
                        textAlign="center"
                        mb={10}
                        component={motion.div}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <Box
                                sx={{
                                    display: "inline-block",
                                    px: 2, py: 0.5,
                                    borderRadius: designConfig.borderRadius.md,
                                    bgcolor: alpha(designConfig.colors.secondary.main, 0.1),
                                    color: designConfig.colors.secondary.main,
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    mb: 2
                                }}
                            >
                                POWERFUL FEATURES
                            </Box>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <Typography variant="h3" fontWeight={800} mb={3} sx={{ color: designConfig.colors.text.primary, letterSpacing: "-1px" }}>
                                Built for Your Success
                            </Typography>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <Typography variant="h6" color="text.secondary" maxWidth="600px" mx="auto" sx={{ opacity: 0.8, fontWeight: 500 }}>
                                Everything you need to manage your network and maximize your earnings in one place.
                            </Typography>
                        </motion.div>
                    </Box>

                    {/* Bento Box Features Grid */}
                    <Grid container spacing={3}>
                        {/* 1. Large Feature Card */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeInUp}
                                style={{ height: "100%" }}
                            >
                                <Paper className="bento-card" sx={{ p: 5, borderRadius: designConfig.borderRadius.lg, bgcolor: designConfig.colors.surfaces.white, height: "100%", position: "relative", overflow: "hidden" }}>
                                    <Box sx={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: designConfig.borderRadius.full, background: alpha(designConfig.colors.primary.main, 0.05) }} />
                                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={4}>
                                        <Box flex={1}>
                                            <Box sx={{ width: 60, height: 60, borderRadius: designConfig.borderRadius.md, background: alpha(designConfig.colors.primary.main, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: designConfig.colors.primary.main, mb: 3 }}>
                                                <Users size={30} />
                                            </Box>
                                            <Typography variant="h4" fontWeight={800} mb={2}>Visual Genealogy</Typography>
                                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                                                Experience the most intuitive binary management system. Manage unlimited depth with our high-performance tree visualization.
                                            </Typography>
                                        </Box>
                                        <Box flex={1} sx={{ position: 'relative' }}>
                                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400" style={{ width: "100%", borderRadius: designConfig.borderRadius.md, boxShadow: `0 20px 40px ${alpha(designConfig.colors.text.primary, 0.1)}` }} />
                                        </Box>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>

                        {/* 2. Small Vertical Card */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeInUp}
                                style={{ height: "100%" }}
                            >
                                <Paper className="bento-card" sx={{ p: 5, borderRadius: designConfig.borderRadius.lg, bgcolor: "#1E293B", color: "white", height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                                    <Box sx={{ mx: 'auto', width: 80, height: 80, borderRadius: designConfig.borderRadius.md, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                                        <Zap size={40} color="#FFD700" />
                                    </Box>
                                    <Typography variant="h4" fontWeight={800} mb={2}>Weekly Payouts</Typography>
                                    <Typography sx={{ opacity: 0.7 }}>Instant processing of commissions directly to your linked bank account every Monday.</Typography>
                                </Paper>
                            </motion.div>
                        </Grid>

                        {/* 3. Small Horizontal Card */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeInUp}
                                style={{ height: "100%" }}
                            >
                                <Paper className="bento-card" sx={{ p: 4, borderRadius: designConfig.borderRadius.lg, bgcolor: alpha(designConfig.colors.secondary.main, 0.05), border: `1px solid ${alpha(designConfig.colors.secondary.main, 0.15)}`, height: "100%" }}>
                                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                                        <ShieldCheck size={24} color={designConfig.colors.secondary.main} />
                                        <Typography variant="h6" fontWeight={800}>Secure Ledger</Typography>
                                    </Box>
                                    <Typography color="text.secondary">Encrypted transaction logs ensure your BVs and matchings are always safe and immutable.</Typography>
                                </Paper>
                            </motion.div>
                        </Grid>

                        {/* 4. Medium Feature Card */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeInUp}
                                style={{ height: "100%" }}
                            >
                                <Paper className="bento-card" sx={{ p: 4, borderRadius: designConfig.borderRadius.lg, bgcolor: designConfig.colors.background.paper, height: "100%", display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box sx={{ p: 2, background: designConfig.colors.surfaces.white, borderRadius: designConfig.borderRadius.sm, display: { xs: 'none', sm: 'block' } }}>
                                        <img src="https://i.pravatar.cc/100?u=1" style={{ borderRadius: designConfig.borderRadius.sm }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h5" fontWeight={800} mb={1}>Real-time Analytics</Typography>
                                        <Typography color="text.secondary">Monitor your team performance and earnings growth with interactive charts and insights updated every second.</Typography>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* 4. Footer CTA */}
            <Box sx={{
                py: 12,
                background: `linear-gradient(135deg, #0F172A 0%, #1E293B 100%)`,
                color: "white",
                textAlign: "center",
                position: "relative",
                overflow: "hidden"
            }}>
                {/* Footer Background Pattern */}
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0.1,
                    backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "30px 30px"
                }} />

                <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
                    <Typography variant="h3" fontWeight={800} mb={3} sx={{ letterSpacing: "-0.03em" }}>
                        Ready to Transform Your Future?
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.7, mb: 6, fontWeight: 400 }}>
                        Join thousands of successful agents who are redefining their financial freedom with BMPL.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/welcome')}
                        sx={{
                            bgcolor: designConfig.colors.surfaces.white,
                            color: designConfig.colors.primary.main,
                            fontWeight: 800,
                            px: 8,
                            py: 2.5,
                            fontSize: "1.2rem",
                            borderRadius: designConfig.borderRadius.md,
                            textTransform: "none",
                            transition: designConfig.transitions.default,
                            "&:hover": {
                                bgcolor: designConfig.colors.surfaces.white,
                                transform: "translateY(-3px)",
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)"
                            },
                            "&:active": {
                                transform: "translateY(-1px)"
                            }
                        }}
                    >
                        Create Account
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;
