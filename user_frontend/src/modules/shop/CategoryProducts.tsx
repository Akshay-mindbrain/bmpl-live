import { Box, Typography, IconButton, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import StarIcon from "@mui/icons-material/Star";
import { MOCK_PRODUCTS } from "../../data/mockProducts";
import designConfig from '../../config/designConfig';


const CategoryProducts = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryName = searchParams.get("category");

    // Filter products based on selected category
    const products = categoryName
        ? MOCK_PRODUCTS.filter(p => {
            // Flexible matching for category names
            const productCat = p.category.toLowerCase().replace(/[^a-z0-9]/g, "");
            const selectedCat = categoryName.toLowerCase().replace(/[^a-z0-9]/g, "");
            return productCat.includes(selectedCat) || selectedCat.includes(productCat);
        })
        : MOCK_PRODUCTS;

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#fff", pb: 10 }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderBottom: "1px solid #f0f0f0",
                    bgcolor: "#fff",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{
                            bgcolor: designConfig.colors.primary.main,
                            color: "white",
                            borderRadius: designConfig.borderRadius.md,
                            width: 40,
                            height: 40,
                            "&:hover": { bgcolor: designConfig.colors.primary.dark },
                        }}
                    >
                        <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ flex: 2, textAlign: "center", color: "#1d1d1d" }} noWrap>
                    {categoryName || "Products"}
                </Typography>
                <Box sx={{ flex: 1 }} />
            </Box>

            {/* Product Found Count */}
            {categoryName && (
                <Box px={2} pt={2}>
                    <Typography variant="body1" fontWeight={500} color="#1d1d1d">
                        {products.length} product found
                    </Typography>
                </Box>
            )}

            {/* Product Grid */}
            <Box p={2}>
                {products.length === 0 ? (
                    <Box textAlign="center" mt={5}>
                        <Typography variant="h6" color="text.secondary">
                            No products found in this category.
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid size={{ xs: 6, md: 3 }} key={product.id}>
                                <Card
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    sx={{
                                        position: "relative",
                                        borderRadius: designConfig.borderRadius.md,
                                        border: `1px solid ${designConfig.colors.primary.main}`,
                                        boxShadow: "none",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        cursor: "pointer",
                                    }}
                                >
                                    {/* BV Badge */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            bgcolor: designConfig.colors.primary.main,
                                            color: "white",
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: designConfig.borderRadius.xs,
                                            fontSize: "0.65rem",
                                            fontWeight: 700,
                                            zIndex: 2,
                                        }}
                                    >
                                        {product.bv ? `${product.bv} BV` : "PV"}
                                    </Box>

                                    <Box
                                        sx={{
                                            height: { xs: 120, sm: 140, md: 160 }, // Smaller height on mobile
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            pt: 2,
                                            px: 1,
                                            pb: 0
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={product.image}
                                            alt={product.name}
                                            sx={{
                                                height: '100%',
                                                width: 'auto',
                                                maxWidth: '100%',
                                                objectFit: "contain"
                                            }}
                                        />
                                    </Box>

                                    <CardContent sx={{ p: 1.5, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <Typography variant="body1" fontWeight={600} color={designConfig.colors.primary.dark} sx={{ fontSize: "0.95rem", lineHeight: 1.3, mb: 1 }}>
                                            {product.name}
                                        </Typography>

                                        <Box>
                                            {/* Price Row */}
                                            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                                <Typography variant="body2" fontWeight={700} color={designConfig.colors.primary.dark}>
                                                    ₹{product.price}
                                                </Typography>
                                                {product.originalPrice && (
                                                    <Typography variant="caption" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                                                        ₹{product.originalPrice}
                                                    </Typography>
                                                )}

                                            </Box>

                                            {/* Rating Row */}
                                            {product.rating && (
                                                <Box display="flex" alignItems="center" gap={0.5}>
                                                    <StarIcon sx={{ color: "#FFD700", fontSize: 16 }} />
                                                    <Typography variant="caption" fontWeight={600} color="text.primary">
                                                        {product.rating}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default CategoryProducts;
