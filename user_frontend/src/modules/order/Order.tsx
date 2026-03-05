
import { Box, Typography, Container, Paper, Stack, Button, IconButton, Divider, Tab, Tabs } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'; // Using generic box icon for "Order Received"
import { useState } from "react";
import { designConfig } from "../../config/designConfig";

const Order = () => {
    const orders = useAppSelector((state: any) => state.order.orders) || [];
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);

    // Filter orders
    const activeOrders = orders.filter((o: any) =>
        !['Delivered', 'Cancelled'].includes(o.status || '')
    );
    const completedOrders = orders.filter((o: any) =>
        ['Delivered'].includes(o.status || '')
    );

    const currentOrders = tabValue === 0 ? activeOrders : completedOrders;

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#fff", pb: 10 }}>
            {/* Sticky Header Section (Header + Tabs) */}
            <Box sx={{
                position: "sticky",
                top: 0,
                zIndex: 1100,
                bgcolor: "#fff",
            }}>
                {/* Custom Header - Matched to Category Page */}
                <Box sx={{
                    bgcolor: '#fff',
                    width: '100%',
                    px: 2,
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    // Match PageHeader style
                    boxShadow: "0 4px 6px -4px rgba(0,0,0,0.05)",
                    borderBottom: `1px solid ${designConfig.colors.background.border}`
                }}>
                    <IconButton
                        onClick={() => navigate('/home')}
                        sx={{
                            display: { xs: 'flex', md: 'none' }, // Only show on mobile
                            color: designConfig.colors.primary.main,
                            bgcolor: designConfig.colors.background.paper,
                            '&:hover': { bgcolor: designConfig.colors.background.border },
                            width: 40,
                            height: 40,
                            borderRadius: designConfig.borderRadius.md,
                            boxShadow: designConfig.shadows.sm
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
                        My Orders
                    </Typography>
                </Box>

                {/* Custom Tabs - Inside the sticky block */}
                <Box sx={{ pb: 0, bgcolor: "#fff" }}>
                    <Container maxWidth={false} sx={{ px: 0 }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            TabIndicatorProps={{ style: { backgroundColor: designConfig.colors.primary.main, height: 3 } }}
                            sx={{ borderBottom: '1px solid #f0f0f0' }}
                        >
                            <Tab
                                label={`Active (${activeOrders.length})`}
                                disableRipple
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    minHeight: 48,
                                    color: tabValue === 0 ? designConfig.colors.primary.main : '#757575',
                                    '&.Mui-selected': { color: designConfig.colors.primary.main },
                                }}
                            />
                            <Tab
                                label={`Completed (${completedOrders.length})`}
                                disableRipple
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    minHeight: 48,
                                    color: tabValue === 1 ? designConfig.colors.primary.main : '#757575',
                                    '&.Mui-selected': { color: designConfig.colors.primary.main },
                                }}
                            />
                        </Tabs>
                    </Container>
                </Box>
            </Box>

            {/* Scrollable Orders List */}
            <Container maxWidth={false} sx={{ px: 2, mt: 1 }}>
                <Stack spacing={2}>
                    {currentOrders.length > 0 ? (
                        currentOrders.map((order: any) => (
                            <Paper
                                key={order.id}
                                elevation={0}
                                onClick={() => navigate(`/order-tracking/${order.id}`)}
                                sx={{
                                    borderRadius: "16px",
                                    border: "1px solid #e0e0e0",
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        borderColor: designConfig.colors.primary.main,
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                                    }
                                }}
                            >
                                {/* Order Header */}
                                <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box display="flex" gap={2} alignItems="center">
                                        <Box sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            bgcolor: order.status === 'Cancelled' ? designConfig.colors.error.background : designConfig.colors.success.background, // Red for Cancelled, Green for others 
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: order.status === 'Cancelled' ? designConfig.colors.error.main : designConfig.colors.success.main
                                        }}>
                                            <Inventory2OutlinedIcon fontSize="small" />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                {order.status === 'Cancelled' ? 'Order Cancelled' : (order.status === 'Delivered' ? 'Order Delivered' : 'Order Received')}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="caption" fontWeight={600} sx={{ color: designConfig.colors.success.main }}>
                                        #{order.id.replace('ORD-', '#ORD')}
                                    </Typography>
                                </Box>

                                {/* Order Items Preview (Taking first item) */}
                                <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                                    {/* Product Image */}
                                    <Box sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: '12px',
                                        bgcolor: '#f5f5f5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}>
                                        {order.items[0]?.image ? (
                                            <img src={order.items[0].image} alt={order.items[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <Inventory2OutlinedIcon sx={{ color: '#bdbdbd' }} />
                                        )}
                                    </Box>

                                    {/* Product Details */}
                                    <Box flex={1}>
                                        <Typography variant="subtitle2" fontWeight={600} noWrap>
                                            {order.items[0]?.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            Qty: {order.items[0]?.qty} {order.items.length > 1 && `+ ${order.items.length - 1} more`}
                                        </Typography>
                                    </Box>

                                    {/* Total Price */}
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        Total: ₹{order.total}
                                    </Typography>
                                </Box>

                                <Divider />

                                {/* Action Buttons - Only for Active Orders */}
                                {tabValue === 0 && (
                                    <Box sx={{ p: 2 }}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent card click
                                                navigate(`/order-tracking/${order.id}`);
                                            }}
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                borderRadius: '8px',
                                                bgcolor: designConfig.colors.primary.main,
                                                boxShadow: 'none',
                                                '&:hover': { bgcolor: designConfig.colors.primary.dark, boxShadow: 'none' }
                                            }}
                                        >
                                            Track
                                        </Button>
                                    </Box>
                                )}


                            </Paper>
                        ))
                    ) : (
                        <Box textAlign="center" py={5}>
                            <Typography variant="body1" color="text.secondary">
                                No {tabValue === 0 ? 'active' : 'completed'} orders found.
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </Container>
        </Box >
    );
};

export default Order;
