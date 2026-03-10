import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Container, Paper, Divider, Stack, Dialog, DialogContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Invoice from '../../components/common/Invoice';
import designConfig, { alpha } from "../../config/designConfig";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;
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
                    // Capture ONLY the body to avoid double branding and overlapping
                    const bodyCanvas = await capture('invoice-body-content', 3); // High scale for text clarity

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

                    // Calculations for slicing
                    const usableHeight = pageHeight - hHeader - hFooter;
                    let heightLeft = hBody;
                    let position = 0; // Relative to the bodyCanvas top
                    let pg = 1;

                    while (heightLeft > 0) {
                        if (pg > 1) pdf.addPage();

                        // 1. Clear Page
                        pdf.setFillColor(255, 255, 255);
                        pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                        // 2. Add Body Slice shifted down by hHeader
                        // addImage(img, format, x, y, w, h, alias, compression)
                        // We use clipping or just coordinate math. 
                        // The body starts at hHeader on every page.
                        pdf.addImage(bodyImg, 'JPEG', 0, position + hHeader, imgWidth, hBody, undefined, 'FAST');

                        // 3. Persistent Header Overlay (Top)
                        pdf.rect(0, 0, pageWidth, hHeader, 'F');
                        pdf.addImage(headerImg, 'JPEG', 0, 0, imgWidth, hHeader, undefined, 'FAST');

                        // 4. Persistent Footer Overlay (Bottom)
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
                    console.error("PDF System Error", error);
                    setGeneratingPdf(false);
                }
            }
        }, 400);
    };

    useEffect(() => {
        if (!order) {
            navigate('/home');
            return;
        }

        // Handle Back Button to go to Home
        const handlePopState = (_event: PopStateEvent) => {
            window.history.pushState(null, '', window.location.href);
            navigate('/home', { replace: true });
        };

        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [order, navigate]);

    if (!order) return null;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: designConfig.colors.background.light, pt: 8, pb: 4, px: 2 }}>
            <Container maxWidth="sm">

                {/* Success Header */}
                <Box textAlign="center" mb={4}>
                    <Box sx={{
                        color: designConfig.colors.primary.main,
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Box sx={{
                            bgcolor: designConfig.colors.primary.main,
                            borderRadius: designConfig.borderRadius.full,
                            width: 80,
                            height: 80,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 4px 20px ${alpha(designConfig.colors.primary.main, 0.4)}`
                        }}>
                            <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} />
                        </Box>
                    </Box>
                    <Typography variant="h5" fontWeight={700} color={designConfig.colors.primary.main} gutterBottom>
                        Order Placed Successfully!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Thank you for your purchase
                    </Typography>
                </Box>

                {/* Order ID & Date Card */}
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: designConfig.borderRadius.lg, mb: 2, border: `1px solid ${designConfig.colors.background.border}` }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">Order ID</Typography>
                            <Typography variant="subtitle1" fontWeight={700}>{order.id}</Typography>
                        </Box>
                        <Box sx={{
                            bgcolor: designConfig.colors.primary.main,
                            color: 'white',
                            px: 1,
                            py: 0.25,
                            borderRadius: designConfig.borderRadius.xs,
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}>
                            Confirmed
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                        <Box>
                            <Typography variant="body2" color="text.secondary">Date & Time</Typography>
                            <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>
                                {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Box>
                        <Box textAlign="right">
                            <Typography variant="body2" color="text.secondary">Est. Delivery</Typography>
                            <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>
                                {new Date(order.deliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                {/* Order Summary Card */}
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: designConfig.borderRadius.lg, mb: 3, border: `1px solid ${designConfig.colors.background.border}` }}>
                    <Typography variant="subtitle1" fontWeight={700} mb={2}>Order Summary</Typography>

                    <Box display="flex" alignItems="center" mb={2}>
                        <Box sx={{
                            bgcolor: alpha(designConfig.colors.primary.main, 0.1),
                            p: 1.5,
                            borderRadius: designConfig.borderRadius.md,
                            display: 'flex',
                            color: designConfig.colors.primary.main,
                            mr: 2
                        }}>
                            <Inventory2OutlinedIcon />
                        </Box>
                        <Box flex={1}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                {order.items.length} Items
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Total Amount
                            </Typography>
                        </Box>
                        <Typography variant="h6" fontWeight={700}>
                            ₹{order.total.toLocaleString()}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={1.5}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">Payment Method</Typography>
                            <Typography variant="body2" fontWeight={600}>
                                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">Delivery Address</Typography>
                            <Typography variant="body2" fontWeight={600}>{order.shippingAddress.addressType || 'Home'}</Typography>
                        </Box>
                    </Stack>
                </Paper>

                <Stack spacing={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleDownloadInvoice}
                        sx={{
                            bgcolor: designConfig.colors.primary.main,
                            borderRadius: designConfig.borderRadius.md,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            "&:hover": { bgcolor: designConfig.colors.primary.dark },
                            boxShadow: `0 4px 12px ${alpha(designConfig.colors.primary.main, 0.4)}`
                        }}
                    >
                        Download Invoice
                    </Button>

                    <Button
                        variant="outlined"
                        fullWidth
                        size="large"
                        onClick={() => navigate('/category')}
                        sx={{
                            borderRadius: designConfig.borderRadius.md,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            borderColor: designConfig.colors.primary.main,
                            color: designConfig.colors.primary.main,
                            "&:hover": { borderColor: designConfig.colors.primary.dark, bgcolor: alpha(designConfig.colors.primary.main, 0.05) }
                        }}
                    >
                        Continue Shopping
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
                        borderRadius: designConfig.borderRadius.lg,
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
                            bgcolor: alpha(designConfig.colors.primary.main, 0.1),
                            borderRadius: designConfig.borderRadius.full,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2
                        }}
                    >
                        <DescriptionOutlinedIcon sx={{ fontSize: 32, color: designConfig.colors.primary.main }} />
                    </Box>
                    <Typography variant="h6" fontWeight={900} color={designConfig.colors.text.primary} gutterBottom sx={{ letterSpacing: '0.5px' }}>
                        Tax Invoice
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3} sx={{ fontWeight: 600 }}>
                        Order #{order.id}
                    </Typography>

                    <Box sx={{
                        p: 1,
                        bgcolor: designConfig.colors.background.light,
                        borderRadius: designConfig.borderRadius.md,
                        mb: 3,
                        overflowX: 'auto',
                        border: `1px dashed ${designConfig.colors.background.border}`
                    }}>
                        <Invoice order={order} ref={invoiceRef} isPdf={generatingPdf} />
                    </Box>

                    <Stack spacing={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleDownloadInvoice}
                            sx={{
                                background: designConfig.colors.gradients.primary,
                                borderRadius: designConfig.borderRadius.md,
                                fontWeight: 800,
                                textTransform: 'none',
                                py: 1.5,
                                fontSize: '1rem',
                                boxShadow: `0 4px 12px ${alpha(designConfig.colors.primary.main, 0.3)}`,
                                "&:hover": { opacity: 0.9 }
                            }}
                        >
                            Download PDF
                        </Button>
                        <Button
                            fullWidth
                            onClick={() => setShowInvoice(false)}
                            sx={{
                                color: designConfig.colors.text.secondary,
                                fontWeight: 700,
                                textTransform: 'none',
                                borderRadius: designConfig.borderRadius.md
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

export default OrderSuccess;
