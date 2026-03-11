import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
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
interface RoyaltySettings {
    royaltyBasePercent: number;         
    royaltyLevelBonusPercent: number;   
    maxRoyaltyCapPerMonth: number;      
    minRoyaltyPayoutThreshold: number;  
    royaltyActivationRequirement: number; 
}

// ────────────────────────────────────────────────
// Mock API – replace with real endpoints later
const fetchRoyaltySettings = async (): Promise<RoyaltySettings> => {
    await new Promise(r => setTimeout(r, 700));
    return {
        royaltyBasePercent: 4.5,
        royaltyLevelBonusPercent: 1.2,
        maxRoyaltyCapPerMonth: 150000,
        minRoyaltyPayoutThreshold: 5000,
        royaltyActivationRequirement: 100000, 
    };
};

const saveRoyaltySettings = async (data: RoyaltySettings): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000));
    console.log('Saving royalty commission settings:', data);
};

export default function RoyaltyCommission() {
    const [settings, setSettings] = useState<RoyaltySettings>({
        royaltyBasePercent: 0,
        royaltyLevelBonusPercent: 0,
        maxRoyaltyCapPerMonth: 0,
        minRoyaltyPayoutThreshold: 0,
        royaltyActivationRequirement: 0,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchRoyaltySettings()
            .then(setSettings)
            .catch(() => setError("Failed to load royalty settings"))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (field: keyof RoyaltySettings) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.target.value) || 0;
            setSettings(prev => ({ ...prev, [field]: value }));
            setSuccess(false);
        };

    const handleSave = async () => {
        setError(null);
        setSuccess(false);

        // Basic validation rules for royalty settings
        if (settings.royaltyBasePercent > 12) {
            setError("Base royalty > 12% is unusually high");
            return;
        }
        if (settings.royaltyLevelBonusPercent > 5) {
            setError("Level bonus > 5% is not recommended");
            return;
        }
        if (settings.minRoyaltyPayoutThreshold < 1000) {
            setError("Minimum payout threshold should be at least ₹1,000");
            return;
        }
        if (settings.maxRoyaltyCapPerMonth < settings.minRoyaltyPayoutThreshold) {
            setError("Max cap cannot be lower than min payout threshold");
            return;
        }

        setSaving(true);
        try {
            await saveRoyaltySettings(settings);
            setSuccess(true);
        } catch {
            setError("Failed to save royalty settings");
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
                    Royalty Income Settings
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Configure royalty percentages, caps, thresholds, and activation rules
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(false)}>
                        Royalty settings saved successfully
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
                        title="Royalty Commission Configuration"
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
                            {/* Base Royalty */}
                            <TextField
                                fullWidth
                                label="Base Royalty Percentage (%)"
                                type="number"
                                value={settings.royaltyBasePercent}
                                onChange={handleChange('royaltyBasePercent')}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><PercentIcon /></InputAdornment>,
                                    inputProps: { min: 0, max: 15, step: 0.1 },
                                }}
                                helperText="Royalty % paid on qualified downline income/volume"
                            />

                            {/* Level Bonus */}
                            <TextField
                                fullWidth
                                label="Additional Level / Rank Bonus (%)"
                                type="number"
                                value={settings.royaltyLevelBonusPercent}
                                onChange={handleChange('royaltyLevelBonusPercent')}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><PercentIcon /></InputAdornment>,
                                    inputProps: { min: 0, max: 8, step: 0.1 },
                                }}
                                helperText="Extra % for higher ranks (diamond, crown, etc.)"
                            />

                            <Divider />

                            {/* Caps & Thresholds */}
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Maximum Royalty per Month (₹)"
                                    type="number"
                                    value={settings.maxRoyaltyCapPerMonth}
                                    onChange={handleChange('maxRoyaltyCapPerMonth')}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon fontSize="small" /></InputAdornment>,
                                        inputProps: { min: 10000, step: 1000 },
                                    }}
                                    helperText="Hard cap on royalty payout per user/month"
                                />

                                <TextField
                                    fullWidth
                                    label="Minimum Royalty Payout (₹)"
                                    type="number"
                                    value={settings.minRoyaltyPayoutThreshold}
                                    onChange={handleChange('minRoyaltyPayoutThreshold')}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><MonetizationOnIcon fontSize="small" /></InputAdornment>,
                                        inputProps: { min: 1000, step: 500 },
                                    }}
                                    helperText="Royalty below this amount is carried forward"
                                />
                            </Stack>

                            {/* Activation Requirement */}
                            <TextField
                                fullWidth
                                label="Royalty Activation Requirement (₹ BV / Sales)"
                                type="number"
                                value={settings.royaltyActivationRequirement}
                                onChange={handleChange('royaltyActivationRequirement')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon fontSize="small" /></InputAdornment>,
                                    inputProps: { min: 0, step: 1000 },
                                }}
                                helperText="Personal volume / sales needed to qualify for royalty"
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
                                    {saving ? 'Saving...' : 'Save Royalty Settings'}
                                </Button>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}