// src/types/mui.d.ts
import "@mui/material/TextField";

declare module "@mui/material/TextField" {
  interface TextFieldPropsVariantOverrides {
    textFieldWithLabels: true;
  }
}
