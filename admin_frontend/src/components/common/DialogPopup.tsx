import React from "react";
import { Dialog } from "@mui/material";
import type { DialogProps } from "@mui/material";

interface DialogPopupProps extends Omit<DialogProps, "children"> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const DialogPopup: React.FC<DialogPopupProps> = ({
  open,
  onClose,
  children,
  ...rest
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 0,
          overflow: "visible",
        },
      }}
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0,0,0,0.25)",
        },
      }}
      {...rest}
    >
      {children}
    </Dialog>
  );
};

export default DialogPopup;
