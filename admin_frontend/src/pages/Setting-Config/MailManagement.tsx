import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

// ────────────────────────────────────────────────
interface SmtpConfig {
  host: string;             
  port: number;              
  secure: boolean;          
  username: string;
  password: string;
  fromName: string;          
  fromEmail: string;        
  replyToEmail?: string;   
}

// ────────────────────────────────────────────────
const fetchSmtpConfig = async (): Promise<SmtpConfig> => {
  await new Promise(r => setTimeout(r, 800));
  return {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    username: 'yourapp@gmail.com',
    password: 'your-app-password',
    fromName: 'BMPL Support',
    fromEmail: 'support@bmpl.in',
    replyToEmail: 'help@bmpl.in',
  };
};

const saveSmtpConfig = async (config: SmtpConfig): Promise<void> => {
  await new Promise(r => setTimeout(r, 1200));
  console.log('Saving SMTP config:', config);
};

const testSmtpConnection = async (): Promise<{ success: boolean; message: string }> => {
  await new Promise(r => setTimeout(r, 1500));
  const success = Math.random() > 0.3;
  return {
    success,
    message: success
      ? 'Test email sent successfully!'
      : 'Connection failed. Check credentials/host/port.',
  };
};

export default function MailManagement() {
  const [config, setConfig] = useState<SmtpConfig>({
    host: '',
    port: 587,
    secure: false,
    username: '',
    password: '',
    fromName: '',
    fromEmail: '',
    replyToEmail: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchSmtpConfig()
      .then(setConfig)
      .catch(() => setError("Failed to load SMTP configuration"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof SmtpConfig) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = 
        field === 'port' ? Number(e.target.value) || 587 :
        field === 'secure' ? e.target.checked :
        e.target.value;

      setConfig(prev => ({ ...prev, [field]: value }));
      setSuccess(null);
      setError(null);
    };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!config.host) return setError("SMTP Host is required");
    if (!config.username) return setError("Username/Email is required");
    if (!config.password) return setError("Password is required");
    if (!config.fromEmail || !config.fromEmail.includes('@')) {
      return setError("Valid From Email is required");
    }

    setSaving(true);
    try {
      await saveSmtpConfig(config);
      setSuccess("SMTP settings saved successfully");
    } catch {
      setError("Failed to save SMTP configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setError(null);
    setSuccess(null);
    setTesting(true);

    try {
      const result = await testSmtpConnection();
      if (result.success) {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    } catch {
      setError("Test failed – check your network or credentials");
    } finally {
      setTesting(false);
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
          Mail / SMTP Configuration
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Configure SMTP server settings for sending system emails (notifications, OTPs, alerts, etc.)
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
            {success}
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
            title="SMTP Server Settings"
            titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
            sx={{
              bgcolor: 'info.dark',
              color: 'white',
              py: 1.5,
              px: 3
            }}
          />

          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Stack spacing={3}>
              {/* Host & Port */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <TextField
                  fullWidth
                  label="SMTP Host"
                  value={config.host}
                  onChange={handleChange('host')}
                  placeholder="smtp.gmail.com / smtpout.secureserver.net"
                  helperText="Your SMTP server address"
                />

                <TextField
                  sx={{ minWidth: 160 }}
                  label="Port"
                  type="number"
                  value={config.port}
                  onChange={handleChange('port')}
                  InputProps={{
                    inputProps: { min: 1, max: 65535 },
                  }}
                  helperText="Common: 587 (TLS), 465 (SSL)"
                />
              </Stack>

              {/* Secure (SSL/TLS) */}
              <FormControlLabel
                control={
                  <Switch
                    checked={config.secure}
                    onChange={handleChange('secure')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Use Secure Connection (SSL/TLS)
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Enable for port 465 (SSL) • Disable for 587 (STARTTLS)
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: 'flex-start', m: 0 }}
              />

              <Divider />

              {/* Credentials */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <TextField
                  fullWidth
                  label="SMTP Username / Email"
                  value={config.username}
                  onChange={handleChange('username')}
                  placeholder="yourapp@gmail.com"
                />

                <TextField
                  fullWidth
                  label="SMTP Password / App Password"
                  type={showPassword ? 'text' : 'password'}
                  value={config.password}
                  onChange={handleChange('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Divider />

              {/* Sender Info */}
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="From Name (Display Name)"
                  value={config.fromName}
                  onChange={handleChange('fromName')}
                  placeholder="BMPL Support Team"
                  helperText="Appears in recipient's inbox as sender name"
                />

                <TextField
                  fullWidth
                  label="From Email Address"
                  value={config.fromEmail}
                  onChange={handleChange('fromEmail')}
                  placeholder="noreply@yourdomain.com"
                  helperText="Must match SMTP username in most cases"
                />

                <TextField
                  fullWidth
                  label="Reply-To Email (optional)"
                  value={config.replyToEmail || ''}
                  onChange={handleChange('replyToEmail')}
                  placeholder="support@yourdomain.com"
                  helperText="Where replies will be sent (if different from From)"
                />
              </Stack>

              {/* Action Buttons */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="flex-end" 
                sx={{ mt: 4 }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={testing ? <CircularProgress size={20} /> : <SendIcon />}
                  onClick={handleTestConnection}
                  disabled={testing || saving}
                  sx={{ minWidth: 160 }}
                >
                  {testing ? 'Testing...' : 'Test SMTP'}
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                  onClick={handleSave}
                  disabled={saving || testing}
                  sx={{ minWidth: 160 }}
                >
                  {saving ? 'Saving...' : 'Save SMTP Settings'}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}