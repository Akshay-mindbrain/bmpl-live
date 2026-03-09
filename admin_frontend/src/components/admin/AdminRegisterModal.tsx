import React, { useState, useEffect } from "react";
import { User, Phone, Lock, Eye, EyeOff, X } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import type { Admin, AdminType, AdminFormInput } from "../../types/admin"; // adjust path if needed

interface AdminRegisterModalProps {
  open: boolean;
  onClose: () => void;
  admin?: Admin | null;
  onSave: (data: AdminFormInput) => void;
}

const AdminRegisterModal: React.FC<AdminRegisterModalProps> = ({
  open,
  onClose,
  admin,
  onSave,
}) => {
  const isEditMode = !!admin;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    adminType: "ADMIN" as AdminType,
    status: "Active" as "Active" | "Disabled",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  // Convert backend status ("1"/"0") → form display value
  const mapBackendStatusToForm = (backendStatus: string | undefined): "Active" | "Disabled" => {
    if (backendStatus === "1" || backendStatus === "active") return "Active";
    if (backendStatus === "0" || backendStatus === "inactive") return "Disabled";
    return "Active"; // default fallback
  };

  // Convert form value → backend expected format
  const mapFormStatusToBackend = (formStatus: "Active" | "Disabled"): string => {
    return formStatus === "Active" ? "1" : "0";
  };

  useEffect(() => {
    if (isEditMode && admin) {
      setFormData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        email: admin.email || "",
        mobile: admin.mobile || "",
        username: admin.username || "",
        password: "", // never pre-fill password when editing
        adminType: admin.adminType || "ADMIN",
        status: mapBackendStatusToForm(admin.status), // ← key change
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        username: "",
        password: "",
        adminType: "ADMIN",
        status: "Active",
      });
    }
    setErrors({});
  }, [admin, isEditMode, open]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10-digit Indian mobile number";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!isEditMode) {
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const submitData: AdminFormInput = {
      firstName: formData.firstName.trim() || undefined,
      lastName: formData.lastName.trim() || undefined,
      email: formData.email.trim() || undefined,
      mobile: formData.mobile.trim(),
      username: formData.username.trim() || formData.mobile.trim(),
      ...(!isEditMode && { password: formData.password.trim() }),
      adminType: formData.adminType,
      status: mapFormStatusToBackend(formData.status), // ← convert back to "1"/"0"
      ...(isEditMode && admin ? { id: admin.id } : {}),
    };

    onSave(submitData);
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            {isEditMode ? "Edit Admin" : "Create New Admin"}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleTextChange}
            fullWidth
            variant="outlined"
            size="small"
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleTextChange}
            fullWidth
            variant="outlined"
            size="small"
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleTextChange}
            fullWidth
            variant="outlined"
            size="small"
            type="email"
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Mobile Number *"
            name="mobile"
            value={formData.mobile}
            onChange={handleTextChange}
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <Phone size={18} style={{ marginRight: 8, color: "#666" }} />,
            }}
            error={!!errors.mobile}
            helperText={errors.mobile || "10-digit number without +91"}
            required
          />

          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleTextChange}
            fullWidth
            variant="outlined"
            size="small"
            helperText="Defaults to mobile number if left empty"
            InputProps={{
              startAdornment: <User size={18} style={{ marginRight: 8, color: "#666" }} />,
            }}
          />

          {!isEditMode && (
            <TextField
              label="Password *"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleTextChange}
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <Lock size={18} style={{ marginRight: 8, color: "#666" }} />,
                endAdornment: (
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                ),
              }}
              error={!!errors.password}
              helperText={errors.password || "Minimum 8 characters"}
              required
            />
          )}

          <TextField
            select
            label="Admin Type"
            name="adminType"
            value={formData.adminType}
            onChange={handleSelectChange}
            fullWidth
            variant="outlined"
            size="small"
          >
            <MenuItem value="SUPERADMIN">Super Admin</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </TextField>

          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleSelectChange}
            fullWidth
            variant="outlined"
            size="small"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Disabled">Disabled</MenuItem>
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: "#26619A", "&:hover": { backgroundColor: "#1e4e7c" } }}
        >
          {isEditMode ? "Save Changes" : "Create Admin"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminRegisterModal;