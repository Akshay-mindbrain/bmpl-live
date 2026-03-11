import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Button, Paper, Container, useTheme, useMediaQuery } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/slice/cartSlice";
import designConfig from "../../config/designConfig";



import type { Product } from '../../types/product';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const product: Product | null = useMemo(() => {
        return MOCK_PRODUCTS.find(p => p.id === Number(id)) || null;
    }, [id]);


    useEffect(() => {
        if (product) {
            window.scrollTo(0, 0);
        }
    }, [product]);


    if (!product) {
        return <Box sx={{ p: 4, textAlign: 'center' }}>Product not found</Box>;
    }


    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            stock: "In Stock",
            bv: product.bv,
            qty: 1
        }));
    };


    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);


    return (
        <Box sx={{
            minHeight: "100vh",
            bgcolor: "#fff",
            pb: isMobile ? 22 : 10,
            width: '100%',
            maxWidth: '100vw',
            overflowX: "hidden",
            position: 'relative'
        }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                position: 'sticky',
                top: 0,
                bgcolor: 'white',
                zIndex: 1100,
                borderBottom: '1px solid #f0f0f0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '100vw'
            }}>
                <IconButton
                    onClick={() => navigate(-1)}
                    sx={{
                        bgcolor: designConfig.colors.primary.main,
                        color: "white",
                        borderRadius: "12px",
                        width: 40,
                        height: 40,
                        "&:hover": { bgcolor: designConfig.colors.primary.dark },
                        mr: 2,
                        flexShrink: 0
                    }}
                >
                    <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        flex: 1,
                        fontSize: { xs: '0.95rem', md: '1.25rem' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        pr: 2
                    }}
                >
                    {product.name}
                </Typography>
            </Box>


            <Container
                maxWidth="md"
                disableGutters
                sx={{
                    width: '100%',
                    maxWidth: '100vw',
                    overflowX: 'hidden',
                    px: 2
                }}
            >
                <Box sx={{ width: '100%', maxWidth: '100%' }}>
                    {/* Product Image */}
                    <Box
                        sx={{
                            mb: { xs: 2, md: 3 },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '100%'
                        }}
                    >
                        <Box
                            component="img"
                            src={product.image}
                            alt={product.name}
                            sx={{
                                width: '100%',
                                maxWidth: { xs: 280, sm: 350 },
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    </Box>


                    {/* Product Name */}
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        gutterBottom
                        sx={{
                            color: '#1d1d1d',
                            fontSize: { xs: '1.1rem', md: '1.5rem' },
                            mb: 1.5,
                            wordWrap: 'break-word'
                        }}
                    >
                        {product.name}
                    </Typography>


                    {/* Rating */}
                    {product.rating && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                            <StarIcon sx={{ color: '#FFD700', fontSize: { xs: 18, md: 20 } }} />
                            <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                {product.rating}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                                (124 reviews)
                            </Typography>
                        </Box>
                    )}


                    {/* Price Section */}
                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
                            <Typography
                                variant="h4"
                                fontWeight={800}
                                sx={{
                                    color: designConfig.colors.primary.main,
                                    fontSize: { xs: '1.75rem', md: '2rem' }
                                }}
                            >
                                ₹{product.price}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    textDecoration: 'line-through',
                                    color: 'text.secondary',
                                    fontSize: { xs: '1rem', md: '1.25rem' }
                                }}
                            >
                                ₹{product.originalPrice}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            fontWeight={700}
                            sx={{
                                color: '#E53935',
                                fontSize: { xs: '0.9rem', md: '1rem' }
                            }}
                        >
                            Save {discount}% • ₹{product.originalPrice - product.price} off
                        </Typography>
                    </Box>


                    {/* BV Badge */}
                    <Box
                        sx={{
                            bgcolor: '#E8F5E9',
                            p: { xs: 1.5, md: 2 },
                            borderRadius: "8px",
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            mb: 3,
                            border: `1px solid ${designConfig.colors.background.border}`,
                            flexWrap: 'wrap',
                            width: '100%',
                            maxWidth: '100%',
                            boxSizing: 'border-box'
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: designConfig.colors.primary.main,
                                color: 'white',
                                fontSize: { xs: '0.75rem', md: '0.85rem' },
                                fontWeight: 700,
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '6px'
                            }}
                        >
                            {product.bv} BV
                        </Box>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            color={designConfig.colors.secondary.main}
                            sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}
                        >
                            Earn {product.bv} business value points
                        </Typography>
                    </Box>


                    {/* Description */}
                    <Box sx={{ mb: 3, width: '100%', maxWidth: '100%' }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            gutterBottom
                            sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
                        >
                            Description
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.7,
                                fontSize: { xs: '0.9rem', md: '1rem' },
                                wordWrap: 'break-word'
                            }}
                        >
                            {product.longDescription}
                        </Typography>
                    </Box>


                    {/* Key Benefits */}
                    <Box sx={{ mb: 3, width: '100%', maxWidth: '100%' }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            gutterBottom
                            sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
                        >
                            Key Benefits
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {product.keyBenefits.map((benefit: string, idx: number) => (
                                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                    <CheckCircleIcon sx={{ color: designConfig.colors.primary.main, fontSize: 20, mt: 0.2, flexShrink: 0 }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: { xs: '0.9rem', md: '1rem' },
                                            lineHeight: 1.6,
                                            wordWrap: 'break-word',
                                            flex: 1
                                        }}
                                    >
                                        {benefit}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>


                    {/* Specifications */}
                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <Box sx={{ mb: 4, width: '100%', maxWidth: '100%' }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                gutterBottom
                                sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, mb: 1.5 }}
                            >
                                Specifications
                            </Typography>
                            <Box sx={{
                                bgcolor: '#FAFAFA',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid #f0f0f0',
                                width: '100%',
                                maxWidth: '100%',
                                boxSizing: 'border-box'
                            }}>
                                {Object.entries(product.specifications).map(([key, value], index, array) => (
                                    <Box
                                        key={key}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: { xs: 1.5, md: 2 },
                                            borderBottom: index !== array.length - 1 ? '1px solid #e0e0e0' : 'none',
                                            gap: 2,
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                fontSize: { xs: '0.85rem', md: '0.95rem' },
                                                flex: '0 0 auto',
                                                minWidth: { xs: '100px', sm: 'auto' }
                                            }}
                                        >
                                            {key}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                            sx={{
                                                fontSize: { xs: '0.85rem', md: '0.95rem' },
                                                textAlign: 'right',
                                                wordWrap: 'break-word',
                                                flex: '1 1 auto'
                                            }}
                                        >
                                            {value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}


                    {/* You May Also Like */}
                    <Box sx={{ mb: 2, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            gutterBottom
                            sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, mb: 2 }}
                        >
                            You may also like
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                                gap: 2,
                                pb: 1,
                                width: '100%',
                                maxWidth: '100%',
                                mx: -0.5,
                                px: 0.5,
                                '&::-webkit-scrollbar': {
                                    height: '6px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    borderRadius: '3px'
                                },
                                '@media (max-width: 600px)': {
                                    '&::-webkit-scrollbar': {
                                        display: 'none'
                                    }
                                },
                                msOverflowStyle: { xs: 'none', sm: 'auto' },
                                scrollbarWidth: { xs: 'none', sm: 'thin' }
                            }}
                        >
                            {MOCK_PRODUCTS
                                .filter(p => p.category === product.category && p.id !== product.id)
                                .slice(0, 4)
                                .map((related) => (
                                    <Paper
                                        key={related.id}
                                        elevation={0}
                                        onClick={() => navigate(`/product/${related.id}`)}
                                        sx={{
                                            minWidth: { xs: 130, sm: 140 },
                                            maxWidth: { xs: 130, sm: 140 },
                                            flexShrink: 0,
                                            borderRadius: "12px",
                                            border: `1px solid ${designConfig.colors.primary.main}`,
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                            }
                                        }}
                                    >
                                        <Box sx={{ position: 'relative', bgcolor: '#FAFAFA' }}>
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 6,
                                                    right: 6,
                                                    bgcolor: designConfig.colors.primary.main,
                                                    color: 'white',
                                                    fontSize: '10px',
                                                    fontWeight: 700,
                                                    px: 0.8,
                                                    py: 0.3,
                                                    borderRadius: '4px',
                                                    zIndex: 1
                                                }}
                                            >
                                                {related.bv} BV
                                            </Box>
                                            <Box
                                                component="img"
                                                src={related.image}
                                                sx={{
                                                    width: '100%',
                                                    height: { xs: 100, md: 120 },
                                                    objectFit: 'contain',
                                                    p: 1.5
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ p: 1.5 }}>
                                            <Typography
                                                variant="caption"
                                                fontWeight={700}
                                                color={designConfig.colors.primary.dark}
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    display: 'block',
                                                    mb: 0.5,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {related.name}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'baseline', mb: 0.5 }}>
                                                <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.9rem' }}>
                                                    ₹{related.price}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        textDecoration: 'line-through',
                                                        color: 'text.secondary',
                                                        fontSize: '0.7rem'
                                                    }}
                                                >
                                                    ₹{related.originalPrice}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <StarIcon sx={{ fontSize: 12, color: '#FFD700' }} />
                                                <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.7rem' }}>
                                                    {related.rating}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                ))}
                        </Box>
                    </Box>


                </Box>
            </Container>


            {/* Sticky Add to Cart Footer */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: isMobile ? 80 : 0, // Stack above Bottom Nav on mobile
                    left: 0,
                    right: 0,
                    bgcolor: 'white',
                    p: 2,
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.08)',
                    borderTop: '1px solid #f0f0f0',
                    zIndex: 1100,
                    width: '100%',
                    maxWidth: '100vw',
                    boxSizing: 'border-box'
                }}
            >
                <Container maxWidth="md" disableGutters sx={{ px: 2 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleAddToCart}
                        sx={{
                            bgcolor: designConfig.colors.primary.main,
                            color: "white",
                            borderRadius: "12px",
                            py: { xs: 1.5, md: 1.8 },
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            fontWeight: 700,
                            textTransform: 'none',
                            boxShadow: 'none',
                            "&:hover": {
                                bgcolor: designConfig.colors.primary.dark,
                                boxShadow: designConfig.shadows.primary
                            }
                        }}
                    >
                        Add to Cart
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};


export default ProductDetails;
