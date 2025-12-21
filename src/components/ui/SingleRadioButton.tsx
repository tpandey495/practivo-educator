// SingleRadioButton.tsx
import React from "react";
import { FormControlLabel, Radio, Typography } from "@mui/material";

interface SingleRadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formStyles?: any;
}

const SingleRadioButton: React.FC<SingleRadioButtonProps> = ({
  label,
  value,
  checked,
  name,
  onChange,
  formStyles,
}) => {
  return (
    <FormControlLabel
      sx={{
        fontSize: "16px",
        fontWeight: "700",
        ...formStyles,
      }}
      control={
        <Radio
          value={value}
          checked={checked}
          onChange={onChange}
          name={name}
        />
      }
      label={
        <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
          {label}
        </Typography>
      }
    />
  );
};

export default SingleRadioButton;
