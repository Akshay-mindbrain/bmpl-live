import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { KycApiError } from "../../api/kyc.api";
import type {
  KycPayload,
  KycStatus,
} from "../../api/kyc.api";
import { useCreateKyc } from "../../hooks/Kyc/createKyc";
import { useMyKyc } from "../../hooks/Kyc/useGetKyc";
import { toast } from "sonner";

type KycFieldKey = keyof KycPayload;

type KycPayloadLike = {
  panNo: string;
  panImageUrl: string;
  aadharNo: string;
  aadharImgUrl: string;
  bankName: string;
  accountNo: string;
  ifscCode: string;
  branchName: string;
  bankProofImgUrl: string;
};

const EMPTY_KYC_FORM: KycPayload = {
  panNo: "",
  panImageUrl: "",
  aadharNo: "",
  aadharImgUrl: "",
  bankName: "",
  accountNo: "",
  ifscCode: "",
  branchName: "",
  bankProofImgUrl: "",
};

const FIELD_LABELS: Record<KycFieldKey, string> = {
  panNo: "PAN Number",
  panImageUrl: "PAN Image",
  aadharNo: "Aadhaar Number",
  aadharImgUrl: "Aadhaar Image",
  bankName: "Bank Name",
  accountNo: "Account Number",
  ifscCode: "IFSC Code",
  branchName: "Branch Name",
  bankProofImgUrl: "Bank Proof",
};

const mapRecordToPayload = (record: KycPayloadLike): KycPayload => {
  return {
    panNo: record.panNo,
    panImageUrl: record.panImageUrl,
    aadharNo: record.aadharNo,
    aadharImgUrl: record.aadharImgUrl,
    bankName: record.bankName,
    accountNo: record.accountNo,
    ifscCode: record.ifscCode,
    branchName: record.branchName,
    bankProofImgUrl: record.bankProofImgUrl,
  };
};

const getStatusColor = (status: KycStatus): "warning" | "success" | "error" => {
  if (status === "APPROVED") return "success";
  if (status === "REJECT") return "error";
  return "warning";
};

const getStatusIcon = (status: KycStatus) => {
  if (status === "APPROVED") return <CheckCircleIcon />;
  if (status === "REJECT") return <ErrorOutlineIcon />;
  return <PendingActionsIcon />;
};

const getStatusSubtitle = (status: KycStatus) => {
  if (status === "APPROVED") return "KYC Verified";
  if (status === "REJECT") return "KYC Rejected. You can re-submit.";
  return "KYC Pending. You can upload again if needed.";
};

const parseFieldFromMessage = (message: string): KycFieldKey | null => {
  const match = message.match(/^"([^"]+)"/);
  if (!match) return null;

  const key = match[1] as KycFieldKey;
  return key in FIELD_LABELS ? key : null;
};

const formatFieldMessage = (field: KycFieldKey, message: string) => {
  if (
    message.includes("is not allowed to be empty") ||
    message.includes("is required")
  ) {
    return `${FIELD_LABELS[field]} is required`;
  }

  if (field === "panNo" && message.includes("fails to match")) {
    return "PAN must be in format ABCDE1234F";
  }

  return message;
};

const mapFieldErrors = (
  error: unknown,
): Partial<Record<KycFieldKey, string>> => {
  if (!(error instanceof KycApiError) || !Array.isArray(error.details)) {
    return {};
  }

  const mapped: Partial<Record<KycFieldKey, string>> = {};

  for (const detail of error.details) {
    const field = parseFieldFromMessage(detail);
    if (!field || mapped[field]) continue;
    mapped[field] = formatFieldMessage(field, detail);
  }

  return mapped;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return "Something went wrong";
};

const DataField = React.memo(
  ({
    label,
    name,
    value,
    isEditable,
    onChange,
    errorMessage,
  }: {
    label: string;
    name: KycFieldKey;
    value: string;
    isEditable: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
  }) => (
    <Grid size={{ xs: 12, md: 6 }}>
      <Typography variant="caption" fontWeight={700} color="text.secondary">
        {label}
      </Typography>

      {isEditable ? (
        <TextField
          fullWidth
          size="small"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label}`}
          error={Boolean(errorMessage)}
          helperText={errorMessage}
          sx={{ mt: 0.5 }}
        />
      ) : (
        <Typography fontWeight={600} mt={1}>
          {value || "-"}
        </Typography>
      )}
    </Grid>
  ),
);

const UploadButton = ({
  label,
  url,
  uploading,
  isEditable,
  onUpload,
  errorMessage,
}: {
  label: string;
  url: string;
  uploading: boolean;
  isEditable: boolean;
  onUpload: (file: File) => void;
  errorMessage?: string;
}) => (
  <Grid size={{ xs: 12, md: 6 }}>
    <Typography variant="caption" fontWeight={700}>
      {label}
    </Typography>

    <Button
      component="label"
      variant="outlined"
      fullWidth
      startIcon={<UploadFileIcon />}
      disabled={uploading || !isEditable}
      sx={{ mt: 1 }}
    >
      {uploading ? "Uploading..." : "Upload Image"}
      <input
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && onUpload(e.target.files[0])}
      />
    </Button>

    {url && (
      <Typography variant="caption" color="success.main">
        Uploaded
      </Typography>
    )}

    {!url && errorMessage && (
      <Typography variant="caption" color="error.main" display="block">
        {errorMessage}
      </Typography>
    )}
  </Grid>
);

export const Kyc = () => {
  const [kycStatus, setKycStatus] = useState<KycStatus>("PENDING");
  const [uploading, setUploading] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<KycFieldKey, string>>
  >({});
  const [formError, setFormError] = useState("");
  const [kycData, setKycData] = useState<KycPayload>(EMPTY_KYC_FORM);

  const {
    data: kycResponse,
    isLoading: isKycLoading,
    error: kycError,
  } = useMyKyc();

  const kycList = useMemo(() => kycResponse?.data ?? [], [kycResponse]);
  const latestRecord = kycList[0] ?? null;

  useEffect(() => {
    if (!latestRecord) {
      setKycStatus("PENDING");
      setKycData(EMPTY_KYC_FORM);
      return;
    }

    setKycStatus(latestRecord.status);
    setKycData(mapRecordToPayload(latestRecord));
  }, [latestRecord?.id, latestRecord?.updatedAt]);

  const isEditable = kycStatus !== "APPROVED";
  const kycErrorMessage = kycError ? getErrorMessage(kycError) : "";

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const field = e.target.name as KycFieldKey;
      const value = e.target.value;

      setKycData((prev) => ({ ...prev, [field]: value }));
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      setFormError("");
    },
    [],
  );

  const uploadToCloudinary = async (file: File, field: KycFieldKey) => {
    setUploading(field);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "frontendfileupload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhuddbzui/image/upload",
        { method: "POST", body: data },
      );

      const result = await res.json();
      setKycData((prev) => ({
        ...prev,
        [field]: result.secure_url,
      }));

      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      setFormError("");
    } finally {
      setUploading(null);
    }
  };

  const {
    mutate: submitKyc,
    isPending: isSubmitting,
    isError: isSubmitError,
    error: submitError,
  } = useCreateKyc();

  const handleSubmit = () => {
    setFormError("");
    setFieldErrors({});

    submitKyc(kycData, {
      onSuccess: (response) => {
        toast.success("Kyc Submitted Successfully");
        setKycStatus(response.data.status);
        setKycData(mapRecordToPayload(response.data));
      },
      onError: (apiError: unknown) => {
        const mappedErrors = mapFieldErrors(apiError);
        setFieldErrors(mappedErrors);

        if (Object.keys(mappedErrors).length === 0) {
          setFormError(getErrorMessage(apiError));
        }
      },
    });
  };

  const submitErrorMessage = formError || (isSubmitError ? getErrorMessage(submitError) : "");

  if (isKycLoading && !kycResponse) {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: "#f4f6f9" }}>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={900}>
            KYC Verification
          </Typography>
          <Typography color="text.secondary">{getStatusSubtitle(kycStatus)}</Typography>
        </Box>

        <Chip
          label={kycStatus}
          color={getStatusColor(kycStatus)}
          icon={getStatusIcon(kycStatus)}
        />
      </Stack>

      <Card sx={{ p: 4, borderRadius: 4 }}>
        <Typography fontWeight={800} mb={2}>
          Identity Details
        </Typography>

        <Grid container spacing={3}>
          <DataField
            label="PAN Number"
            name="panNo"
            value={kycData.panNo}
            isEditable={isEditable}
            onChange={handleInputChange}
            errorMessage={fieldErrors.panNo}
          />

          <UploadButton
            label="PAN Image"
            url={kycData.panImageUrl}
            uploading={uploading === "panImageUrl"}
            isEditable={isEditable}
            onUpload={(f) => uploadToCloudinary(f, "panImageUrl")}
            errorMessage={fieldErrors.panImageUrl}
          />

          <DataField
            label="Aadhaar Number"
            name="aadharNo"
            value={kycData.aadharNo}
            isEditable={isEditable}
            onChange={handleInputChange}
            errorMessage={fieldErrors.aadharNo}
          />

          <UploadButton
            label="Aadhaar Image"
            url={kycData.aadharImgUrl}
            uploading={uploading === "aadharImgUrl"}
            isEditable={isEditable}
            onUpload={(f) => uploadToCloudinary(f, "aadharImgUrl")}
            errorMessage={fieldErrors.aadharImgUrl}
          />
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography fontWeight={800} mb={2}>
          Bank Details
        </Typography>

        <Grid container spacing={3}>
          <DataField
            label="Bank Name"
            name="bankName"
            value={kycData.bankName}
            isEditable={isEditable}
            onChange={handleInputChange}
            errorMessage={fieldErrors.bankName}
          />

          <DataField
            label="Account Number"
            name="accountNo"
            value={kycData.accountNo}
            isEditable={isEditable}
            onChange={handleInputChange}
            errorMessage={fieldErrors.accountNo}
          />

          <DataField
            label="IFSC Code"
            name="ifscCode"
            value={kycData.ifscCode}
            isEditable={isEditable}
            onChange={handleInputChange}
            errorMessage={fieldErrors.ifscCode}
          />

          <DataField
            label="Branch Name"
            name="branchName"
            value={kycData.branchName}
            isEditable={isEditable}
            onChange={handleInputChange}
            errorMessage={fieldErrors.branchName}
          />

          <UploadButton
            label="Bank Proof"
            url={kycData.bankProofImgUrl}
            uploading={uploading === "bankProofImgUrl"}
            isEditable={isEditable}
            onUpload={(f) => uploadToCloudinary(f, "bankProofImgUrl")}
            errorMessage={fieldErrors.bankProofImgUrl}
          />
        </Grid>

        {isEditable && (
          <Box mt={4} textAlign="center">
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={Boolean(uploading) || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit for Verification"}
            </Button>

            {submitErrorMessage && (
              <Typography color="error" mt={2}>
                {submitErrorMessage}
              </Typography>
            )}
          </Box>
        )}

        {kycErrorMessage && (
          <Typography color="error" mt={3}>
            {kycErrorMessage}
          </Typography>
        )}
      </Card>
    </Box>
  );
};

