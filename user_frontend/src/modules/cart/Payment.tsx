import {
    Box,
    Typography,
    Paper,
    Button,
    Container,
    Stack,
    IconButton,
    Divider,
    TextField,
    InputAdornment,
    Collapse,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments'; // For COD
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // For UPI
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import designConfig, { alpha } from "../../config/designConfig";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { placeOrder, type Order } from "../../redux/slice/orderSlice";
import { clearCart } from "../../redux/slice/cartSlice";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    // Address State
    const [address, setAddress] = useState<any>(null); // Start with null

    useEffect(() => {
        // 1. Check if an address was passed via navigation
        if (location.state?.selectedAddress) {
            setAddress(location.state.selectedAddress);
        } else {
            // 2. Check local storage
            const saved = localStorage.getItem('savedAddresses');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.length > 0) {
                    // Use default or first
                    const def = parsed.find((a: any) => a.isDefault);
                    setAddress(def || parsed[0]);
                }
            }
        }
    }, [location.state]);

    // Payment Method State
    const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
    const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

    // UPI State
    const [upiId, setUpiId] = useState("");

    // Card State
    const [hasSavedCard, setHasSavedCard] = useState(true); // Simulate existing user
    const [isEditingCard, setIsEditingCard] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        number: "4532 7543 2345 2512",
        holder: "Soumya Ranjan",
        expiry: "09/28",
        cvv: "123"
    });

    // Mock Calculation
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const couponDiscount = 34.00;
    const bvCoins = 100.00;
    const deliveryCharge = shippingMethod === 'express' ? 99 : 5.99;
    const tax = 10.20;
    const totalPayable = subtotal - couponDiscount - bvCoins + deliveryCharge + tax;

    const handleSaveCard = () => {
        setHasSavedCard(true);
        setIsEditingCard(false);
    };

    const handleEditCard = () => {
        setIsEditingCard(true);
    };

    const handlePayment = () => {
        if (!address) {
            alert('Please select a delivery address');
            return;
        }

        const newOrder: Order = {
            id: `ORD-2025-${Math.floor(10000 + Math.random() * 90000)}`,
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                image: item.image,
                category: item.category || 'General',
                stock: 'In Stock'
            })),
            total: totalPayable,
            date: new Date().toISOString(),
            deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // +3 days
            status: "Processing",
            paymentMethod: paymentMethod,
            shippingAddress: {
                fullName: address.fullName,
                address: address.addressLine,
                city: address.city,
                zipCode: address.pincode,
            }
        };

        // Add a temp property for runtime display if needed
        (newOrder.shippingAddress as any).addressType = address.type;

        dispatch(placeOrder(newOrder));
        dispatch(clearCart());
        navigate('/order-success', { state: { order: newOrder } });
    };

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
                            display: { xs: 'flex', md: 'none' }, // Only show on mobile to match Cart/Payouts/Checkout style
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
                        Payment
                    </Typography>
                </Box>
            </Box>

            <Container maxWidth="md" sx={{ mt: 2, px: 2 }}>
                <Stack spacing={3}>

                    {/* Delivery Address (Kept as is for context) */}
                    <Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="subtitle1" fontWeight={700} color={designConfig.colors.primary.main}>
                                Delivery Address
                            </Typography>
                            <Typography variant="body2" fontWeight={600}
                                onClick={() => navigate('/address-selection', { state: { currentAddressId: address?.id } })}
                                sx={{ color: designConfig.colors.primary.main, cursor: 'pointer', textDecoration: 'underline' }}>
                                Change
                            </Typography>
                        </Box>

                        {address ? (
                            <Box display="flex" gap={2} alignItems="flex-start">
                                <Box sx={{ color: designConfig.colors.text.disabled, mt: 0.5 }}><LocationOnOutlinedIcon /></Box>
                                <Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography variant="subtitle2" fontWeight={700}>{address.fullName}</Typography>
                                        <Box sx={{
                                            bgcolor: designConfig.colors.success.background,
                                            color: designConfig.colors.primary.main,
                                            px: 1,
                                            borderRadius: '4px',
                                            fontSize: '0.7rem',
                                            fontWeight: 600,
                                            border: `1px solid ${designConfig.colors.primary.main}`
                                        }}>
                                            {address.type}
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                        {address.addressLine}, {address.city}, {address.state} - {address.pincode}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        +91 {address.phoneNumber}
                                    </Typography>
                                </Box>
                            </Box>
                        ) : (
                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<AddIcon />}
                                onClick={() => navigate('/address-selection')}
                                sx={{
                                    py: 2,
                                    borderStyle: 'dashed',
                                    borderColor: designConfig.colors.primary.main,
                                    color: designConfig.colors.primary.main,
                                    borderRadius: designConfig.borderRadius.md
                                }}
                            >
                                Add Delivery Address
                            </Button>
                        )}
                        <Divider sx={{ mt: 2 }} />
                    </Box>

                    {/* Shipping Options */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={700} color={designConfig.colors.primary.main} mb={2}>
                            Shipping Options
                        </Typography>
                        <Stack spacing={2}>
                            <Paper
                                elevation={0}
                                onClick={() => setShippingMethod('standard')}
                                sx={{
                                    p: 2,
                                    borderRadius: designConfig.borderRadius.lg,
                                    border: `1px solid ${shippingMethod === 'standard' ? designConfig.colors.primary.main : designConfig.colors.background.border}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: 'pointer',
                                    bgcolor: shippingMethod === 'standard' ? designConfig.colors.success.background : 'transparent'
                                }}
                            >
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Box sx={{ bgcolor: designConfig.colors.success.background, p: 1, borderRadius: designConfig.borderRadius.sm, color: designConfig.colors.primary.main }}>
                                        <LocalShippingOutlinedIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={700}>Standard Delivery</Typography>
                                        <Typography variant="caption" color="text.secondary">3-5 Business days</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" fontWeight={700}>FREE</Typography>
                            </Paper>

                            <Paper
                                elevation={0}
                                onClick={() => setShippingMethod('express')}
                                sx={{
                                    p: 2,
                                    borderRadius: designConfig.borderRadius.lg,
                                    border: `1px solid ${shippingMethod === 'express' ? designConfig.colors.primary.main : designConfig.colors.background.border}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: 'pointer',
                                    bgcolor: shippingMethod === 'express' ? designConfig.colors.success.background : 'transparent'
                                }}
                            >
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Box sx={{ bgcolor: designConfig.colors.success.background, p: 1, borderRadius: designConfig.borderRadius.sm, color: designConfig.colors.primary.main }}>
                                        <DirectionsCarFilledOutlinedIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={700}>Express Delivery</Typography>
                                        <Typography variant="caption" color="text.secondary">1-2 business days</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" fontWeight={700}>₹99</Typography>
                            </Paper>
                        </Stack>
                    </Box>

                    {/* Payment Method - ENHANCED */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={700} color={designConfig.colors.primary.main} mb={2}>
                            Payment Method
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 2 }}>
                            {[
                                { id: 'upi', label: 'UPI', icon: <AccountBalanceWalletIcon /> },
                                { id: 'card', label: 'Card', icon: <CreditCardIcon /> },
                                { id: 'cod', label: 'COD', icon: <PaymentsIcon /> },
                            ].map((method) => (
                                <Button
                                    key={method.id}
                                    variant={paymentMethod === method.id ? 'contained' : 'outlined'}
                                    onClick={() => setPaymentMethod(method.id as any)}
                                    startIcon={method.icon}
                                    sx={{
                                        flex: 1,
                                        minWidth: 100,
                                        borderRadius: designConfig.borderRadius.md,
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        bgcolor: paymentMethod === method.id ? designConfig.colors.primary.main : 'transparent',
                                        borderColor: paymentMethod === method.id ? 'transparent' : designConfig.colors.background.border,
                                        color: paymentMethod === method.id ? designConfig.colors.primary.contrastText : designConfig.colors.text.primary,
                                        boxShadow: paymentMethod === method.id ? designConfig.shadows.primary : 'none',
                                        "&:hover": {
                                            bgcolor: paymentMethod === method.id ? designConfig.colors.primary.dark : designConfig.colors.background.light,
                                            borderColor: paymentMethod === method.id ? 'transparent' : alpha(designConfig.colors.background.border, 0.8),
                                        }
                                    }}
                                >
                                    {method.label}
                                </Button>
                            ))}
                        </Stack>

                        {/* 1. UPI Section */}
                        <Collapse in={paymentMethod === 'upi'}>
                            <Paper elevation={0} sx={{ p: 2, borderRadius: designConfig.borderRadius.md, border: `1px solid ${designConfig.colors.background.border}`, bgcolor: designConfig.colors.background.light }}>
                                <Typography variant="subtitle2" fontWeight={700} mb={1}>Enter UPI ID</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="example@upi"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button size="small" sx={{ textTransform: 'none', fontWeight: 600, color: designConfig.colors.primary.main }}>
                                                    Verify
                                                </Button>
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: designConfig.borderRadius.md, bgcolor: designConfig.colors.surfaces.white }
                                    }}
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                    Google Pay, PhonePe, Paytm, etc.
                                </Typography>
                            </Paper>
                        </Collapse>

                        {/* 2. Card Section */}
                        <Collapse in={paymentMethod === 'card'}>
                            <Paper elevation={0} sx={{ p: 2, borderRadius: designConfig.borderRadius.md, border: `1px solid ${designConfig.colors.background.border}`, bgcolor: designConfig.colors.background.light }}>
                                {!hasSavedCard || isEditingCard ? (
                                    // Add/Edit Card Form
                                    <Stack spacing={2}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                {hasSavedCard ? "Edit Card Details" : "Add New Card"}
                                            </Typography>
                                            {hasSavedCard && (
                                                <Button size="small" onClick={() => setIsEditingCard(false)} sx={{ color: designConfig.colors.text.secondary }}>Cancel</Button>
                                            )}
                                        </Box>

                                        <TextField
                                            label="Card Number"
                                            fullWidth
                                            value={cardDetails.number}
                                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                            InputProps={{ sx: { borderRadius: designConfig.borderRadius.md, bgcolor: designConfig.colors.surfaces.white } }}
                                        />
                                        <TextField
                                            label="Card Holder Name"
                                            fullWidth
                                            value={cardDetails.holder}
                                            onChange={(e) => setCardDetails({ ...cardDetails, holder: e.target.value })}
                                            InputProps={{ sx: { borderRadius: designConfig.borderRadius.md, bgcolor: designConfig.colors.surfaces.white } }}
                                        />
                                        <Stack direction="row" spacing={2}>
                                            <Box flex={1}>
                                                <TextField
                                                    label="Expiry (MM/YY)"
                                                    fullWidth
                                                    value={cardDetails.expiry}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                    InputProps={{ sx: { borderRadius: designConfig.borderRadius.md, bgcolor: designConfig.colors.surfaces.white } }}
                                                />
                                            </Box>
                                            <Box flex={1}>
                                                <TextField
                                                    label="CVV"
                                                    type="password"
                                                    fullWidth
                                                    value={cardDetails.cvv}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                    InputProps={{ sx: { borderRadius: designConfig.borderRadius.md, bgcolor: designConfig.colors.surfaces.white } }}
                                                />
                                            </Box>
                                        </Stack>
                                        <Button
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            onClick={handleSaveCard}
                                            sx={{
                                                bgcolor: designConfig.colors.primary.main,
                                                color: designConfig.colors.primary.contrastText,
                                                borderRadius: designConfig.borderRadius.md,
                                                textTransform: 'none',
                                                fontWeight: 700,
                                                boxShadow: 'none',
                                                mt: 1,
                                                "&:hover": { bgcolor: designConfig.colors.primary.dark }
                                            }}
                                        >
                                            Save Card
                                        </Button>
                                    </Stack>
                                ) : (
                                    // Saved Card Preview
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Box sx={{
                                                bgcolor: designConfig.colors.surfaces.white,
                                                border: `1px solid ${designConfig.colors.background.border}`,
                                                borderRadius: designConfig.borderRadius.sm,
                                                p: 1,
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                <Typography fontWeight={800} sx={{ fontStyle: 'italic', color: designConfig.colors.primary.dark }}>VISA</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">HDFC Bank Credit Card</Typography>
                                                <Typography variant="subtitle2" fontWeight={700}>**** **** **** {cardDetails.number.slice(-4)}</Typography>
                                            </Box>
                                        </Box>
                                        <IconButton onClick={handleEditCard} sx={{ color: designConfig.colors.primary.main }}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </Box>
                                )}
                            </Paper>
                        </Collapse>

                        {/* 3. COD Section */}
                        <Collapse in={paymentMethod === 'cod'}>
                            <Paper elevation={0} sx={{ p: 2, borderRadius: designConfig.borderRadius.md, border: `1px solid ${designConfig.colors.background.border}`, bgcolor: designConfig.colors.background.light }}>
                                <Box display="flex" alignItems="center" gap={1.5}>
                                    <VerifiedUserIcon sx={{ color: designConfig.colors.success.main }} />
                                    <Typography variant="body2" fontWeight={600}>
                                        Cash on Delivery available for this location.
                                    </Typography>
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, ml: 4.5 }}>
                                    Pay ₹{Math.round(totalPayable)} cash to the delivery agent.
                                </Typography>
                            </Paper>
                        </Collapse>
                    </Box>

                    {/* Order Summary */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: designConfig.borderRadius.lg,
                            border: `1px solid ${designConfig.colors.primary.main}`,
                            bgcolor: designConfig.colors.surfaces.white
                        }}
                    >
                        <Stack spacing={1} mb={1}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" fontWeight={500}>Subtotal ({cartItems.length} items)</Typography>
                                <Typography variant="body2" fontWeight={700}>₹{subtotal.toFixed(2)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" fontWeight={500}>Delivery Charge</Typography>
                                <Typography variant="body2" fontWeight={700}>₹{deliveryCharge.toFixed(2)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" fontWeight={500}>Tax</Typography>
                                <Typography variant="body2" fontWeight={700}>₹{tax.toFixed(2)}</Typography>
                            </Box>
                        </Stack>

                        <Divider sx={{ my: 1.5 }} />

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1" fontWeight={700} color={designConfig.colors.secondary.dark}>Total Payable</Typography>
                            <Typography variant="subtitle1" fontWeight={700} color={designConfig.colors.text.primary}>₹{totalPayable.toFixed(2)}</Typography>
                        </Box>
                    </Paper>

                    {/* Pay Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            py: 1.8,
                            bgcolor: designConfig.colors.primary.main,
                            borderRadius: designConfig.borderRadius.md,
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            textTransform: 'none',
                            boxShadow: designConfig.shadows.primary,
                            "&:hover": { bgcolor: designConfig.colors.primary.dark }
                        }}
                        onClick={handlePayment}
                    >
                        Pay ₹{Math.round(totalPayable)}
                    </Button>
                </Stack>
            </Container>
        </Box >
    );
};

export default Payment;
