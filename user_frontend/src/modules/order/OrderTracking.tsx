import { useRef, useState } from 'react';
import { Box, Typography, Container, Paper, Stack, Button, IconButton, Divider, Avatar, Dialog, DialogContent } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CallIcon from '@mui/icons-material/Call';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { designConfig } from "../../config/designConfig";
import { useAppSelector } from "../../redux/hooks";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Invoice from '../../components/common/Invoice';

// ... (getTimelineSteps function remains unchanged) ...
const getTimelineSteps = (status: string, date: string, deliveryDate: string) => {
    const steps = [
        { label: "Packing", date: date, status: "pending" },
        { label: "Picked", date: "", status: "pending" },
        { label: "In Transit", date: "", status: "pending" },
        { label: "Delivered", date: deliveryDate, status: "pending" },
    ];

    if (status === 'Delivered') {
        return steps.map(s => ({ ...s, status: 'completed' }));
    } else if (status === 'In Transit') {
        steps[0].status = 'completed';
        steps[1].status = 'completed';
        steps[2].status = 'active';
    } else if (status === 'Processing') {
        // Processing means packing is happening, not yet picked
        steps[0].status = 'active';
        steps[1].status = 'pending';
    } else if (status === 'Picked') {
        // Explicit Picked status if needed
        steps[0].status = 'completed';
        steps[1].status = 'completed'; // or active if picked is happening
    } else {
        // Default
        steps[0].status = 'active';
    }
    return steps;
};

const OrderTracking = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const orders = useAppSelector((state: any) => state.order.orders);
    const validOrders = orders || [];
    const order = validOrders.find((o: any) => o.id === id) || location.state?.order;

    // Invoice State
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [showInvoice, setShowInvoice] = useState(false);
    const [generatingPdf, setGeneratingPdf] = useState(false);

    const handleDownloadInvoice = async () => {
        setGeneratingPdf(true);
        setShowInvoice(true);

        // Wait for render/prop change
        setTimeout(async () => {
            if (invoiceRef.current) {
                try {
                    const capture = async (id: string, scale = 2) => {
                        const el = document.getElementById(id);
                        if (!el) return null;
                        return await html2canvas(el, {
                            scale,
                            useCORS: true,
                            backgroundColor: '#ffffff',
                            logging: false
                        });
                    };

                    const headerCanvas = await capture('invoice-header');
                    const footerCanvas = await capture('invoice-footer');
                    // Capture ONLY the body
                    const bodyCanvas = await capture('invoice-body-content', 3);

                    if (!headerCanvas || !footerCanvas || !bodyCanvas) {
                        setGeneratingPdf(false);
                        return;
                    }

                    const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4', compress: true });
                    const pageWidth = 210;
                    const pageHeight = 297;
                    const imgWidth = pageWidth;

                    const getH = (c: HTMLCanvasElement) => (c.height * pageWidth) / c.width;
                    const hHeader = getH(headerCanvas);
                    const hFooter = getH(footerCanvas);
                    const hBody = getH(bodyCanvas);

                    const bodyImg = bodyCanvas.toDataURL('image/jpeg', 0.95);
                    const headerImg = headerCanvas.toDataURL('image/jpeg', 0.9);
                    const footerImg = footerCanvas.toDataURL('image/jpeg', 0.9);

                    const usableHeight = pageHeight - hHeader - hFooter;
                    let heightLeft = hBody;
                    let position = 0;
                    let pg = 1;

                    while (heightLeft > 0) {
                        if (pg > 1) pdf.addPage();

                        pdf.setFillColor(255, 255, 255);
                        pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                        pdf.addImage(bodyImg, 'JPEG', 0, position + hHeader, imgWidth, hBody, undefined, 'FAST');

                        // Header Overlay
                        pdf.rect(0, 0, pageWidth, hHeader, 'F');
                        pdf.addImage(headerImg, 'JPEG', 0, 0, imgWidth, hHeader, undefined, 'FAST');

                        // Footer Overlay
                        pdf.rect(0, pageHeight - hFooter, pageWidth, hFooter, 'F');
                        pdf.addImage(footerImg, 'JPEG', 0, pageHeight - hFooter, imgWidth, hFooter, undefined, 'FAST');

                        heightLeft -= usableHeight;
                        position -= usableHeight;
                        pg++;
                        if (pg > 20) break;
                    }

                    pdf.save(`Invoice_${order.id}.pdf`);
                    setGeneratingPdf(false);
                } catch (error) {
                    console.error("PDF Tracking Error", error);
                    setGeneratingPdf(false);
                }
            }
        }, 400);
    };

    if (!order) {
        return <Box p={4}>Order not found</Box>;
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#fff", pb: 10 }}>
            {/* Custom Header - Matches My Orders page */}
            <Paper elevation={0} sx={{
                p: 2,
                px: 2,
                display: "flex",
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 1100,
                bgcolor: "#fff",
                borderBottom: "1px solid #f0f0f0",
                height: 64
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
                        boxShadow: "0 2px 8px rgba(77, 213, 28, 0.3)"
                    }}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <Typography variant="h6" fontWeight={700} sx={{ flex: 1, textAlign: "center", mr: 5, fontSize: "1.1rem" }}>
                    My Orders
                </Typography>
            </Paper>

            <Container maxWidth="md" sx={{ mt: 2, px: 2 }}>

                {/* Order Summary Card */}
                <Paper elevation={0} sx={{
                    borderRadius: "16px",
                    border: "1px solid #e0e0e0",
                    mb: 3,
                    overflow: 'hidden'
                }}>
                    <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box display="flex" gap={2} alignItems="center">
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: '#e3f2fd',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#1976d2'
                            }}>
                                <Inventory2OutlinedIcon fontSize="small" />
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" fontWeight={700}>Order Received</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="caption" fontWeight={600} sx={{ color: '#4caf50' }}>
                            #{order.id.replace('ORD-', '')}
                        </Typography>
                    </Box>

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
                        <Box flex={1}>
                            <Typography variant="subtitle2" fontWeight={600} noWrap>{order.items[0]?.name}</Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                                Qty: {order.items[0]?.qty}
                            </Typography>
                        </Box>
                        <Typography variant="subtitle2" fontWeight={700}>Total: ₹{order.total}</Typography>
                    </Box>
                </Paper>

                {/* Tracking Status Timeline */}
                <Typography variant="subtitle1" fontWeight={700} mb={2}>Order Status</Typography>
                <Box mb={4} pl={1}>
                    {getTimelineSteps(order.status, order.date, order.deliveryDate).map((step, index, array) => (
                        <Box key={index} display="flex" minHeight={60} position="relative">
                            {/* Line connecting dots */}
                            {index !== array.length - 1 && (
                                <Box sx={{
                                    position: 'absolute',
                                    left: 11, // half of dot width (22/2)
                                    top: 24,
                                    bottom: 0,
                                    width: '2px',
                                    bgcolor: step.status === 'completed' ? designConfig.colors.primary.main : '#e0e0e0',
                                    backgroundImage: step.status === 'completed' ? 'none' : 'linear-gradient(to bottom, #bdbdbd 50%, transparent 50%)',
                                    backgroundSize: '2px 8px', // dashed effect for future
                                    backgroundRepeat: 'repeat-y'
                                }} />
                            )}

                            {/* Dot */}
                            <Box sx={{ mr: 2, pt: 0.5 }}>
                                {step.status === 'completed' || step.status === 'active' ? (
                                    <Box sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        border: `2px solid ${designConfig.colors.primary.main}`,
                                        p: 0.3, // space between ring and inner dot
                                    }}>
                                        <Box sx={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            bgcolor: designConfig.colors.primary.main
                                        }} />
                                    </Box>
                                ) : (
                                    <Box sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        border: `2px solid #bdbdbd`,
                                    }} />
                                )}
                            </Box>

                            {/* Content */}
                            <Box pb={2}>
                                <Typography variant="subtitle2" fontWeight={step.status === 'active' || step.status === 'completed' ? 700 : 500}
                                    color={step.status === 'active' || step.status === 'completed' ? designConfig.colors.primary.main : 'text.secondary'}>
                                    {step.label}
                                </Typography>
                                {step.date && (
                                    <Typography variant="caption" color="text.secondary">
                                        {step.date}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Delivery Guy Info - Only show if Active (not delivered) */}
                {order.status !== 'Delivered' && (
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Avatar
                                src="https://img.freepik.com/free-photo/young-delivery-man-red-uniform-holding-box_144627-30351.jpg" // Mock Image
                                sx={{ width: 48, height: 48 }}
                            />
                            <Box>
                                <Typography variant="subtitle2" fontWeight={700}>Raj Sharma</Typography>
                                <Typography variant="caption" color="text.secondary">Delivery Guy</Typography>
                            </Box>
                        </Box>
                        <IconButton sx={{ bgcolor: '#eee', '&:hover': { bgcolor: '#e0e0e0' } }}>
                            <CallIcon color="action" />
                        </IconButton>
                    </Box>
                )}

                <Typography variant="subtitle1" fontWeight={700} mb={2}>Delivery Address</Typography>

                {/* Address Card */}
                <Paper elevation={0} sx={{
                    p: 2,
                    borderRadius: "16px",
                    border: `1px solid ${designConfig.colors.primary.main}`, // Green border as per screenshot
                    mb: 3,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2
                }}>
                    <Box sx={{
                        bgcolor: '#f1f8e9', // Light green bg
                        p: 1,
                        borderRadius: '8px',
                        color: designConfig.colors.primary.main
                    }}>
                        <LocationOnOutlinedIcon />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" fontWeight={700}>{order.shippingAddress?.fullName || 'Rajesh Kumar'}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, lineHeight: 1.5 }}>
                            {order.shippingAddress?.address || '123, MG Road, Bangalore, Karnataka - 560001'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mt: 0.5, display: 'block' }}>
                            +91 98765 43210
                        </Typography>
                    </Box>
                </Paper>

                {/* Price Summary Card - New Addition */}
                <Paper elevation={0} sx={{
                    borderRadius: "16px",
                    border: `1px solid ${designConfig.colors.primary.main}`,
                    mb: 4,
                    overflow: 'hidden'
                }}>
                    <Box sx={{ bgcolor: '#f1f8e9', px: 2, py: 1, borderBottom: `1px solid ${designConfig.colors.primary.light}` }}>
                        <Typography variant="subtitle2" fontWeight={700} color={designConfig.colors.primary.main}>
                            Price Summary
                        </Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="body2" color="text.secondary">Subtotal ({order.items.length} items)</Typography>
                            <Typography variant="body2" fontWeight={600}>₹{order.total}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="body2" color="text.secondary">Coupon Discount</Typography>
                            <Typography variant="body2" fontWeight={600} color={designConfig.colors.primary.main}>-₹0.00</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="body2" color="text.secondary">BV Coins</Typography>
                            <Typography variant="body2" fontWeight={600} color={designConfig.colors.primary.main}>-₹0</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="body2" color="text.secondary">Delivery Charge</Typography>
                            <Typography variant="body2" fontWeight={600}>₹40.00</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mb={2}>
                            <Typography variant="body2" color="text.secondary">Tax</Typography>
                            <Typography variant="body2" fontWeight={600}>₹10.00</Typography>
                        </Box>

                        <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

                        <Box display="flex" justifyContent="space-between" mt={1}>
                            <Typography variant="subtitle1" fontWeight={700}>Total Payable</Typography>
                            <Typography variant="subtitle1" fontWeight={700}>₹{(order.total + 50).toFixed(2)}</Typography>
                        </Box>
                    </Box>
                </Paper>

                {/* Bottom Actions */}
                <Stack spacing={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleDownloadInvoice}
                        sx={{
                            borderRadius: '12px',
                            py: 1.5,
                            bgcolor: designConfig.colors.primary.main, // Green Color
                            fontWeight: 700,
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': { bgcolor: designConfig.colors.primary.dark },
                            boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                        }}
                    >
                        Download Invoice
                    </Button>


                </Stack>

            </Container>

            {/* Invoice Dialog */}
            <Dialog
                open={showInvoice}
                onClose={() => setShowInvoice(false)}
                maxWidth="md" // Increased for 800px invoice
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        p: { xs: 1, md: 3 },
                        textAlign: "center"
                    }
                }}
            >
                <DialogContent>
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: "#e3f2fd", // Light Blue
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2
                        }}
                    >
                        <DescriptionOutlinedIcon sx={{ fontSize: 32, color: "#1976d2" }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        Tax Invoice
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Order #{order.id}
                    </Typography>

                    <Box sx={{ p: 2, bgcolor: "#f8f9fa", borderRadius: 2, mb: 3, overflowX: 'auto', border: '1px dashed #e0e0e0' }}>
                        <Invoice order={order} ref={invoiceRef} isPdf={generatingPdf} />
                    </Box>

                    <Stack spacing={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleDownloadInvoice}
                            sx={{
                                bgcolor: designConfig.colors.primary.main,
                                borderRadius: 2,
                                fontWeight: 700,
                                textTransform: 'none',
                                py: 1.2,
                                "&:hover": { bgcolor: designConfig.colors.primary.dark }
                            }}
                        >
                            Download PDF
                        </Button>
                        <Button
                            fullWidth
                            onClick={() => setShowInvoice(false)}
                            sx={{
                                color: '#666',
                                fontWeight: 600,
                                textTransform: 'none',
                                borderRadius: 2
                            }}
                        >
                            Close
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default OrderTracking;
