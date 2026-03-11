import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

import { useState, useEffect } from "react";

import designConfig from "../../config/designConfig";
import PageHeader from "../../components/common/PageHeader";
import { useUserProfile } from "../../hooks/profile/useProfile";
import { useUpdateUserProfile } from "../../hooks/profile/useUpdateUserProfile";
import { toast } from "sonner";

export default function PersonalInfo() {
  const { data, isLoading, isError, error } = useUserProfile();
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const profile = data?.data;

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    updateProfile(form, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to update profile");
      },
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center">
        {(error as Error).message}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: designConfig.colors.background.light,
      }}
    >
      <PageHeader title="Personal Information" />

      <Box sx={{ p: 3 }}>
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: designConfig.shadows.md,
          }}
        >
          {/* First Name */}
          <Typography
            fontWeight={700}
            mb={1}
            color={designConfig.colors.text.secondary}
            fontSize={14}
          >
            First Name
          </Typography>

          <TextField
            fullWidth
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon
                    sx={{ color: designConfig.colors.primary.main }}
                  />
                </InputAdornment>
              ),
              sx: { borderRadius: "12px" },
            }}
            sx={{ mb: 3 }}
          />

          {/* Last Name */}
          <Typography
            fontWeight={700}
            mb={1}
            color={designConfig.colors.text.secondary}
            fontSize={14}
          >
            Last Name
          </Typography>

          <TextField
            fullWidth
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon
                    sx={{ color: designConfig.colors.primary.main }}
                  />
                </InputAdornment>
              ),
              sx: { borderRadius: "12px" },
            }}
            sx={{ mb: 3 }}
          />

          {/* Email */}
          <Typography
            fontWeight={700}
            mb={1}
            color={designConfig.colors.text.secondary}
            fontSize={14}
          >
            Email
          </Typography>

          <TextField
            fullWidth
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon
                    sx={{ color: designConfig.colors.primary.main }}
                  />
                </InputAdornment>
              ),
              sx: { borderRadius: "12px" },
            }}
            sx={{ mb: 3 }}
          />

          {/* Update Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={
              isPending ||
              !form.firstName.trim() ||
              !form.lastName.trim() ||
              !form.email.trim()
            }
            sx={{
              bgcolor: designConfig.colors.primary.main,
              color: "white",
              height: 50,
              fontSize: "16px",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "12px",
              boxShadow: designConfig.shadows.primary,
              "&:hover": { bgcolor: designConfig.colors.primary.dark },
            }}
          >
            {isPending ? "Updating..." : "Update Information"}
          </Button>
        </Card>
      </Box>
    </Box>
  );
}