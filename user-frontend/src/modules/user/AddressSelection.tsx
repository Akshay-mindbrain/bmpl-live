import { useNavigate, useLocation } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Button,
    Container,
    Stack,
    Radio,
    Dialog,
    DialogContent,
    TextField,
    Slide,
    IconButton
} from "@mui/material";
import type { TransitionProps } from '@mui/material/transitions';
import React, { useState, useEffect, forwardRef } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AddIcon from '@mui/icons-material/Add';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { designConfig } from "../../config/designConfig";
import PageHeader from "../../components/common/PageHeader";

// Transition for full-screen dialog effect
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Address {
    id: number;
    fullName: string;
    phoneNumber: string;
    addressLine: string;
    city: string;
    pincode: string;
    state: string;
    type: 'Home' | 'Work' | 'Other';
    isDefault: boolean;
}

const AddressSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [addresses, setAddresses] = useState<Address[]>(() => {
        const saved = localStorage.getItem('savedAddresses');
        return saved ? JSON.parse(saved) : [];
    });
    const [selectedId, setSelectedId] = useState<number | null>(() => {
        const saved = localStorage.getItem('savedAddresses');
        const parsed: Address[] = saved ? JSON.parse(saved) : [];
        const passedId = location.state?.currentAddressId;
        if (passedId) return passedId;
        if (parsed.length > 0) {
            const def = parsed.find((a) => a.isDefault);
            return def ? def.id : parsed[0].id;
        }
        return null;
    });

    // Dialog State
    const [openDialog, setOpenDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState<string | null>(null);
    const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
        fullName: '',
        phoneNumber: '',
        addressLine: '',
        city: '',
        pincode: '',
        state: '',
        type: 'Home'
    });

    // Sync selectedId if location state changes
    useEffect(() => {
        const passedId = location.state?.currentAddressId;
        if (passedId !== undefined && passedId !== null && passedId !== selectedId) {
            setSelectedId(passedId);
        }
    }, [location.state?.currentAddressId, selectedId]);

    const handleApply = () => {
        if (selectedId) {
            const selected = addresses.find((addr: Address) => addr.id === selectedId);
            navigate('/payment', { state: { selectedAddress: selected } });
        }
    };

    const handleSaveNewAddress = () => {
        // Basic validation
        if (!newAddress.fullName || !newAddress.phoneNumber || !newAddress.addressLine || !newAddress.pincode) {
            setErrorDialog("Please fill in all required fields");
            return;
        }

        const newId = Date.now();
        const addressEntry: Address = {
            id: newId,
            ...newAddress,
            isDefault: addresses.length === 0 // First one is default
        };

        const updatedAddresses = [...addresses, addressEntry];
        setAddresses(updatedAddresses);
        localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));

        setSelectedId(newId);
        setOpenDialog(false);
        // Reset form
        setNewAddress({
            fullName: '',
            phoneNumber: '',
            addressLine: '',
            city: '',
            pincode: '',
            state: '',
            type: 'Home'
        });
    };

    const handleRemoveAddress = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = addresses.filter((a: Address) => a.id !== id);
        setAddresses(updated);
        localStorage.setItem('savedAddresses', JSON.stringify(updated));
        if (selectedId === id) {
            setSelectedId(null);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#fff", pb: 16 }}>
            {/* Header */}
            <PageHeader title="Address" />

            <Container maxWidth="md" sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight={700} color={designConfig.colors.primary.main} mb={2}>
                    Saved Address
                </Typography>

                {addresses.length === 0 ? (
                    <Box textAlign="center" py={4}>
                        <Typography color="text.secondary">No addresses saved yet.</Typography>
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        {addresses.map((addr) => {
                            const isSelected = selectedId === addr.id;
                            return (
                                <Paper
                                    key={addr.id}
                                    elevation={0}
                                    onClick={() => setSelectedId(addr.id)}
                                    sx={{
                                        p: 2,
                                        borderRadius: "16px",
                                        border: `1.5px solid ${isSelected ? designConfig.colors.primary.main : '#e0e0e0'}`,
                                        display: "flex",
                                        alignItems: "flex-start",
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        position: 'relative',
                                        bgcolor: 'white'
                                    }}
                                >
                                    <Box sx={{ mr: 2, mt: 0.5, color: designConfig.colors.primary.main }}>
                                        <LocationOnOutlinedIcon />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography variant="subtitle2" fontWeight={700}>
                                                    {addr.fullName}
                                                </Typography>
                                                <Box sx={{
                                                    bgcolor: '#f0fdf4',
                                                    color: designConfig.colors.primary.main,
                                                    px: 1,
                                                    py: 0.2,
                                                    borderRadius: '4px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 600,
                                                    border: `1px solid ${designConfig.colors.primary.main}`
                                                }}>
                                                    {addr.type}
                                                </Box>
                                            </Box>
                                            <Typography
                                                variant="caption"
                                                color="error"
                                                onClick={(e) => handleRemoveAddress(addr.id, e)}
                                                sx={{ cursor: 'pointer', fontWeight: 600, mr: 1 }}
                                            >
                                                Delete
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', width: '90%' }}>
                                            {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                                            Mobile: {addr.phoneNumber}
                                        </Typography>
                                    </Box>
                                    <Radio
                                        checked={isSelected}
                                        onChange={() => setSelectedId(addr.id)}
                                        sx={{
                                            color: '#e0e0e0',
                                            '&.Mui-checked': {
                                                color: designConfig.colors.primary.main,
                                            },
                                            p: 0,
                                            mt: 0.5
                                        }}
                                    />
                                </Paper>
                            );
                        })}
                    </Stack>
                )}

                {/* Add New Address Button */}
                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                    sx={{
                        py: 1.5,
                        borderRadius: "12px",
                        border: `1.5px solid ${designConfig.colors.primary.main}`,
                        color: designConfig.colors.primary.main,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        mt: 2,
                        backgroundColor: 'white',
                        "&:hover": {
                            backgroundColor: '#f0fdf4',
                            borderColor: designConfig.colors.primary.dark
                        }
                    }}
                >
                    Add New Address
                </Button>
            </Container>

            {/* Apply Button */}
            <Box sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                bgcolor: 'white',
                borderTop: '1px solid #f0f0f0',
                zIndex: 1300,
                display: 'flex',
                justifyContent: 'center',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.05)'
            }}>
                <Container maxWidth="md" sx={{ px: 0 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleApply}
                        disabled={!selectedId}
                        sx={{
                            py: 1.8,
                            bgcolor: designConfig.colors.primary.main,
                            borderRadius: "12px",
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            textTransform: 'none',
                            boxShadow: "0 4px 14px rgba(77, 213, 28, 0.4)",
                            "&:hover": { bgcolor: designConfig.colors.primary.dark },
                            "&:disabled": { bgcolor: '#bdbdbd', color: '#fff', boxShadow: 'none' }
                        }}
                    >
                        Apply
                    </Button>
                </Container>
            </Box>

            {/* Bottom Sheet Dialog for Add Address */}
            <Dialog
                fullWidth
                maxWidth="md"
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                TransitionComponent={Transition}
                PaperProps={{
                    sx: {
                        position: 'fixed',
                        bottom: 0,
                        m: 0,
                        width: '100%',
                        maxWidth: '100%',
                        borderTopLeftRadius: "24px",
                        borderTopRightRadius: "24px",
                        maxHeight: '85vh', // Leave space at top
                        bgcolor: '#f9f9f9',
                        overflow: 'hidden'
                    }
                }}
            >
                {/* ... existing dialog content ... */}
                {/* Dialog Header */}
                <Box sx={{
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 1100,
                    bgcolor: "white",
                    borderBottom: "1px solid #f0f0f0",
                }}>
                    <Typography variant="h6" fontWeight={700} color={designConfig.colors.primary.main} sx={{ flex: 1 }}>
                        Add New Address
                    </Typography>
                    <IconButton
                        onClick={() => setOpenDialog(false)}
                        sx={{
                            color: '#666',
                            bgcolor: '#f5f5f5',
                            width: 36,
                            height: 36,
                            "&:hover": { bgcolor: '#eeeeee' }
                        }}
                    >
                        <KeyboardArrowLeftIcon sx={{ transform: 'rotate(-90deg)' }} />
                    </IconButton>
                </Box>

                <DialogContent sx={{ p: 0 }}>
                    <Container maxWidth="md" sx={{ py: 3, px: 2 }}>
                        <Paper elevation={0} sx={{ p: 2.5, borderRadius: "20px" }}>
                            <Typography variant="h6" fontWeight={700} color={designConfig.colors.primary.main} mb={3}>
                                Add New Address
                            </Typography>

                            <Stack spacing={2.5}>
                                <Box>
                                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>Full Name</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter your full name"
                                        value={newAddress.fullName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                                        InputProps={{ sx: { borderRadius: "10px", bgcolor: '#fff' } }}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>Phone Number</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter your mobile number"
                                        value={newAddress.phoneNumber}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
                                        InputProps={{ sx: { borderRadius: "10px", bgcolor: '#fff' } }}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>Address</Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        placeholder="Enter your complete address (House No, Street, Area)"
                                        value={newAddress.addressLine}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                                        InputProps={{ sx: { borderRadius: "10px", bgcolor: '#fff' } }}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>Town/City</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter your city/town"
                                        value={newAddress.city}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAddress({ ...newAddress, city: e.target.value })}
                                        InputProps={{ sx: { borderRadius: "10px", bgcolor: '#fff' } }}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>Pincode</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter 6-digit pincode"
                                        value={newAddress.pincode}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                        InputProps={{ sx: { borderRadius: "10px", bgcolor: '#fff' } }}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>State</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter your state"
                                        value={newAddress.state}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAddress({ ...newAddress, state: e.target.value })}
                                        InputProps={{ sx: { borderRadius: "10px", bgcolor: '#fff' } }}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" fontWeight={600} mb={1}>Save As</Typography>
                                    <Stack direction="row" spacing={1.5}>
                                        {(['Home', 'Work', 'Other'] as const).map((type) => (
                                            <Button
                                                key={type}
                                                variant="outlined"
                                                onClick={() => setNewAddress({ ...newAddress, type })}
                                                sx={{
                                                    borderRadius: "20px",
                                                    textTransform: 'none',
                                                    px: 3,
                                                    borderColor: newAddress.type === type ? designConfig.colors.primary.main : '#e0e0e0',
                                                    bgcolor: newAddress.type === type ? '#f0fdf4' : 'transparent',
                                                    color: newAddress.type === type ? designConfig.colors.primary.main : '#666',
                                                    fontWeight: 600,
                                                    "&:hover": {
                                                        borderColor: designConfig.colors.primary.main,
                                                        bgcolor: '#f0fdf4'
                                                    }
                                                }}
                                            >
                                                {type}
                                            </Button>
                                        ))}
                                    </Stack>
                                </Box>
                            </Stack>

                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleSaveNewAddress}
                                sx={{
                                    mt: 4,
                                    mb: 2,
                                    py: 1.8,
                                    bgcolor: designConfig.colors.primary.main,
                                    borderRadius: "12px",
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    boxShadow: "0 4px 14px rgba(77, 213, 28, 0.4)",
                                    "&:hover": { bgcolor: designConfig.colors.primary.dark }
                                }}
                            >
                                Save Address
                            </Button>
                        </Paper>
                    </Container>
                </DialogContent>
            </Dialog>

            {/* Validation Error Dialog */}
            <Dialog
                open={Boolean(errorDialog)}
                onClose={() => setErrorDialog(null)}
                fullWidth
                maxWidth="xs"
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        p: 2,
                        textAlign: "center"
                    }
                }}
            >
                <DialogContent>
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: "#ffebee", // Light Red
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2
                        }}
                    >
                        <ErrorOutlineIcon sx={{ fontSize: 32, color: "#d32f2f" }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        Missing Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        {errorDialog}
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setErrorDialog(null)}
                        sx={{
                            bgcolor: "#d32f2f",
                            borderRadius: 2,
                            fontWeight: 700,
                            textTransform: "none",
                            "&:hover": { bgcolor: "#b71c1c" }
                        }}
                    >
                        OK
                    </Button>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AddressSelection;
