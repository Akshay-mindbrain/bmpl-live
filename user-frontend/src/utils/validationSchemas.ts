import * as yup from "yup";

// Regex Patterns
const PHONE_REGEX = /^[6-9]\d{9}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const AADHAAR_REGEX = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$|^[2-9]{1}[0-9]{11}$/; // Supports with or without spaces
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export const basicInfoSchema = yup.object({
    fullName: yup
        .string()
        .required("Full Name is required")
        .min(3, "Name must be at least 3 characters"),
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),
    phoneNumber: yup
        .string()
        .required("Phone Number is required")
        .matches(PHONE_REGEX, "Invalid phone number (must be 10 digits)"),
    sponsorId: yup.string().required("Sponsor/Referral ID is required"),
});

export const kycSchema = yup.object({
    panNumber: yup
        .string()
        .required("PAN Number is required")
        .matches(PAN_REGEX, "Invalid PAN Number format (e.g., ABCDE1234F)"),
    aadhaarNumber: yup
        .string()
        .required("Aadhaar Number is required")
        .matches(AADHAAR_REGEX, "Invalid Aadhaar Number (must be 12 digits)"),
    // Note: File validation is handled manually or via a separate refined schema if using a specific file object structure
});

export const bankDetailsSchema = yup.object({
    accountHolderName: yup
        .string()
        .required("Account Holder Name is required"),
    accountNumber: yup
        .string()
        .required("Account Number is required")
        .min(9, "Account Number must be at least 9 digits"),
    ifscCode: yup
        .string()
        .required("IFSC Code is required")
        .matches(IFSC_REGEX, "Invalid IFSC Code format"),
    bankName: yup.string().required("Bank Name is required"),
});
