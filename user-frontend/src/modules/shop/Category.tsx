import { Box, Typography, Card, Avatar, Container, IconButton, Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import designConfig from '../../config/designConfig';

// Category Data
const categories = [
    {
        id: 1,
        name: "Vitamins & Supplements",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300",
        color: "#F5F5F5",
    },
    {
        id: 2,
        name: "Immunity Boosters",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300",
        color: "#F5F5F5",
    },
    {
        id: 3,
        name: "Protein & Nutrition Powders",
        image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400",
        color: "#F5F5F5",
    },
    {
        id: 4,
        name: "Skin, Hair & Beauty Care",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300",
        color: "#F5F5F5",
    },
    {
        id: 5,
        name: "Digestive Health",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300",
        color: "#F5F5F5",
    },
];

const Category = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryName: string) => {
        navigate(`/category-products?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: designConfig.colors.background.light, pb: 12 }}>
            {/* Sticky Sub-Header */}
            <Box sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                bgcolor: designConfig.colors.background.light,
                width: '100%',
                px: 2,
                py: 2,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1,
                boxShadow: { xs: 'none', md: "0 4px 6px -4px rgba(0,0,0,0.05)" },
                borderBottom: `1px solid ${designConfig.colors.background.border}`
            }}>
                <IconButton
                    onClick={() => navigate(-1)}
                    sx={{
                        display: { xs: 'flex', md: 'none' }, // Only show on mobile
                        color: designConfig.colors.primary.main,
                        bgcolor: designConfig.colors.background.paper,
                        '&:hover': { bgcolor: designConfig.colors.background.border },
                        width: 40,
                        height: 40,
                        borderRadius: designConfig.borderRadius.md
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
                    Shop by Categories
                </Typography>
            </Box>

            {/* Sticky Search Bar */}
            <Box sx={{
                position: 'sticky',
                top: { xs: 0, md: 72 }, // Adjust based on header height
                zIndex: 999,
                bgcolor: designConfig.colors.background.light,
                px: 2,
                pb: 2
            }}>
                <Paper
                    component="form"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        background: designConfig.colors.background.paper,
                        borderRadius: designConfig.borderRadius.full,
                        px: 2,
                        py: 1,
                        width: "100%",
                        boxShadow: "none",
                        border: `1px solid ${designConfig.colors.background.border}`,
                    }}
                >
                    <SearchIcon sx={{ color: "#9a9ea5" }} />
                    <InputBase
                        placeholder="Search categories..."
                        sx={{ ml: 1, flex: 1 }}
                    />
                </Paper>
            </Box>

            <Container maxWidth={false} sx={{ px: 2, mt: 1 }}>
                {/* Categories List */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {categories.map((category) => (
                        <Card
                            key={category.id}
                            onClick={() => handleCategoryClick(category.name)}
                            elevation={0}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                p: 1.5,
                                px: 2,
                                borderRadius: designConfig.borderRadius.md, // Soft rounded look
                                bgcolor: designConfig.colors.background.paper,
                                cursor: "pointer",
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.02)",
                                    bgcolor: designConfig.colors.background.light,
                                    boxShadow: designConfig.shadows.sm
                                },
                            }}
                        >
                            {/* Circle Image Wrapper */}
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: "50%",
                                    bgcolor: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    flexShrink: 0
                                }}
                            >
                                <Avatar
                                    src={category.image}
                                    alt={category.name}
                                    sx={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                            </Box>

                            {/* Text */}
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                color={designConfig.colors.text.primary}
                                sx={{
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    flex: 1
                                }}
                            >
                                {category.name}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default Category;
