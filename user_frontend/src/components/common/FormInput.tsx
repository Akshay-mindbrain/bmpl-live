import { Controller, type Control } from "react-hook-form";
import { TextField, InputAdornment, type TextFieldProps } from "@mui/material";
import designConfig from '../../config/designConfig';


interface FormInputProps extends Omit<TextFieldProps, "name"> {
    name: string;
    control: Control<any>;
    label: string;
    icon?: React.ReactNode;
}

const FormInput = ({ name, control, label, icon, ...props }: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    {...props}
                    fullWidth
                    label={label} // Use Material UI label prop for floating label if desired, or handle custom label outside
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputProps={{
                        ...props.InputProps, // Preserve existing InputProps if passed
                        prefix: undefined, // Remove if present to avoid spreading issues
                        startAdornment: icon ? (
                            <InputAdornment position="start" sx={{ color: designConfig.colors.primary.main }}>
                                {icon}
                            </InputAdornment>
                        ) : null,
                        sx: {
                            borderRadius: "12px",
                            bgcolor: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: error ? designConfig.colors.error.main : "#e0e0e0",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: error ? designConfig.colors.error.main : "#bdbdbd",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: error ? designConfig.colors.error.main : designConfig.colors.primary.main,
                            },
                        },
                    }}
                    sx={{
                        mb: 3,
                        "& .MuiInputLabel-root": { color: "#9e9e9e" },
                        "& .MuiInputLabel-root.Mui-focused": { color: designConfig.colors.primary.main },
                        ...props.sx
                    }}
                />
            )}
        />
    );
};

export default FormInput;
