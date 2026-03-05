import { Box, Typography, Stack } from "@mui/material";
import { forwardRef } from "react";
import type { Order } from "../../redux/slice/orderSlice";
import designConfig, { alpha } from "../../config/designConfig";

interface InvoiceProps {
    order: Order;
    isPdf?: boolean;
}

const Invoice = forwardRef<HTMLDivElement, InvoiceProps>(({ order, isPdf }, ref) => {
    return (
        <Box
            ref={ref}
            id="invoice-root"
            sx={{
                width: '100%',
                maxWidth: 800,
                mx: 'auto',
                bgcolor: '#FFFFFF',
                borderRadius: isPdf ? 0 : '8px',
                boxShadow: isPdf ? 'none' : '0 20px 50px rgba(0,0,0,0.1)',
                border: isPdf ? 'none' : `1px solid #E2E8F0`,
                position: 'relative',
                fontFamily: "'Inter', 'Roboto', sans-serif",
                display: 'flex',
                flexDirection: 'column',
                minHeight: isPdf ? 'auto' : '1000px',
                color: '#1E293B',
                overflow: 'visible'
            }}
        >
            {/* 1. Signature Elite Platinum Header */}
            <Box id="invoice-header" sx={{
                p: 5,
                background: '#0F172A',
                color: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `4px solid ${designConfig.colors.primary.main}`
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ p: 1, bgcolor: '#FFFFFF', borderRadius: '4px' }}>
                        <img src="/assets/images/Logo.png" alt="Logo" style={{ height: "45px" }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: '2px', lineHeight: 1 }}>
                            BMPL GLOBAL PVT LTD
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, mt: 0.5, display: 'block' }}>
                            PREMIUM WELLNESS SOLUTIONS
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, mb: 0, lineHeight: 1, fontSize: '2.5rem', opacity: 0.9 }}>INVOICE</Typography>
                    <Typography variant="caption" sx={{ color: designConfig.colors.primary.light, fontWeight: 900, letterSpacing: '2px' }}>
                        #{order.id.slice(-8).toUpperCase()}
                    </Typography>
                </Box>
            </Box>

            {/* 2. Body Sections - Individually captured for layout precision */}
            <Box id="invoice-body-content" sx={{ flex: 1, position: 'relative', zIndex: 1 }}>

                {/* Company & Order Info Sub-Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>Sold By:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 900, color: '#0F172A', mt: 0.5 }}>BMPL GLOBAL PVT LTD</Typography>
                        <Typography variant="caption" sx={{ color: '#475569', display: 'block', fontWeight: 600 }}>GSTIN: 29ABCDE1234F1Z5</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ fontWeight: 900, color: '#64748B', textTransform: 'uppercase' }}>Invoice Date:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 900, color: '#0F172A' }}>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</Typography>
                        <Typography variant="caption" sx={{ color: '#475569', display: 'block', fontWeight: 600 }}>Place of Supply: Karnataka</Typography>
                    </Box>
                </Box>

                {/* Ultra-Compact Address Layout with Full Borders */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, p: 3, pt: 1.5, pb: 1.5 }}>
                    {/* Bill To */}
                    <Box sx={{ border: '1px solid #E2E8F0', borderRadius: '4px', p: 1.5, bgcolor: '#FBFBFC' }}>
                        <Typography variant="caption" sx={{
                            fontWeight: 900,
                            color: '#64748B',
                            textTransform: 'uppercase',
                            fontSize: '0.6rem',
                            letterSpacing: '0.8px',
                            display: 'block',
                            mb: 0.5
                        }}>
                            Bill To
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 900, color: '#0F172A', fontSize: '0.75rem', lineHeight: 1 }}>
                            {order.shippingAddress?.fullName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600, display: 'block', lineHeight: 1.3, fontSize: '0.65rem', mt: 0.3 }}>
                            Ph: {order.shippingAddress?.phone}<br />
                            {order.shippingAddress?.address}
                        </Typography>
                    </Box>

                    {/* Ship To */}
                    <Box sx={{ border: '1px solid #E2E8F0', borderRadius: '4px', p: 1.5, bgcolor: '#FBFBFC' }}>
                        <Typography variant="caption" sx={{
                            fontWeight: 900,
                            color: '#64748B',
                            textTransform: 'uppercase',
                            fontSize: '0.6rem',
                            letterSpacing: '0.8px',
                            display: 'block',
                            mb: 0.5
                        }}>
                            Ship To
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 900, color: '#0F172A', fontSize: '0.75rem', lineHeight: 1 }}>
                            {order.shippingAddress?.fullName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600, display: 'block', lineHeight: 1.3, fontSize: '0.65rem', mt: 0.3 }}>
                            {order.shippingAddress?.address}<br />
                            {order.shippingAddress?.zipCode}, India
                        </Typography>
                    </Box>
                </Box>

                {/* Platinum Table */}
                <Box sx={{ p: 3 }}>
                    <Box sx={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                        {/* Table Header */}
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: '50px 1fr 80px 120px 120px',
                            bgcolor: '#F1F5F9',
                            color: '#1E293B',
                            borderBottom: '2px solid #0F172A'
                        }}>
                            {['SL', 'DESCRIPTION', 'QTY', 'UNIT PRICE', 'TOTAL'].map((h, i) => (
                                <Typography key={h} variant="caption" sx={{
                                    fontWeight: 900,
                                    p: 1.5,
                                    textAlign: i === 1 ? 'left' : (i > 2 ? 'right' : 'center'),
                                    borderRight: i < 4 ? '1px solid #E2E8F0' : 'none'
                                }}>
                                    {h}
                                </Typography>
                            ))}
                        </Box>

                        {/* Table Rows */}
                        <Stack>
                            {order.items.map((item, index) => (
                                <Box key={index} sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '50px 1fr 80px 120px 120px',
                                    borderBottom: '1px solid #E2E8F0',
                                    bgcolor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC'
                                }}>
                                    <Typography variant="body2" sx={{ p: 1.5, textAlign: 'center', borderRight: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600, fontSize: '0.75rem' }}>{index + 1}</Typography>
                                    <Box sx={{ p: 1.5, borderRight: '1px solid #E2E8F0' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 800, fontSize: '0.8rem' }}>{item.name}</Typography>
                                        <Typography variant="caption" sx={{ fontSize: '0.6rem', color: designConfig.colors.primary.main, fontWeight: 800 }}>HSN: 33049040</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ p: 1.5, textAlign: 'center', fontWeight: 800, borderRight: '1px solid #E2E8F0', fontSize: '0.75rem' }}>{item.qty}</Typography>
                                    <Typography variant="body2" sx={{ p: 1.5, textAlign: 'right', fontWeight: 700, borderRight: '1px solid #E2E8F0', fontFamily: 'monospace', fontSize: '0.75rem' }}>₹{item.price.toFixed(2)}</Typography>
                                    <Typography variant="body2" sx={{ p: 1.5, textAlign: 'right', fontWeight: 900, fontFamily: 'monospace', fontSize: '0.75rem' }}>₹{(item.price * item.qty).toFixed(2)}</Typography>
                                </Box>
                            ))}
                        </Stack>

                        {/* Robust Totals Section - Engineered for perfect PDF alignment */}
                        <Box sx={{ borderTop: '2px solid #0F172A' }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 200px' }}>
                                <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRight: '1px solid #E2E8F0' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#64748B', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Amount in Words</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 900, fontStyle: 'italic', fontSize: '0.75rem', color: '#1E293B' }}>
                                        {/* Simplified helper or static text for now */}
                                        Indian Rupees {order.total.toLocaleString('en-IN')} Only
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, px: 2, borderBottom: '1px solid #E2E8F0' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569' }}>SUBTOTAL</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 900, color: '#0F172A', fontFamily: 'monospace' }}>₹{order.total.toFixed(2)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, px: 2, bgcolor: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569' }}>TAX (INCLUSIVE)</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 900, color: '#0F172A', fontFamily: 'monospace' }}>₹0.00</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: 2,
                                        px: 2,
                                        background: '#0F172A',
                                        color: '#FFFFFF'
                                    }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 900, letterSpacing: '1px' }}>GRAND TOTAL</Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 900, fontSize: '1.2rem', fontFamily: 'monospace' }}>₹{order.total.toFixed(2)}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Boxed T&C */}
                <Box sx={{ p: 3, pt: 0, mb: 4 }}>
                    <Box sx={{
                        p: 3,
                        bgcolor: '#FBFBFC',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0'
                    }}>
                        <Typography variant="caption" sx={{
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            display: 'block',
                            mb: 1.5,
                            letterSpacing: '1.5px',
                            color: '#0F172A',
                            fontSize: '0.7rem'
                        }}>
                            Terms & Conditions / Declaration
                        </Typography>
                        <Stack spacing={1}>
                            {[
                                "Certified that the particulars given above are true and correct.",
                                "Goods once sold will not be accepted back or exchanged.",
                                "The company's responsibility ceases once the goods leave our premises.",
                                "All disputes are subject to Bangalore Jurisdiction."
                            ].map((text, i) => (
                                <Box key={i} sx={{ display: 'flex', gap: 1.5 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: designConfig.colors.primary.main, fontSize: '0.65rem' }}>{i + 1}.</Typography>
                                    <Typography variant="caption" sx={{ color: '#475569', lineHeight: 1.4, fontSize: '0.65rem', fontWeight: 500 }}>
                                        {text}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Box>

                {/* Subtle Watermark inside body for PDF capture */}
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                    opacity: 0.02,
                    fontSize: '8rem',
                    fontWeight: 900,
                    color: '#000',
                    pointerEvents: 'none',
                    zIndex: -1,
                    whiteSpace: 'nowrap'
                }}>
                    BMPL ORIGINAL
                </Box>
            </Box>

            {/* 3. Refined Footer */}
            <Box id="invoice-footer" sx={{ p: 3, pt: 1, borderTop: '1px dashed #E2E8F0', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', mb: 1 }}>
                    FOR BMPL GLOBAL PVT LTD
                </Typography>
                <Box sx={{
                    px: 3,
                    py: 0.5,
                    bgcolor: '#FFFFFF',
                    border: `2px solid ${alpha(designConfig.colors.primary.main, 0.1)}`,
                    borderRadius: '100px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <Typography variant="caption" sx={{ color: designConfig.colors.primary.main, fontWeight: 900, fontStyle: 'italic', fontSize: '0.65rem' }}>
                        Computer Generated Invoice - No Physical Signature Required
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
});

export default Invoice;
