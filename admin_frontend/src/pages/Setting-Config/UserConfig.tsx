import React, { useState } from "react";
import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Divider,
    Alert,
    CircularProgress,
    Card,
    CardHeader,
    CardContent,
    Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useConfig } from "../../hooks/Config/useConfig";
import type { ConfigPayload } from "../../types/config";

export default function UserConfig() {
    const { mutateAsync, isPending } = useConfig();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<ConfigPayload>({
        autoMemId: "STATIC",
        userRegistrationNo: 0,
        prefixMemId: "BMPL",
        minLength: 6,
        incomeCommission: 10,
        royaltyCommission: 5,
    });

    const handleChange =
        (field: keyof ConfigPayload) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const value =
                    typeof form[field] === "number"
                        ? Number(e.target.value)
                        : e.target.value;

                setForm((p) => ({ ...p, [field]: value }));
                setError(null);
                setSuccess(false);
            };

    const handleSave = async () => {
        setError(null);
        setSuccess(false);

        try {
            const res: any = await mutateAsync(form);

            // 🔥 backend returns latest config — sync UI
            setForm({
                autoMemId: res.autoMemId,
                userRegistrationNo: res.userRegistrationNo,
                prefixMemId: res.prefixMemId,
                minLength: res.minLength,
                incomeCommission: Number(res.incomeCommission),
                royaltyCommission: Number(res.royaltyCommission),
            });

            setSuccess(true);
        } catch {
            setError("Failed to save configuration");
        }
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
            <Typography variant="h4" fontWeight={700} mb={2}>
                System Configuration
            </Typography>

            {(error || success) && (
                <Alert severity={error ? "error" : "success"} sx={{ mb: 3 }}>
                    {error || "Configuration saved successfully"}
                </Alert>
            )}

            <Card>
                <CardHeader title="Member ID & Commission Settings" />
                <CardContent>
                    <Stack spacing={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.autoMemId === "STATIC"}
                                    onChange={(e) =>
                                        setForm((p) => ({
                                            ...p,
                                            autoMemId: e.target.checked ? "STATIC" : "DYNAMIC",
                                        }))
                                    }
                                />
                            }
                            label={`Member ID Mode: ${form.autoMemId}`}
                        />

                        <Divider />

                        <TextField
                            label="Prefix"
                            value={form.prefixMemId}
                            onChange={handleChange("prefixMemId")}
                        />

                        <TextField
                            label="Minimum Length"
                            type="number"
                            value={form.minLength}
                            onChange={handleChange("minLength")}
                        />

                        <TextField
                            label="Income Commission (%)"
                            type="number"
                            value={form.incomeCommission}
                            onChange={handleChange("incomeCommission")}
                        />

                        <TextField
                            label="Royalty Commission (%)"
                            type="number"
                            value={form.royaltyCommission}
                            onChange={handleChange("royaltyCommission")}
                        />

                        <Button
                            variant="contained"
                            startIcon={
                                isPending ? <CircularProgress size={18} /> : <SaveIcon />
                            }
                            disabled={isPending}
                            onClick={handleSave}
                            sx={{ alignSelf: "flex-end", px: 4 }}
                        >
                            {isPending ? "Saving..." : "Save Configuration"}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}