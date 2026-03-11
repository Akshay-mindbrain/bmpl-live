import {
    Box,
    Typography,
    Paper,
    Button,
    Container,
    Stack,
    IconButton,
    Switch,
    Divider,
    TextField,
    InputAdornment,
    Dialog,
    DialogContent,
    Tooltip
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import designConfig, { alpha } from "../../config/designConfig";
import { addToCart } from "../../redux/slice/cartSlice";

const Checkout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cartItems = useAppSelector((state) => state.cart.items);

    // States
    const [useCoins, setUseCoins] = useState(false);
    const [useWallet, setUseWallet] = useState(false);

    // Tooltip States
    const [coinTooltipOpen, setCoinTooltipOpen] = useState(false);
    const [walletTooltipOpen, setWalletTooltipOpen] = useState(false);
    const coinTimerRef = useRef<number | null>(null);
    const walletTimerRef = useRef<number | null>(null);

    // Coupon State
    const [isCouponDialogOpen, setIsCouponDialogOpen] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
    const [couponError, setCouponError] = useState("");

    // Tooltip Handlers
    const handleCoinTooltip = () => {
        setCoinTooltipOpen(true);
        if (coinTimerRef.current) clearTimeout(coinTimerRef.current);
        coinTimerRef.current = setTimeout(() => {
            setCoinTooltipOpen(false);
        }, 3000);
    };

    const handleWalletTooltip = () => {
        setWalletTooltipOpen(true);
        if (walletTimerRef.current) clearTimeout(walletTimerRef.current);
        walletTimerRef.current = setTimeout(() => {
            setWalletTooltipOpen(false);
        }, 3000);
    };

    // Cleanup timers
    useEffect(() => {
        return () => {
            if (coinTimerRef.current) clearTimeout(coinTimerRef.current);
            if (walletTimerRef.current) clearTimeout(walletTimerRef.current);
        };
    }, []);

    // Calculations
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalBV = cartItems.reduce((acc, item) => acc + (item.bv || 0) * item.qty, 0);

    // Mock values
    const coinBalance = 2500;
    const coinSavings = 100;
    const walletBalance = 850;
    const walletUsage = 200;
    const deliveryCharge = 5.99;
    const tax = 10.20;

    // Coupon Logic
    const handleApplyCoupon = () => {
        if (!couponCode) {
            setCouponError("Please enter a coupon code");
            return;
        }

        // Mock Validation
        if (couponCode.toUpperCase() === "SAVE50") {
            setAppliedCoupon({ code: "SAVE50", discount: 50 });
            setIsCouponDialogOpen(false);
            setCouponError("");
            setCouponCode("");
        } else if (couponCode.toUpperCase() === "WELCOME20") {
            setAppliedCoupon({ code: "WELCOME20", discount: 20 });
            setIsCouponDialogOpen(false);
            setCouponError("");
            setCouponCode("");
        } else if (couponCode.toUpperCase() === "FESTIVE10") {
            setAppliedCoupon({ code: "FESTIVE10", discount: 10 });
            setIsCouponDialogOpen(false);
            setCouponError("");
            setCouponCode("");
        } else {
            setCouponError("Invalid Coupon Code");
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
    };

    const totalAmount = subtotal
        - (useCoins ? coinSavings : 0)
        - (useWallet ? walletUsage : 0)
        - (appliedCoupon ? appliedCoupon.discount : 0)
        + deliveryCharge
        + tax;

    const handleIncrease = (item: any) => {
        dispatch(addToCart({ ...item, qty: 1 }));
    };

    const handleDecrease = (item: any) => {
        if (item.qty > 1) {
            dispatch(addToCart({ ...item, qty: -1 }));
        }
    };

    const handleProceed = () => {
        navigate("/payment");
    };

    if (cartItems.length === 0) {
        return (
            <Box p={4} textAlign="center" pt={10} sx={{ bgcolor: designConfig.colors.background.default, minHeight: '100vh' }}>
                <Typography variant="h5" fontWeight={700}>Your cart is empty</Typography>
                <Button
                    onClick={() => navigate("/category")}
                    variant="contained"
                    sx={{
                        mt: 2,
                        bgcolor: designConfig.colors.primary.main,
                        borderRadius: designConfig.borderRadius.md,
                        "&:hover": { bgcolor: designConfig.colors.primary.dark }
                    }}
                >
                    Go to Store
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: designConfig.colors.surfaces.white, pb: 12 }}>
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
                            display: { xs: 'flex', md: 'none' }, // Only show on mobile to match Cart/Payouts style
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
                        Checkout
                    </Typography>
                </Box>
            </Box>

            <Container maxWidth="md" sx={{ mt: 3, px: 2 }}>
                <Stack spacing={2}>
                    {/* 1. Cart Items */}
                    <Box>
                        {cartItems.map((item) => (
                            <Paper
                                key={item.id}
                                elevation={0}
                                sx={{
                                    p: 2,
                                    borderRadius: designConfig.borderRadius.lg,
                                    border: `1px solid ${designConfig.colors.primary.main}`,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    mb: 2,
                                    bgcolor: designConfig.colors.surfaces.white
                                }}
                            >
                                <Box sx={{ width: 80, height: 80, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                </Box>
                                <Box flex={1}>
                                    <Typography variant="subtitle1" fontWeight={600} noWrap>{item.name}</Typography>
                                    <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                        <Typography variant="h6" fontWeight={700}>₹{item.price}</Typography>
                                        {item.bv && (
                                            <Typography variant="caption" sx={{ color: designConfig.colors.primary.main, bgcolor: designConfig.colors.success.background, px: 0.5, borderRadius: 1 }}>
                                                BV {item.bv}
                                            </Typography>
                                        )}
                                    </Box>

                                    <Box display="flex" alignItems="center" gap={2} mt={1}>
                                        <IconButton size="small" onClick={() => handleDecrease(item)} sx={{ border: `1px solid ${designConfig.colors.background.border}`, width: 32, height: 32, color: designConfig.colors.text.secondary }}>
                                            <KeyboardArrowDownIcon fontSize="small" />
                                        </IconButton>
                                        <Typography fontWeight={600}>{item.qty}</Typography>
                                        <IconButton size="small" onClick={() => handleIncrease(item)} sx={{ border: `1px solid ${designConfig.colors.background.border}`, width: 32, height: 32, color: designConfig.colors.text.secondary }}>
                                            <KeyboardArrowUpIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Paper>
                        ))}
                    </Box>

                    {/* 2. Use Coins */}
                    <Paper elevation={0} sx={{ p: 2, borderRadius: designConfig.borderRadius.lg, border: `1px solid ${designConfig.colors.primary.main}`, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: designConfig.colors.surfaces.white }}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Box sx={{ bgcolor: designConfig.colors.warning.background, p: 1, borderRadius: designConfig.borderRadius.md, color: designConfig.colors.warning.main }}><MonetizationOnIcon /></Box>
                            <Box>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                    <Typography fontWeight={700} variant="body1">Use Coins</Typography>
                                    <Tooltip
                                        title="Use reward coins for discount"
                                        open={coinTooltipOpen}
                                        arrow
                                        placement="top"
                                        componentsProps={{
                                            tooltip: { sx: { bgcolor: designConfig.colors.text.primary, fontSize: '0.85rem', py: 1, px: 1.5 } },
                                            arrow: { sx: { color: designConfig.colors.text.primary } }
                                        }}
                                    >
                                        <Box
                                            component="span"
                                            onClick={handleCoinTooltip}
                                            sx={{ display: 'flex', cursor: 'pointer', mt: 0.2 }}
                                        >
                                            <InfoOutlinedIcon sx={{ fontSize: 16, color: designConfig.colors.text.disabled }} />
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    {coinBalance.toLocaleString()} available • Save ₹{coinSavings}
                                </Typography>
                            </Box>
                        </Box>
                        <Switch checked={useCoins} onChange={(e) => setUseCoins(e.target.checked)} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: designConfig.colors.primary.main }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: designConfig.colors.primary.main } }} />
                    </Paper>

                    {/* 3. Repurchase Wallet */}
                    <Paper elevation={0} sx={{ p: 2, borderRadius: designConfig.borderRadius.lg, border: `1px solid ${designConfig.colors.primary.main}`, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: designConfig.colors.surfaces.white }}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Box sx={{ bgcolor: designConfig.colors.success.background, p: 1, borderRadius: designConfig.borderRadius.md, color: designConfig.colors.primary.main }}><AccountBalanceWalletIcon /></Box>
                            <Box>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                    <Typography fontWeight={700} variant="body1">Repurchase Wallet</Typography>
                                    <Tooltip
                                        title="10% of earnings kept for repurchase"
                                        open={walletTooltipOpen}
                                        arrow
                                        placement="top"
                                        componentsProps={{
                                            tooltip: { sx: { bgcolor: designConfig.colors.text.primary, fontSize: '0.85rem', py: 1, px: 1.5 } },
                                            arrow: { sx: { color: designConfig.colors.text.primary } }
                                        }}
                                    >
                                        <Box
                                            component="span"
                                            onClick={handleWalletTooltip}
                                            sx={{ display: 'flex', cursor: 'pointer', mt: 0.2 }}
                                        >
                                            <InfoOutlinedIcon sx={{ fontSize: 16, color: designConfig.colors.text.disabled }} />
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Typography variant="caption" color="text.secondary">₹{walletBalance} available • Use ₹{walletUsage}</Typography>
                            </Box>
                        </Box>
                        <Switch checked={useWallet} onChange={(e) => setUseWallet(e.target.checked)} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: designConfig.colors.primary.main }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: designConfig.colors.primary.main } }} />
                    </Paper>

                    {/* 4. Coupons - WORKING NOW */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: designConfig.borderRadius.lg,
                            border: `1px solid ${designConfig.colors.primary.main}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            bgcolor: appliedCoupon ? designConfig.colors.success.background : designConfig.colors.surfaces.white
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={2}>
                            <Box sx={{
                                bgcolor: appliedCoupon ? designConfig.colors.success.background : designConfig.colors.info.background,
                                p: 1,
                                borderRadius: designConfig.borderRadius.md,
                                color: appliedCoupon ? designConfig.colors.primary.main : designConfig.colors.info.main
                            }}>
                                <LocalOfferIcon />
                            </Box>
                            <Box>
                                <Typography fontWeight={700} variant="body1">
                                    {appliedCoupon ? `Coupon '${appliedCoupon.code}' Applied` : "Apply Coupon"}
                                </Typography>
                                <Typography variant="caption" color={appliedCoupon ? designConfig.colors.success.main : "text.secondary"} fontWeight={appliedCoupon ? 600 : 400}>
                                    {appliedCoupon ? `You saved ₹${appliedCoupon.discount}!` : "3 coupons available"}
                                </Typography>
                            </Box>
                        </Box>
                        {appliedCoupon ? (
                            <IconButton
                                size="small"
                                onClick={handleRemoveCoupon}
                                sx={{ color: designConfig.colors.error.main, border: `1px solid ${designConfig.colors.error.background}`, bgcolor: designConfig.colors.error.background }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        ) : (
                            <Button
                                variant="text"
                                onClick={() => setIsCouponDialogOpen(true)}
                                sx={{ color: designConfig.colors.info.main, fontWeight: 600, textTransform: 'none' }}
                            >
                                Apply
                            </Button>
                        )}
                    </Paper>

                    {/* 5. Price Summary */}
                    <Paper elevation={0} sx={{ p: 2, borderRadius: designConfig.borderRadius.lg, border: `1px solid ${designConfig.colors.primary.main}`, bgcolor: designConfig.colors.surfaces.white }}>
                        <Typography variant="subtitle1" fontWeight={700} color={designConfig.colors.primary.main} mb={2}>Price Summary</Typography>

                        <Stack spacing={1} mb={2}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">Subtotal ({cartItems.length} items)</Typography>
                                <Typography variant="body2" fontWeight={600}>₹{subtotal.toFixed(2)}</Typography>
                            </Box>
                            {/* Dynamic Coupon Display */}
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">Coupon Discount</Typography>
                                <Typography variant="body2" fontWeight={600} color={appliedCoupon ? designConfig.colors.primary.main : 'text.secondary'}>
                                    {appliedCoupon ? `-₹${appliedCoupon.discount.toFixed(2)}` : '₹0.00'}
                                </Typography>
                            </Box>
                            {useCoins && (
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2">Coins Used</Typography>
                                    <Typography variant="body2" fontWeight={600} color={designConfig.colors.primary.main}>-₹{coinSavings.toFixed(2)}</Typography>
                                </Box>
                            )}
                            {useWallet && (
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2">Wallet Used</Typography>
                                    <Typography variant="body2" fontWeight={600} color={designConfig.colors.primary.main}>-₹{walletUsage.toFixed(2)}</Typography>
                                </Box>
                            )}
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">Delivery Charge</Typography>
                                <Typography variant="body2" fontWeight={600}>₹{deliveryCharge.toFixed(2)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">Tax</Typography>
                                <Typography variant="body2" fontWeight={600}>₹{tax.toFixed(2)}</Typography>
                            </Box>
                        </Stack>

                        <Divider sx={{ my: 1.5 }} />

                        <Box display="flex" justifyContent="space-between" mb={2}>
                            <Typography variant="subtitle1" fontWeight={700} color={designConfig.colors.secondary.dark}>Total Amount</Typography>
                            <Typography variant="subtitle1" fontWeight={700} color={designConfig.colors.text.primary}>₹{totalAmount.toFixed(2)}</Typography>
                        </Box>

                        <Box sx={{ bgcolor: designConfig.colors.success.background, p: 1.5, borderRadius: designConfig.borderRadius.sm, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <InfoOutlinedIcon sx={{ color: designConfig.colors.primary.main, fontSize: 20 }} />
                            <Typography variant="body2" color={designConfig.colors.primary.main} fontWeight={500}>
                                Total BV: {totalBV} points
                            </Typography>
                        </Box>
                    </Paper>

                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleProceed}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            mt: 2,
                            py: 1.8,
                            bgcolor: designConfig.colors.primary.main,
                            borderRadius: designConfig.borderRadius.md,
                            fontWeight: 700,
                            fontSize: '1rem',
                            textTransform: 'none',
                            boxShadow: designConfig.shadows.primary,
                            "&:hover": { bgcolor: designConfig.colors.primary.dark }
                        }}
                    >
                        Proceed to Checkout
                    </Button>
                </Stack>
            </Container>

            {/* Coupon Dialog */}
            <Dialog
                open={isCouponDialogOpen}
                onClose={() => setIsCouponDialogOpen(false)}
                fullWidth
                maxWidth="xs"
                PaperProps={{
                    sx: {
                        borderRadius: designConfig.borderRadius.lg,
                        p: 2,
                        textAlign: "center",
                        bgcolor: designConfig.colors.surfaces.white
                    }
                }}
            >
                <DialogContent sx={{ p: 1 }}> {/* Reduced padding as Paper handles it */}
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: alpha(designConfig.colors.warning.main, 0.15),
                            borderRadius: designConfig.borderRadius.full,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2
                        }}
                    >
                        <LocalOfferIcon sx={{ fontSize: 32, color: designConfig.colors.warning.main }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        Apply Coupon
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Enter or select a coupon to get discounts
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="Enter Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        error={!!couponError}
                        helperText={couponError}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LocalOfferIcon color="action" />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: designConfig.borderRadius.md, bgcolor: designConfig.colors.background.light, '& fieldset': { border: 'none' } }
                        }}
                    />

                    <Typography variant="subtitle2" fontWeight={700} mt={3} mb={1.5} align="left" color="text.secondary">
                        Available Coupons
                    </Typography>

                    <Stack spacing={1.5} mb={3}>
                        {[
                            { code: "SAVE50", desc: "Save ₹50 on orders above ₹200", color: designConfig.colors.success.background, text: designConfig.colors.success.main },
                            { code: "WELCOME20", desc: "Get ₹20 off on your first order", color: designConfig.colors.warning.background, text: designConfig.colors.warning.dark },
                            { code: "FESTIVE10", desc: "Flat ₹10 off on all orders", color: designConfig.colors.info.background, text: designConfig.colors.info.main }
                        ].map((coupon) => (
                            <Paper
                                key={coupon.code}
                                elevation={0}
                                onClick={() => {
                                    setCouponCode(coupon.code);
                                    setCouponError("");
                                }}
                                sx={{
                                    p: 1.5,
                                    borderRadius: designConfig.borderRadius.md,
                                    border: `1px dashed ${designConfig.colors.background.border}`,
                                    bgcolor: coupon.color,
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    transition: designConfig.transitions.default,
                                    textAlign: 'left',
                                    "&:hover": { borderColor: designConfig.colors.primary.main, transform: "scale(1.01)" }
                                }}
                            >
                                <Box>
                                    <Typography variant="subtitle2" fontWeight={800} color={coupon.text} sx={{ letterSpacing: 0.5 }}>
                                        {coupon.code}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                        {coupon.desc}
                                    </Typography>
                                </Box>
                                <Button
                                    size="small"
                                    sx={{
                                        minWidth: 'auto',
                                        color: coupon.text,
                                        fontWeight: 700,
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    APPLY
                                </Button>
                            </Paper>
                        ))}
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            onClick={() => setIsCouponDialogOpen(false)}
                            sx={{ color: designConfig.colors.text.secondary, fontWeight: 600, textTransform: 'none', borderRadius: designConfig.borderRadius.sm }}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleApplyCoupon}
                            sx={{
                                bgcolor: designConfig.colors.primary.main,
                                borderRadius: designConfig.borderRadius.sm,
                                fontWeight: 700,
                                textTransform: 'none',
                                "&:hover": { bgcolor: designConfig.colors.primary.dark }
                            }}
                        >
                            Apply
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Checkout;
