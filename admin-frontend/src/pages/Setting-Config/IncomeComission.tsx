import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PercentIcon from '@mui/icons-material/Percent';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

// ────────────────────────────────────────────────
interface CommissionSettings {
    adminChargeFixed: number;       
    adminChargePercent: number;     
    tdsPercent: number;             
    commissionPercent: number;     
    minWithdrawalAmount: number;    
    gstPercent?: number;            
}

// ────────────────────────────────────────────────
// Mock API – replace with real API calls later
const fetchCurrentSettings = async (): Promise<CommissionSettings> => {
    await new Promise(r => setTimeout(r, 800));
    return {
        adminChargeFixed: 25.00,
        adminChargePercent: 1.5,
        tdsPercent: 10,
        commissionPercent: 8,
        minWithdrawalAmount: 500,
        gstPercent: 18,
    };
};

const saveCommissionSettings = async (data: CommissionSettings): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000));
    console.log('Saving income commission settings:', data);
    // Real: await axios.put('/api/settings/commission', data);
};

export default function IncomeCommission() {
    const [settings, setSettings] = useState<CommissionSettings>({
        adminChargeFixed: 0,
        adminChargePercent: 0,
        tdsPercent: 0,
        commissionPercent: 0,
        minWithdrawalAmount: 0,
        gstPercent: 0,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchCurrentSettings()
            .then(setSettings)
            .catch(() => setError("Failed to load current commission settings"))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (field: keyof CommissionSettings) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.target.value) || 0;
            setSettings(prev => ({ ...prev, [field]: value }));
            setSuccess(false);
        };

    const handleSave = async () => {
        setError(null);
        setSuccess(false);

        // Basic validation
        if (settings.tdsPercent > 50) {
            setError("TDS percentage seems unusually high (>50%)");
            return;
        }
        if (settings.adminChargePercent > 20) {
            setError("Admin charge percentage > 20% is not recommended");
            return;
        }
        if (settings.minWithdrawalAmount < 100) {
            setError("Minimum withdrawal amount should be at least ₹100");
            return;
        }

        setSaving(true);
        try {
            await saveCommissionSettings(settings);
            setSuccess(true);
        } catch {
            setError("Failed to save settings. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Box sx={{
            width: '100%',
            minHeight: '100vh',
            bgcolor: 'grey.50',
            py: { xs: 3, md: 4 }
        }}>
            <Box sx={{ maxWidth: 1500, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 1 }}>
                    Income & Commission Settings
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Configure admin charges, TDS, commission rates, and withdrawal rules
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(false)}>
                        Settings saved successfully
                    </Alert>
                )}

                <Card
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        overflow: 'hidden'
                    }}
                >
                    <CardHeader
                        title="Commission & Charges Configuration"
                        titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
                        sx={{
                            bgcolor: 'info.dark',
                            color: 'white',
                            py: 1.5,
                            px: 3
                        }}
                    />

                    <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                        <Stack spacing={3.5}>
                            {/* Commission Percentage */}
                            <TextField
                                fullWidth
                                label="Agent / User Commission (%)"
                                type="number"
                                value={settings.commissionPercent}
                                onChange={handleChange('commissionPercent')}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><PercentIcon /></InputAdornment>,
                                    inputProps: { min: 0, max: 50, step: 0.1 },
                                }}
                                helperText="Percentage of income paid as commission to agents/users"
                                variant="outlined"
                            />

                            <Divider />

                            {/* Admin Charges – Fixed + Percentage */}
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Admin Charge (Fixed ₹)"
                                    type="number"
                                    value={settings.adminChargeFixed}
                                    onChange={handleChange('adminChargeFixed')}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon fontSize="small" /></InputAdornment>,
                                        inputProps: { min: 0, step: 0.01 },
                                    }}
                                    helperText="Fixed amount deducted per transaction"
                                />

                                <TextField
                                    fullWidth
                                    label="Admin Charge (%)"
                                    type="number"
                                    value={settings.adminChargePercent}
                                    onChange={handleChange('adminChargePercent')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><PercentIcon /></InputAdornment>,
                                        inputProps: { min: 0, max: 20, step: 0.1 },
                                    }}
                                    helperText="Percentage-based admin fee (0 = disabled)"
                                />
                            </Stack>

                            {/* TDS / Tax */}
                            <TextField
                                fullWidth
                                label="TDS / Tax Deduction (%)"
                                type="number"
                                value={settings.tdsPercent}
                                onChange={handleChange('tdsPercent')}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><PercentIcon /></InputAdornment>,
                                    inputProps: { min: 0, max: 30, step: 0.1 },
                                }}
                                helperText="TDS percentage deducted from commission/income"
                            />

                            {/* Optional GST */}
                            <TextField
                                fullWidth
                                label="GST (%) – if applicable"
                                type="number"
                                value={settings.gstPercent ?? 0}
                                onChange={handleChange('gstPercent')}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><PercentIcon /></InputAdornment>,
                                    inputProps: { min: 0, max: 28, step: 0.1 },
                                }}
                                helperText="GST applied on commission/admin charges (optional)"
                            />

                            <Divider />

                            {/* Withdrawal Rule */}
                            <TextField
                                fullWidth
                                label="Minimum Withdrawal Amount (₹)"
                                type="number"
                                value={settings.minWithdrawalAmount}
                                onChange={handleChange('minWithdrawalAmount')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon fontSize="small" /></InputAdornment>,
                                    inputProps: { min: 100, step: 50 },
                                }}
                                helperText="Users/agents cannot withdraw below this amount"
                            />

                            {/* Save Button */}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={saving ? <CircularProgress size={22} color="inherit" /> : <SaveIcon />}
                                    onClick={handleSave}
                                    disabled={saving}
                                    sx={{ minWidth: 180, px: 5, py: 1.4 }}
                                >
                                    {saving ? 'Saving...' : 'Save Settings'}
                                </Button>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}