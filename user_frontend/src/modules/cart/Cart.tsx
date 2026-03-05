import {
    Box,
    Typography,
    IconButton,
    Button,
    Container,
    Paper,
    useTheme,
    useMediaQuery,
    Stack,
    Dialog,
    DialogContent
} from "@mui/material";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { addToCart, removeFromCart } from "../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import designConfig, { alpha } from "../../config/designConfig";

const Cart = () => {
    const items = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

    const handleIncrease = (item: any) => {
        dispatch(addToCart({ ...item, qty: 1 }));
    };

    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDecrease = (item: any) => {
        if (item.qty > 1) {
            dispatch(addToCart({ ...item, qty: -1 }));
        }
    };

    const handleRemove = (id: number) => {
        setDeleteId(id);
    };

    const handleConfirmDelete = () => {
        if (deleteId) {
            dispatch(removeFromCart(deleteId));
            setDeleteId(null);
        }
    };

    const handleCloseDelete = () => {
        setDeleteId(null);
    };

    if (items.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 4, height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        bgcolor: designConfig.colors.primary.main,
                        borderRadius: designConfig.borderRadius.full,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        boxShadow: designConfig.shadows.primary
                    }}
                >
                    <Typography variant="h4" color={designConfig.colors.primary.contrastText}>🛒</Typography>
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Your Cart is Empty
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                    Looks like you haven't added anything yet.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/category")}
                    sx={{
                        bgcolor: designConfig.colors.primary.main,
                        borderRadius: designConfig.borderRadius.md,
                        px: 4,
                        "&:hover": { bgcolor: designConfig.colors.primary.dark }
                    }}
                >
                    Start Shopping
                </Button>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: designConfig.colors.background.light, pb: isMobile ? 22 : 4 }}>
            {/* Header */}
            <Box sx={{
                position: "sticky",
                top: 0,
                zIndex: 1100,
                bgcolor: designConfig.colors.surfaces.white,
                borderBottom: `1px solid ${designConfig.colors.background.border}`
            }}>
                <Box sx={{
                    width: '100%',
                    px: 2,
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{
                            display: { xs: 'flex', md: 'none' }, // Only show on mobile
                            bgcolor: designConfig.colors.primary.main,
                            color: designConfig.colors.primary.contrastText,
                            borderRadius: designConfig.borderRadius.md,
                            width: 40,
                            height: 40,
                            "&:hover": { bgcolor: designConfig.colors.primary.dark },
                            boxShadow: designConfig.shadows.primary
                        }}
                    >
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        color={designConfig.colors.primary.main}
                        sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, flexGrow: 1, textAlign: { xs: 'left', md: 'left' } }}
                    >
                        Shopping Cart
                    </Typography>
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 3 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="flex-start">
                    {/* Cart Items List */}
                    <Box flex={1} width="100%">
                        <Stack spacing={2}>
                            {items.map((item) => (
                                <Paper
                                    key={item.id}
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: designConfig.borderRadius.lg,
                                        border: `1px solid ${designConfig.colors.background.border}`,
                                        boxShadow: designConfig.shadows.sm,
                                        display: "flex",
                                        gap: 2,
                                        alignItems: "center",
                                        bgcolor: designConfig.colors.surfaces.white
                                    }}
                                >
                                    {/* Product Image */}
                                    <Box
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: designConfig.borderRadius.md,
                                            overflow: "hidden",
                                            flexShrink: 0,
                                            bgcolor: designConfig.colors.surfaces.white,
                                            p: 1,
                                            border: `1px solid ${designConfig.colors.background.border}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        />
                                    </Box>

                                    {/* Details */}
                                    <Box flex={1}>
                                        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5, lineHeight: 1.2 }}>
                                            {item.name}
                                        </Typography>

                                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                                            <Typography variant="body1" fontWeight={700}>
                                                ₹{item.price}
                                            </Typography>
                                            {item.bv && (
                                                <Typography variant="caption" sx={{ color: designConfig.colors.primary.main, fontWeight: 600, bgcolor: designConfig.colors.success.background, px: 1, borderRadius: 1 }}>
                                                    BV {item.bv * item.qty}
                                                </Typography>
                                            )}
                                        </Box>

                                        {/* Actions Row */}
                                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                            {/* Quantity Controls */}
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDecrease(item)}
                                                    sx={{
                                                        border: `1px solid ${designConfig.colors.background.border}`,
                                                        width: 32,
                                                        height: 32
                                                    }}
                                                >
                                                    <KeyboardArrowDownIcon fontSize="small" />
                                                </IconButton>

                                                <Typography fontWeight={600} sx={{ minWidth: 20, textAlign: 'center' }}>
                                                    {item.qty}
                                                </Typography>

                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleIncrease(item)}
                                                    sx={{
                                                        border: `1px solid ${designConfig.colors.background.border}`,
                                                        width: 32,
                                                        height: 32
                                                    }}
                                                >
                                                    <KeyboardArrowUpIcon fontSize="small" />
                                                </IconButton>
                                            </Box>

                                            {/* Delete Button */}
                                            <IconButton
                                                onClick={() => handleRemove(item.id)}
                                                sx={{
                                                    color: designConfig.colors.error.main,
                                                    bgcolor: designConfig.colors.error.background,
                                                    "&:hover": { bgcolor: alpha(designConfig.colors.error.main, 0.15) }
                                                }}
                                            >
                                                <DeleteOutlineIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Paper>
                            ))}
                        </Stack>
                    </Box>

                    {/* Desktop Order Summary (Hidden on Mobile) */}
                    {!isMobile && (
                        <Box width={{ xs: "100%", md: 360 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: designConfig.borderRadius.xl,
                                    border: `1px solid ${designConfig.colors.background.border}`,
                                    position: "sticky",
                                    top: 100,
                                    bgcolor: designConfig.colors.surfaces.white
                                }}
                            >
                                <Typography variant="h6" fontWeight={700} mb={3}>
                                    Order Summary
                                </Typography>

                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography color="text.secondary">Items Total ({items.length})</Typography>
                                    <Typography fontWeight={600}>₹{total.toLocaleString()}</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography color="text.secondary">Total BV</Typography>
                                    <Typography fontWeight={600} color={designConfig.colors.primary.main}>
                                        {items.reduce((acc, i) => acc + (i.bv || 0) * i.qty, 0)}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mb={3}>
                                    <Typography color="text.secondary">Delivery</Typography>
                                    <Typography color={designConfig.colors.success.main} fontWeight={600}>Free</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        borderTop: `2px dashed ${designConfig.colors.background.border}`,
                                        pt: 2,
                                        mt: 2,
                                        mb: 3,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography variant="h6" fontWeight={700}>Total Amount</Typography>
                                    <Typography variant="h5" fontWeight={700} color="primary">
                                        ₹{total.toLocaleString()}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    onClick={() => navigate("/checkout")}
                                    sx={{
                                        py: 1.5,
                                        bgcolor: designConfig.colors.primary.main,
                                        borderRadius: designConfig.borderRadius.md,
                                        fontWeight: 700,
                                        boxShadow: designConfig.shadows.primary,
                                        "&:hover": { bgcolor: designConfig.colors.primary.dark }
                                    }}
                                >
                                    Proceed to Buy
                                </Button>
                            </Paper>
                        </Box>
                    )}
                </Stack>
            </Container>

            {/* Mobile Bottom Bar (Sticky) */}
            {isMobile && (
                <Paper
                    elevation={0}
                    sx={{
                        position: "fixed",
                        bottom: 79, // 1px overlap with 80px Nav to kill the white line
                        left: 0,
                        right: 0,
                        p: 2,
                        pb: 2,
                        borderTopLeftRadius: designConfig.borderRadius.lg,
                        borderTopRightRadius: designConfig.borderRadius.lg,
                        borderBottomLeftRadius: 0, // Flat bottom to merge
                        borderBottomRightRadius: 0, // Flat bottom to merge
                        zIndex: 1301, // Higher than Nav (1300) to ensure clean overlap if needed
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        bgcolor: designConfig.colors.secondary.main,
                        boxShadow: "none" // No shadow to look like flat block
                    }}
                >
                    <Box>
                        <Typography variant="body2" sx={{ color: alpha(designConfig.colors.secondary.contrastText, 0.8), fontWeight: 500 }}>
                            Total
                        </Typography>
                        <Typography variant="h5" sx={{ color: designConfig.colors.secondary.contrastText, fontWeight: 700 }}>
                            ₹{total.toLocaleString()}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/checkout")}
                        sx={{
                            bgcolor: designConfig.colors.surfaces.white,
                            color: designConfig.colors.primary.main,
                            px: 6,
                            py: 1.5,
                            borderRadius: designConfig.borderRadius.md,
                            fontWeight: 700,
                            fontSize: "1rem",
                            boxShadow: designConfig.shadows.sm,
                            textTransform: "none",
                            "&:hover": { bgcolor: alpha(designConfig.colors.surfaces.white, 0.9) }
                        }}
                    >
                        Buy
                    </Button>
                </Paper>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteId !== null}
                onClose={handleCloseDelete}
                PaperProps={{
                    sx: {
                        borderRadius: designConfig.borderRadius.lg,
                        p: 2,
                        minWidth: 300,
                        textAlign: "center",
                        bgcolor: designConfig.colors.surfaces.white
                    }
                }}
            >
                <DialogContent>
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: designConfig.colors.error.background,
                            borderRadius: designConfig.borderRadius.full,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2
                        }}
                    >
                        <DeleteOutlineIcon sx={{ fontSize: 32, color: designConfig.colors.error.main }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        Remove Item?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Are you sure you want to remove this item from your cart?
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            onClick={handleCloseDelete}
                            variant="outlined"
                            sx={{
                                borderRadius: designConfig.borderRadius.sm,
                                textTransform: "none",
                                fontWeight: 600,
                                color: designConfig.colors.text.secondary,
                                borderColor: designConfig.colors.background.border,
                                "&:hover": { borderColor: designConfig.colors.text.disabled, bgcolor: "transparent" }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            onClick={handleConfirmDelete}
                            variant="contained"
                            color="error"
                            sx={{
                                borderRadius: designConfig.borderRadius.sm,
                                textTransform: "none",
                                fontWeight: 600,
                                boxShadow: "none",
                                bgcolor: designConfig.colors.error.main
                            }}
                        >
                            Remove
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Cart;
