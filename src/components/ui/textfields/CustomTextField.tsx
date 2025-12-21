import { TextField, Typography, Box } from "@mui/material";
import type { ChangeEvent } from "react";
import React from "react";

interface CustomTextFieldProps {
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  labelText?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputSx?: object;
}

const CustomTextField = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  labelText,
  onKeyDown,
  inputSx,
  ...rest
}: CustomTextFieldProps) => {
  return (
    <Box mb={2}>
      {labelText && (
        <Typography
          variant="subtitle2"
          mb={0.5}
          sx={{ color: "#0F172A", fontWeight: 500 }}
        >
          {labelText}
        </Typography>
      )}
      <TextField
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        size="small"
        variant="outlined"
        onKeyDown={onKeyDown}
        {...rest}
        InputProps={{
          sx: {
            py: "10px",
            backgroundColor: "#fff",
            borderRadius: "6px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E2E8F0",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E2E8F0",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4F39F6", // Active color
            },
            "& input::placeholder": {
              color: "#94A3B8",
              opacity: 1,
            },
            ...inputSx,
          },
        }}
      />
    </Box>
  );
};

export default CustomTextField;
